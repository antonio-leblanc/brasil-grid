import React, { useEffect, useRef, useState } from 'react';
import { Map as MapLibreMap, NavigationControl, Marker, type StyleSpecification, type MapLayerMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { FeatureCollection } from 'geojson';
import { majorPowerPlants, majorTransmissionLines } from '../../data/gridData';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import { Zap } from 'lucide-react';

// Clean, high-performance, watermark-free Dark Gray Canvas (ESRI)
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
        'raster-opacity': 0.7
      }
    }
  ]
};

export const GridMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PowerPlantFeature | null>(null);
  const [selectedLine, setSelectedLine] = useState<TransmissionLineFeature | null>(null);
  const [voltageFilter, setVoltageFilter] = useState<'all' | '800' | '500'>('all');
  const [plantTypeFilter, setPlantTypeFilter] = useState<string>('all');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize MapLibre GL instance
    const mapInstance = new MapLibreMap({
      container: mapContainer.current,
      style: darkMatterStyle,
      center: [-50.0, -14.0], // Center of Brazil
      zoom: 4.2,
      minZoom: 3.5,
      maxZoom: 10,
      attributionControl: false
    });

    mapInstance.addControl(new NavigationControl({ showCompass: true }), 'top-right');

    const setupLayers = () => {
      setIsReady(true);

      // Add Transmission Lines GeoJSON
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
            from: line.from,
            to: line.to,
            concessionaire: line.concessionaire
          }
        }))
      };

      if (!mapInstance.getSource('transmission-lines')) {
        mapInstance.addSource('transmission-lines', {
          type: 'geojson',
          data: linesGeoJSON
        });

        // 1. Neon Outer Glow for 800kV / 500kV
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
            'line-width': ['match', ['get', 'voltageKV'], 800, 10, 500, 6, 4],
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
            'line-width': ['match', ['get', 'voltageKV'], 800, 4, 500, 2.8, 2],
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
      // Clear any existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      majorPowerPlants.forEach((plant) => {
        const el = document.createElement('div');
        el.className = 'group cursor-pointer relative';

        const colorClass =
          plant.type === 'hidro'
            ? 'bg-emerald-400 border-emerald-300 text-emerald-400 shadow-emerald-500/50'
            : plant.type === 'solar'
            ? 'bg-amber-400 border-amber-300 text-amber-400 shadow-amber-500/50'
            : plant.type === 'eolica'
            ? 'bg-sky-400 border-sky-300 text-sky-400 shadow-sky-500/50'
            : plant.type === 'nuclear'
            ? 'bg-orange-500 border-orange-400 text-orange-400 shadow-orange-500/50'
            : 'bg-rose-500 border-rose-400 text-rose-400 shadow-rose-500/50';

        const sizePx = plant.capacityMW >= 10000 ? 20 : plant.capacityMW >= 3000 ? 16 : 13;

        el.innerHTML = `
          <div style="width: ${sizePx}px; height: ${sizePx}px;" class="rounded-full ${colorClass} border-2 shadow-lg flex items-center justify-center transition-transform hover:scale-150 duration-200">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-950"></div>
          </div>
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-700 text-[10px] font-mono text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
            ${plant.name.split(' ')[1] || plant.name} (${(plant.capacityMW / 1000).toFixed(1)} GW)
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

    // Fallback if load already fired
    if (mapInstance.loaded()) {
      setupLayers();
    }

    map.current = mapInstance;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      mapInstance.remove();
      map.current = null;
    };
  }, []);

  // Filter line updates
  useEffect(() => {
    if (!map.current || !isReady) return;

    let lineFilterExpr: any = null;
    if (voltageFilter === '800') {
      lineFilterExpr = ['==', ['get', 'voltageKV'], 800];
    } else if (voltageFilter === '500') {
      lineFilterExpr = ['>=', ['get', 'voltageKV'], 500];
    }

    if (map.current.getLayer('lines-main')) {
      map.current.setFilter('lines-main', lineFilterExpr);
      map.current.setFilter('lines-glow', lineFilterExpr);
    }
  }, [voltageFilter, isReady]);

  // Filter plant markers
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

  // Camera presets
  const flyToPreset = (coords: [number, number], zoom: number) => {
    if (!map.current) return;
    map.current.flyTo({
      center: coords,
      zoom,
      duration: 1500,
      essential: true
    });
  };

  return (
    <div className="relative w-full h-[720px] rounded-xl overflow-hidden border border-slate-800 bg-[#080b11] shadow-2xl">
      {/* MapLibre DOM Node with inline forced dimensions */}
      <div ref={mapContainer} style={{ width: '100%', height: '100%', minHeight: '720px' }} />

      {/* Top Left Floating Console Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2 max-w-sm">
        {/* Title Tag */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-3 shadow-xl">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <Zap className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">Topologia do SIN</span>
          </div>
          <p className="text-xs text-slate-300">
            Mais de 185 mil km de linhas interligando o país de Roraima ao Rio Grande do Sul.
          </p>

          {/* Voltage Line Filters */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Tensões:</span>
            <div className="flex space-x-1">
              <button
                onClick={() => setVoltageFilter('all')}
                className={`px-2 py-0.5 rounded ${voltageFilter === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
              >
                Todas
              </button>
              <button
                onClick={() => setVoltageFilter('800')}
                className={`px-2 py-0.5 rounded flex items-center ${voltageFilter === '800' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1"></span>
                ±800 kV
              </button>
              <button
                onClick={() => setVoltageFilter('500')}
                className={`px-2 py-0.5 rounded flex items-center ${voltageFilter === '500' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1"></span>
                ≥500 kV
              </button>
            </div>
          </div>

          {/* Plant Type Filter */}
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Geração:</span>
            <div className="flex space-x-1">
              {['all', 'hidro', 'eolica', 'solar', 'nuclear'].map((t) => (
                <button
                  key={t}
                  onClick={() => setPlantTypeFilter(t)}
                  className={`px-1.5 py-0.5 rounded uppercase ${
                    plantTypeFilter === t
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'all' ? 'Todas' : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Camera Presets */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 flex space-x-1 text-xs font-mono">
          <button
            onClick={() => flyToPreset([-50.0, -14.0], 4.2)}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition"
          >
            🇧🇷 Brasil
          </button>
          <button
            onClick={() => flyToPreset([-48.0, -12.0], 5.5)}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-300 transition"
          >
            ⚡ Belo Monte ➔ Rio
          </button>
          <button
            onClick={() => flyToPreset([-54.58, -25.40], 6.5)}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-emerald-300 transition"
          >
            💧 Itaipu
          </button>
          <button
            onClick={() => flyToPreset([-40.5, -11.0], 6.0)}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-cyan-300 transition"
          >
            💨 NE Vento/Sol
          </button>
        </div>
      </div>

      {/* Selected Feature Card (Right Floating Drawer) */}
      {(selectedPlant || selectedLine) && (
        <div className="absolute top-4 right-4 z-20 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
              {selectedPlant ? `USINA ${selectedPlant.type}` : `LINHA ${selectedLine?.voltageKV} kV`}
            </span>
            <button
              onClick={() => {
                setSelectedPlant(null);
                setSelectedLine(null);
              }}
              className="text-slate-400 hover:text-white text-xs font-mono"
            >
              ✕ Fechar
            </button>
          </div>

          {selectedPlant && (
            <div className="mt-3 space-y-2">
              <h3 className="font-bold text-white text-base leading-tight">{selectedPlant.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="bg-slate-800/60 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">POTÊNCIA</span>
                  <strong className="text-emerald-400 text-sm">{selectedPlant.capacityMW.toLocaleString('pt-BR')} MW</strong>
                  <span className="text-slate-500 block text-[10px]">({(selectedPlant.capacityMW / 1000).toFixed(2)} GW)</span>
                </div>
                <div className="bg-slate-800/60 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">LOCAL / SUBSISTEMA</span>
                  <strong className="text-slate-200">{selectedPlant.state} — {selectedPlant.subsystem}</strong>
                  <span className="text-slate-400 block text-[10px] truncate">{selectedPlant.riverOrRegion}</span>
                </div>
              </div>
              <div className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                {selectedPlant.description}
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                Operador: <span className="text-slate-200">{selectedPlant.operator}</span>
              </div>
            </div>
          )}

          {selectedLine && (
            <div className="mt-3 space-y-2">
              <h3 className="font-bold text-white text-base leading-tight">{selectedLine.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="bg-slate-800/60 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">TENSÃO NOMINAL</span>
                  <strong className="text-amber-400 text-sm">
                    {selectedLine.voltageKV} kV ({selectedLine.type === 'CC' ? 'Contínua' : 'Alternada'})
                  </strong>
                </div>
                <div className="bg-slate-800/60 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">EXTENSÃO</span>
                  <strong className="text-cyan-400 text-sm">{selectedLine.lengthKm.toLocaleString('pt-BR')} km</strong>
                </div>
              </div>
              <div className="text-xs text-slate-300 font-sans space-y-1 pt-1">
                <p><strong className="text-slate-400">Origem:</strong> {selectedLine.from}</p>
                <p><strong className="text-slate-400">Destino:</strong> {selectedLine.to}</p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                Concessionária: <span className="text-slate-200">{selectedLine.concessionaire}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg px-3 py-2 flex items-center space-x-4 text-xs font-mono text-slate-300">
        <span className="text-slate-400 text-[11px]">LEGENDA:</span>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-1 rounded bg-amber-400 shadow-sm shadow-amber-400"></span>
          <span>±800 kV CC (Belo Monte)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-1 rounded bg-cyan-400 shadow-sm shadow-cyan-400"></span>
          <span>500 kV CA (Tronco)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>Hidro</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
          <span>Solar</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
          <span>Eólica</span>
        </div>
      </div>
    </div>
  );
};
