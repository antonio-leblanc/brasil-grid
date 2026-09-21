import React, { useEffect, useRef } from 'react';
import { Map as MapLibreMap, NavigationControl, Marker, type StyleSpecification, type MapLayerMouseEvent, type FilterSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { FeatureCollection } from 'geojson';
import { majorPowerPlants, majorTransmissionLines } from '../../data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';

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
}

export const GridMap: React.FC<GridMapProps> = ({
  setSelectedPlant,
  setSelectedLine,
  voltageFilter,
  plantTypeFilter
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

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
      pitch: 20,
      attributionControl: false
    });

    mapInstance.addControl(new NavigationControl({ showCompass: true }), 'bottom-right');

    const setupLayers = () => {
      // Transmission lines GeoJSON
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
            type: line.type
          }
        }))
      };

      if (!mapInstance.getSource('transmission-lines')) {
        mapInstance.addSource('transmission-lines', {
          type: 'geojson',
          data: linesGeoJSON
        });

        // 1. Neon Outer Glow
        mapInstance.addLayer({
          id: 'lines-glow',
          type: 'line',
          source: 'transmission-lines',
          paint: {
            'line-color': [
              'match',
              ['get', 'voltageKV'],
              800, '#f59e0b',
              500, '#06b6d4',
              '#8b5cf6'
            ],
            'line-width': ['match', ['get', 'voltageKV'], 800, 9, 500, 5, 3],
            'line-opacity': 0.35,
            'line-blur': 4
          }
        });

        // 2. Main Crisp Core Line
        mapInstance.addLayer({
          id: 'lines-main',
          type: 'line',
          source: 'transmission-lines',
          paint: {
            'line-color': [
              'match',
              ['get', 'voltageKV'],
              800, '#fbbf24',
              500, '#22d3ee',
              '#c084fc'
            ],
            'line-width': ['match', ['get', 'voltageKV'], 800, 3.5, 500, 2.2, 1.6],
            'line-opacity': 0.95
          }
        });

        // Interactive click on transmission lines
        mapInstance.on('click', 'lines-main', (e: MapLayerMouseEvent) => {
          if (!e.features || !e.features[0]) return;
          const lineId = e.features[0].properties?.id;
          const found = majorTransmissionLines.find((l) => l.id === lineId);
          if (found) {
            setSelectedLine(found);
            setSelectedPlant(null);
          }
        });

        mapInstance.on('mouseenter', 'lines-main', () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
        });
        mapInstance.on('mouseleave', 'lines-main', () => {
          mapInstance.getCanvas().style.cursor = '';
        });
      }

      // Add HTML Pulsing Markers for Power Plants
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      majorPowerPlants.forEach((plant) => {
        const el = document.createElement('div');
        el.className = 'group cursor-pointer relative';

        const colorClass =
          plant.type === 'hidro'
            ? 'bg-emerald-400 border-emerald-300'
            : plant.type === 'solar'
            ? 'bg-amber-400 border-amber-300'
            : plant.type === 'eolica'
            ? 'bg-sky-400 border-sky-300'
            : plant.type === 'nuclear'
            ? 'bg-orange-500 border-orange-400'
            : 'bg-rose-500 border-rose-400';

        const sizePx = plant.capacityMW >= 10000 ? 18 : plant.capacityMW >= 3000 ? 14 : 11;

        el.innerHTML = `
          <div style="width: ${sizePx}px; height: ${sizePx}px;" class="rounded-full ${colorClass} border-2 shadow-md flex items-center justify-center transition-transform hover:scale-150 duration-150">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-950"></div>
          </div>
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/95 border border-slate-700 text-[10px] font-mono text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-30">
            ${plant.name} <span class="text-cyan-400 font-bold">${(plant.capacityMW / 1000).toFixed(1)} GW</span>
          </div>
        `;

        el.addEventListener('click', (ev) => {
          ev.stopPropagation();
          setSelectedPlant(plant);
          setSelectedLine(null);
        });

        const marker = new Marker({ element: el })
          .setLngLat(plant.coordinates)
          .addTo(mapInstance);

        markersRef.current.push(marker);
      });
    };

    mapInstance.on('load', setupLayers);
    if (mapInstance.loaded()) {
      setupLayers();
    }

    map.current = mapInstance;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      mapInstance.remove();
      map.current = null;
    };
  }, [setSelectedLine, setSelectedPlant]);

  // Update line voltage filter
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    let lineFilterExpr: FilterSpecification | null = null;
    if (voltageFilter === '800') {
      lineFilterExpr = ['==', ['get', 'voltageKV'], 800];
    } else if (voltageFilter === '500') {
      lineFilterExpr = ['>=', ['get', 'voltageKV'], 500];
    }

    if (map.current.getLayer('lines-main')) {
      map.current.setFilter('lines-main', lineFilterExpr);
      map.current.setFilter('lines-glow', lineFilterExpr);
    }
  }, [voltageFilter]);

  // Update plant markers filter
  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const plant = majorPowerPlants[index];
      const element = marker.getElement();
      if (!plant || !element) return;

      if (plantTypeFilter === 'all' || plant.type === plantTypeFilter) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  }, [plantTypeFilter]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#07090e]">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
