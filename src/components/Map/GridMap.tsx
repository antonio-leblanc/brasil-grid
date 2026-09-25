import React, { useEffect, useRef, useState } from 'react';
import {
  Map as MapLibreMap,
  NavigationControl,
  Popup,
  setWorkerUrl,
  type StyleSpecification,
  type MapLayerMouseEvent,
  type FilterSpecification
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

// Direct MapLibre to the bundled self-contained worker chunk
setWorkerUrl(workerUrl);
import type { FeatureCollection } from 'geojson';
import { majorPowerPlants, majorTransmissionLines } from '../../data/gridData';
import { subsystemsGeoJSON } from '../../data/subsystemsGeoData';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';

// Clean, unwatermarked ESRI Dark Gray Canvas
const darkMatterStyle: StyleSpecification = {
  version: 8,
  sources: {
    'esri-dark': {
      type: 'raster',
      tiles: [
        'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      attribution: '&copy; Esri, HERE, Garmin, OpenStreetMap'
    },
    'esri-labels': {
      type: 'raster',
      tiles: [
        'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256
    }
  },
  layers: [
    {
      id: 'esri-dark-base',
      type: 'raster',
      source: 'esri-dark',
      minzoom: 0,
      maxzoom: 20
    },
    {
      id: 'esri-dark-labels',
      type: 'raster',
      source: 'esri-labels',
      minzoom: 0,
      maxzoom: 20,
      paint: {
        'raster-opacity': 0.65
      }
    }
  ]
};



interface GridMapProps {
  selectedPlant: PowerPlantFeature | null;
  setSelectedPlant: (plant: PowerPlantFeature | null) => void;
  selectedLine: TransmissionLineFeature | null;
  setSelectedLine: (line: TransmissionLineFeature | null) => void;
  voltageFilter: 'all' | '800' | '500';
  plantTypeFilter: string;
  showPowerFlow: boolean;
  showSubsystems: boolean;
  telemetry?: NationalTelemetrySnapshot;
}

export const GridMap: React.FC<GridMapProps> = ({
  selectedPlant,
  setSelectedPlant,
  selectedLine,
  setSelectedLine,
  voltageFilter,
  plantTypeFilter,
  showPowerFlow,
  showSubsystems,
  telemetry
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const popupRef = useRef<Popup | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const lastSelectedPlantId = useRef<string | null>(null);
  const lastSelectedLineId = useRef<string | null>(null);

  // Keep latest handlers in refs to prevent unnecessary re-bindings
  const onSelectPlantRef = useRef(setSelectedPlant);
  const onSelectLineRef = useRef(setSelectedLine);
  const showPowerFlowRef = useRef(showPowerFlow);
  const showSubsystemsRef = useRef(showSubsystems);
  const telemetryRef = useRef<NationalTelemetrySnapshot | undefined>(telemetry);
  useEffect(() => {
    onSelectPlantRef.current = setSelectedPlant;
    onSelectLineRef.current = setSelectedLine;
    showPowerFlowRef.current = showPowerFlow;
    showSubsystemsRef.current = showSubsystems;
    telemetryRef.current = telemetry;
  }, [setSelectedPlant, setSelectedLine, showPowerFlow, showSubsystems, telemetry]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize MapLibre GL
    const mapInstance = new MapLibreMap({
      container: mapContainer.current,
      style: darkMatterStyle,
      center: [-49.5, -14.5], // Center of Brazil
      zoom: 4.3,
      minZoom: 3.5,
      maxZoom: 11,
      pitch: 0,
      attributionControl: { compact: true }
    });

    mapInstance.addControl(new NavigationControl({ showCompass: true }), 'bottom-right');

    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 12,
      className: 'grid-map-tooltip'
    });
    popupRef.current = popup;

    const setupLayers = () => {
      // 0. Subsystems Vector Layer
      if (!mapInstance.getSource('subsystems')) {
        mapInstance.addSource('subsystems', {
          type: 'geojson',
          data: subsystemsGeoJSON
        });

        mapInstance.addLayer({
          id: 'subsystems-fill',
          type: 'fill',
          source: 'subsystems',
          layout: {
            visibility: showSubsystemsRef.current ? 'visible' : 'none'
          },
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.07
          }
        });

        mapInstance.addLayer({
          id: 'subsystems-border',
          type: 'line',
          source: 'subsystems',
          layout: {
            visibility: showSubsystemsRef.current ? 'visible' : 'none'
          },
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 1.6,
            'line-opacity': 0.55,
            'line-dasharray': [4, 2]
          }
        });

        // Subsystems hover interaction
        mapInstance.on('mouseenter', 'subsystems-fill', (e: MapLayerMouseEvent) => {
          if (!showSubsystemsRef.current) return;
          const featuresUnderCursor = mapInstance.queryRenderedFeatures(e.point, {
            layers: ['plants-main', 'lines-main']
          });
          if (featuresUnderCursor && featuresUnderCursor.length > 0) return;

          if (!e.features || !e.features[0] || !popupRef.current) return;
          const p = e.features[0].properties;
          let statesStr = '';
          try {
            if (Array.isArray(p?.states)) {
              statesStr = p.states.join(', ');
            } else if (typeof p?.states === 'string') {
              statesStr = JSON.parse(p.states).join(', ');
            }
          } catch {
            statesStr = String(p?.states || '');
          }

          const currentTelemetry = telemetryRef.current;
          const subKey = p?.id as 'SE_CO' | 'S' | 'NE' | 'N';
          const subData = currentTelemetry?.subsystems[subKey];
          const isLive = currentTelemetry?.source === 'ONS_LIVE';

          const loadDetailsHtml = subData
            ? `<div class="text-[10px] text-slate-300 pt-1 border-t border-slate-800/80 space-y-0.5">
                 <div class="flex items-center justify-between">
                   <span class="text-slate-400">Demanda Atual:</span>
                   <strong class="text-cyan-300 font-bold">${(subData.currentLoadMW / 1000).toFixed(1)} GW</strong>
                 </div>
                 <div class="flex items-center justify-between text-slate-400 text-[9px]">
                   <span>Pico Diário:</span>
                   <span class="text-amber-300 font-semibold">${(subData.peakLoadMW / 1000).toFixed(1)} GW (${subData.peakTime})</span>
                 </div>
                 ${subData.solarMmgdMW > 0 ? `
                 <div class="flex items-center justify-between text-slate-400 text-[9px]">
                   <span>Solar GD (MMGD):</span>
                   <span class="text-yellow-400 font-semibold">${(subData.solarMmgdMW / 1000).toFixed(1)} GW</span>
                 </div>` : ''}
                 <div class="text-slate-500 truncate max-w-[230px] pt-0.5">Estados: ${statesStr}</div>
               </div>`
            : `<div class="text-[10px] text-slate-300 pt-1 border-t border-slate-800/80 space-y-0.5">
                 <div>Participação Carga: <strong class="text-cyan-400 font-bold">${p?.loadShare}</strong></div>
                 <div class="text-slate-500 truncate max-w-[220px]">Estados: ${statesStr}</div>
               </div>`;

          popupRef.current
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="px-3 py-2 rounded-lg bg-[#07090e]/95 border border-slate-700/80 shadow-2xl backdrop-blur-md font-mono text-left select-none pointer-events-none min-w-[220px]">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="text-xs font-bold text-white tracking-wide">${p?.name}</span>
                  <div class="flex items-center space-x-1">
                    <span class="text-[8px] px-1 py-0.2 rounded border ${
                      isLive ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300' : 'border-slate-700 bg-slate-800 text-slate-400'
                    } uppercase font-semibold">
                      ${isLive ? 'LIVE' : 'REF'}
                    </span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 uppercase font-semibold">${p?.shortName}</span>
                  </div>
                </div>
                ${loadDetailsHtml}
              </div>
            `)
            .addTo(mapInstance);
        });

        mapInstance.on('mouseleave', 'subsystems-fill', () => {
          popupRef.current?.remove();
        });
      }

      // 1. Transmission Lines GeoJSON
      const linesGeoJSON: FeatureCollection = {
        type: 'FeatureCollection',
        features: majorTransmissionLines.map((line) => ({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: line.coordinates
          },
          properties: {
            id: line.id,
            name: line.name,
            voltageKV: line.voltageKV,
            type: line.type,
            lengthKm: line.lengthKm,
            concessionaire: line.concessionaire
          }
        }))
      };

      if (!mapInstance.getSource('transmission-lines')) {
        mapInstance.addSource('transmission-lines', {
          type: 'geojson',
          data: linesGeoJSON
        });

        // 1a. Neon Outer Glow
        mapInstance.addLayer({
          id: 'lines-glow',
          type: 'line',
          source: 'transmission-lines',
          paint: {
            'line-color': [
              'step',
              ['get', 'voltageKV'],
              '#8b5cf6',
              500, '#06b6d4',
              600, '#d97706',
              800, '#f59e0b'
            ],
            'line-width': [
              'step',
              ['get', 'voltageKV'],
              3,
              500, 5,
              600, 7,
              800, 9
            ],
            'line-opacity': 0.35,
            'line-blur': 4
          }
        });

        // 1b. Crisp Main Line
        mapInstance.addLayer({
          id: 'lines-main',
          type: 'line',
          source: 'transmission-lines',
          paint: {
            'line-color': [
              'step',
              ['get', 'voltageKV'],
              '#c084fc',
              500, '#22d3ee',
              600, '#f59e0b',
              800, '#fbbf24'
            ],
            'line-width': [
              'step',
              ['get', 'voltageKV'],
              1.6,
              500, 2.2,
              600, 2.8,
              800, 3.5
            ],
            'line-opacity': 0.95
          }
        });

        // 1c. Animated Power Flow Pulse (WebGL)
        mapInstance.addLayer({
          id: 'lines-flow',
          type: 'line',
          source: 'transmission-lines',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: showPowerFlowRef.current ? 'visible' : 'none'
          },
          paint: {
            'line-color': [
              'step',
              ['get', 'voltageKV'],
              '#fae8ff',
              500, '#e0f2fe',
              600, '#fef3c7',
              800, '#ffffff'
            ],
            'line-width': [
              'step',
              ['get', 'voltageKV'],
              1.6,
              500, 2.0,
              600, 2.4,
              800, 2.8
            ],
            'line-opacity': 0.85,
            'line-dasharray': [4, 2.5]
          }
        });

        // Line interactions
        mapInstance.on('mouseenter', 'lines-main', (e: MapLayerMouseEvent) => {
          mapInstance.getCanvas().style.cursor = 'pointer';
          if (!e.features || !e.features[0] || !popupRef.current) return;
          const p = e.features[0].properties;
          const voltageVal = Number(p?.voltageKV) || 0;
          const voltageColor =
            voltageVal >= 600
              ? 'text-amber-400'
              : voltageVal >= 500
              ? 'text-cyan-400'
              : 'text-purple-400';

          popupRef.current
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="px-3 py-2 rounded-lg bg-[#07090e]/95 border border-slate-700/80 shadow-2xl backdrop-blur-md font-mono text-left select-none pointer-events-none min-w-[170px]">
                <div class="text-xs font-bold text-white tracking-wide truncate max-w-[220px] mb-1">${p?.name}</div>
                <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span class="${voltageColor} font-bold text-[11px]">${p?.voltageKV} kV ${p?.type}</span>
                  <span>${p?.lengthKm ? `${Number(p?.lengthKm).toLocaleString('pt-BR')} km` : ''}</span>
                </div>
              </div>
            `)
            .addTo(mapInstance);
        });

        mapInstance.on('mouseleave', 'lines-main', () => {
          mapInstance.getCanvas().style.cursor = '';
          popupRef.current?.remove();
        });

        mapInstance.on('click', 'lines-main', (e: MapLayerMouseEvent) => {
          if (!e.features || !e.features[0]) return;
          const lineId = e.features[0].properties?.id;
          const found = majorTransmissionLines.find((l) => l.id === lineId);
          if (found) {
            onSelectLineRef.current(found);
            onSelectPlantRef.current(null);
          }
        });
      }

      // 2. Power Plants Native GeoJSON
      const plantsGeoJSON: FeatureCollection = {
        type: 'FeatureCollection',
        features: majorPowerPlants.map((plant) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: plant.coordinates
          },
          properties: {
            id: plant.id,
            name: plant.name,
            type: plant.type,
            capacityMW: plant.capacityMW,
            state: plant.state,
            subsystem: plant.subsystem,
            operator: plant.operator,
            riverOrRegion: plant.riverOrRegion
          }
        }))
      };

      if (!mapInstance.getSource('power-plants')) {
        mapInstance.addSource('power-plants', {
          type: 'geojson',
          data: plantsGeoJSON
        });

        // 2a. Plant Halo / Glow (GPU blur based on capacity)
        mapInstance.addLayer({
          id: 'plants-glow',
          type: 'circle',
          source: 'power-plants',
          paint: {
            'circle-radius': [
              'step',
              ['get', 'capacityMW'],
              8,
              3000, 11,
              10000, 15
            ],
            'circle-color': [
              'match',
              ['get', 'type'],
              'hidro', '#34d399',
              'solar', '#fbbf24',
              'eolica', '#38bdf8',
              'nuclear', '#f97316',
              '#f43f5e'
            ],
            'circle-opacity': 0.35,
            'circle-blur': 0.8
          }
        });

        // 2b. Main Crisp Circle Core
        mapInstance.addLayer({
          id: 'plants-main',
          type: 'circle',
          source: 'power-plants',
          paint: {
            'circle-radius': [
              'step',
              ['get', 'capacityMW'],
              5.5,
              3000, 7,
              10000, 9
            ],
            'circle-color': [
              'match',
              ['get', 'type'],
              'hidro', '#34d399',
              'solar', '#fbbf24',
              'eolica', '#38bdf8',
              'nuclear', '#f97316',
              '#f43f5e'
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': [
              'match',
              ['get', 'type'],
              'hidro', '#6ee7b7',
              'solar', '#fde047',
              'eolica', '#7dd3fc',
              'nuclear', '#fdba74',
              '#fda4af'
            ],
            'circle-opacity': 0.95
          }
        });

        // 2c. Central Precision Pupil
        mapInstance.addLayer({
          id: 'plants-inner',
          type: 'circle',
          source: 'power-plants',
          paint: {
            'circle-radius': 1.6,
            'circle-color': '#030712',
            'circle-opacity': 1
          }
        });

        // 2d. Selected Target HUD Ring
        mapInstance.addLayer({
          id: 'plants-selected',
          type: 'circle',
          source: 'power-plants',
          paint: {
            'circle-radius': [
              'step',
              ['get', 'capacityMW'],
              11,
              3000, 14,
              10000, 18
            ],
            'circle-color': 'transparent',
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#22d3ee',
            'circle-stroke-opacity': 0.95
          },
          filter: ['==', ['get', 'id'], '']
        });

        // Plant hover interaction
        mapInstance.on('mouseenter', 'plants-main', (e: MapLayerMouseEvent) => {
          mapInstance.getCanvas().style.cursor = 'pointer';
          if (!e.features || !e.features[0] || !popupRef.current) return;
          const f = e.features[0];
          const coords = (f.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
          const p = f.properties;
          const capacityMW = Number(p?.capacityMW) || 0;
          const gwStr = (capacityMW / 1000).toFixed(1);

          const typeConfig: Record<string, { badge: string }> = {
            hidro: { badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
            solar: { badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
            eolica: { badge: 'bg-sky-500/20 text-sky-400 border-sky-500/40' },
            nuclear: { badge: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
            termica: { badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40' }
          };
          const config = typeConfig[p?.type] || { badge: 'bg-slate-800 text-slate-300 border-slate-700' };

          popupRef.current
            .setLngLat(coords)
            .setHTML(`
              <div class="px-3 py-2 rounded-lg bg-[#07090e]/95 border border-slate-700/80 shadow-2xl backdrop-blur-md font-mono text-left select-none pointer-events-none min-w-[160px]">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="text-xs font-bold text-white tracking-wide truncate max-w-[180px]">${p?.name}</span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded border ${config.badge} uppercase font-semibold">${p?.type}</span>
                </div>
                <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span class="text-cyan-400 font-bold text-[11px]">${gwStr} GW</span>
                  <span>${p?.state} • ${p?.subsystem}</span>
                </div>
              </div>
            `)
            .addTo(mapInstance);
        });

        mapInstance.on('mouseleave', 'plants-main', () => {
          mapInstance.getCanvas().style.cursor = '';
          popupRef.current?.remove();
        });

        // Plant click interaction
        mapInstance.on('click', 'plants-main', (e: MapLayerMouseEvent) => {
          if (!e.features || !e.features[0]) return;
          const plantId = e.features[0].properties?.id;
          const found = majorPowerPlants.find((p) => p.id === plantId);
          if (found) {
            onSelectPlantRef.current(found);
            onSelectLineRef.current(null);
          }
        });
      }

      setIsLoaded(true);
    };

    mapInstance.on('load', setupLayers);
    if (mapInstance.loaded()) {
      setupLayers();
    }

    map.current = mapInstance;

    return () => {
      popupRef.current?.remove();
      mapInstance.remove();
      map.current = null;
      setIsLoaded(false);
    };
  }, []);



  // Sync power flow visibility
  useEffect(() => {
    if (!map.current || !isLoaded) return;
    if (map.current.getLayer('lines-flow')) {
      map.current.setLayoutProperty(
        'lines-flow',
        'visibility',
        showPowerFlow ? 'visible' : 'none'
      );
    }
  }, [showPowerFlow, isLoaded]);

  // Sync subsystems layers visibility
  useEffect(() => {
    if (!map.current || !isLoaded) return;
    const visibility = showSubsystems ? 'visible' : 'none';
    if (map.current.getLayer('subsystems-fill')) {
      map.current.setLayoutProperty('subsystems-fill', 'visibility', visibility);
    }
    if (map.current.getLayer('subsystems-border')) {
      map.current.setLayoutProperty('subsystems-border', 'visibility', visibility);
    }
  }, [showSubsystems, isLoaded]);

  // Sync selected plant focus and HUD target ring
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    const plantId = selectedPlant ? selectedPlant.id : null;

    if (map.current.getLayer('plants-selected')) {
      const selectedId = plantId || '';
      let filterExpr: FilterSpecification = ['==', ['get', 'id'], selectedId];
      if (plantTypeFilter !== 'all') {
        filterExpr = ['all', ['==', ['get', 'type'], plantTypeFilter], ['==', ['get', 'id'], selectedId]];
      }
      map.current.setFilter('plants-selected', filterExpr);
    }

    if (selectedPlant && plantId !== lastSelectedPlantId.current) {
      lastSelectedPlantId.current = plantId;
      map.current.flyTo({
        center: selectedPlant.coordinates,
        zoom: Math.max(map.current.getZoom(), 6.8),
        speed: 1.2,
        curve: 1.4,
        essential: true
      });
    } else if (!selectedPlant) {
      lastSelectedPlantId.current = null;
    }
  }, [selectedPlant, plantTypeFilter, isLoaded]);

  // Sync selected line focus
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    const lineId = selectedLine ? selectedLine.id : null;

    if (selectedLine && selectedLine.coordinates.length > 0 && lineId !== lastSelectedLineId.current) {
      lastSelectedLineId.current = lineId;
      const lons = selectedLine.coordinates.map((c) => c[0]);
      const lats = selectedLine.coordinates.map((c) => c[1]);
      const minLon = Math.min(...lons);
      const maxLon = Math.max(...lons);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);

      map.current.fitBounds(
        [
          [minLon, minLat],
          [maxLon, maxLat]
        ],
        {
          padding: { top: 80, bottom: 80, left: 100, right: 380 },
          maxZoom: 7.5,
          duration: 1200
        }
      );
    } else if (!selectedLine) {
      lastSelectedLineId.current = null;
    }
  }, [selectedLine, isLoaded]);

  // Update line voltage filter in WebGL GPU layer
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    let lineFilterExpr: FilterSpecification | null = null;
    if (voltageFilter === '800') {
      lineFilterExpr = ['==', ['get', 'voltageKV'], 800];
    } else if (voltageFilter === '500') {
      lineFilterExpr = ['>=', ['get', 'voltageKV'], 500];
    }

    const lineLayers = ['lines-main', 'lines-glow', 'lines-flow'];
    lineLayers.forEach((layerId) => {
      if (map.current?.getLayer(layerId)) {
        map.current.setFilter(layerId, lineFilterExpr);
      }
    });
  }, [voltageFilter, isLoaded]);

  // Update plant type filter in WebGL GPU layers
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    let plantFilterExpr: FilterSpecification | null = null;
    if (plantTypeFilter !== 'all') {
      plantFilterExpr = ['==', ['get', 'type'], plantTypeFilter];
    }

    const layers = ['plants-glow', 'plants-main', 'plants-inner'];
    layers.forEach((layerId) => {
      if (map.current?.getLayer(layerId)) {
        map.current.setFilter(layerId, plantFilterExpr);
      }
    });

    if (map.current.getLayer('plants-selected')) {
      const selectedId = selectedPlant ? selectedPlant.id : '';
      if (plantFilterExpr) {
        map.current.setFilter('plants-selected', ['all', plantFilterExpr, ['==', ['get', 'id'], selectedId]]);
      } else {
        map.current.setFilter('plants-selected', ['==', ['get', 'id'], selectedId]);
      }
    }
  }, [plantTypeFilter, selectedPlant, isLoaded]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#07090e]">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
