import React from 'react';
import { Waves, Flame, Sun, Wind, Zap, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import type { GridSimulationState } from '../../services/gridPhysics';

interface DispatchControlDeskProps {
  state: GridSimulationState;
  onUpdateHydroTarget: (targetMW: number) => void;
  onUpdateThermalTarget: (targetMW: number) => void;
  onUpdateSolarCurtailment: (percent: number) => void;
  onUpdateWindCurtailment: (percent: number) => void;
  onTriggerGeneratorTrip: () => void;
  onTogglePrimaryControl: () => void;
}

export const DispatchControlDesk: React.FC<DispatchControlDeskProps> = ({
  state,
  onUpdateHydroTarget,
  onUpdateThermalTarget,
  onUpdateSolarCurtailment,
  onUpdateWindCurtailment,
  onTriggerGeneratorTrip,
  onTogglePrimaryControl
}) => {
  const { hydro, thermal, solar, wind, actualLoadMW, eracStage, isPrimaryControlEnabled } = state;

  const totalGenMW = hydro.actualMW + thermal.actualMW + solar.actualMW + wind.actualMW;
  const powerMismatch = totalGenMW - actualLoadMW;

  // Operating economics
  const hourlyCostBRL =
    hydro.actualMW * hydro.operatingCostPerMWh +
    thermal.actualMW * thermal.operatingCostPerMWh +
    solar.actualMW * solar.operatingCostPerMWh +
    wind.actualMW * wind.operatingCostPerMWh;

  const hourlyCO2Tons =
    hydro.actualMW * hydro.co2PerMWh +
    thermal.actualMW * thermal.co2PerMWh +
    solar.actualMW * solar.co2PerMWh +
    wind.actualMW * wind.co2PerMWh;

  return (
    <div className="w-full flex flex-col space-y-4 font-mono select-none">
      {/* Fleet Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Hidroelétricas */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-emerald-500/30 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Waves className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wide">UHEs (Hidro)</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              H = {hydro.inertiaH}s • Rápida
            </span>
          </div>

          <div>
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-slate-400">Despacho Real:</span>
              <span className="text-emerald-300 font-bold">
                {(hydro.actualMW / 1000).toFixed(1)} GW
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-100"
                style={{ width: `${(hydro.actualMW / hydro.maxCapacityMW) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Set-point Alvo:</span>
              <span className="text-white font-bold">{(hydro.targetMW / 1000).toFixed(1)} GW</span>
            </div>
            <input
              type="range"
              min={hydro.minTechnicalMW}
              max={hydro.maxCapacityMW}
              step={500}
              value={hydro.targetMW}
              onChange={(e) => onUpdateHydroTarget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[9px] text-slate-500">
              <span>Min: {(hydro.minTechnicalMW / 1000).toFixed(0)} GW</span>
              <span>Rampa: ±4.2 GW/min</span>
              <span>Max: {(hydro.maxCapacityMW / 1000).toFixed(0)} GW</span>
            </div>
          </div>
        </div>

        {/* 2. Termelétricas a Gás */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/30 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-400">
              <Flame className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wide">UTEs (Térmica)</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              H = {thermal.inertiaH}s • R$ 420/MWh
            </span>
          </div>

          <div>
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-slate-400">Despacho Real:</span>
              <span className="text-amber-300 font-bold">
                {(thermal.actualMW / 1000).toFixed(1)} GW
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-100"
                style={{ width: `${(thermal.actualMW / thermal.maxCapacityMW) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Set-point Alvo:</span>
              <span className="text-white font-bold">{(thermal.targetMW / 1000).toFixed(1)} GW</span>
            </div>
            <input
              type="range"
              min={thermal.minTechnicalMW}
              max={thermal.maxCapacityMW}
              step={200}
              value={thermal.targetMW}
              onChange={(e) => onUpdateThermalTarget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[9px] text-slate-500">
              <span>Mín. Técnico: {(thermal.minTechnicalMW / 1000).toFixed(0)} GW</span>
              <span>Rampa Lenta: ±0.7 GW/min</span>
              <span>Max: {(thermal.maxCapacityMW / 1000).toFixed(0)} GW</span>
            </div>
          </div>
        </div>

        {/* 3. Solar Fotovoltaica */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-yellow-500/30 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-yellow-400">
              <Sun className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wide">UFV (Solar)</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-300 border border-yellow-500/30">
              H = 0s (Sem Inércia)
            </span>
          </div>

          <div>
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-slate-400">Potencial / Gerado:</span>
              <span className="text-yellow-300 font-bold">
                {(solar.actualMW / 1000).toFixed(1)} / {((solar.weatherPotentialMW || solar.actualMW) / 1000).toFixed(1)} GW
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-100"
                style={{ width: `${(solar.actualMW / solar.maxCapacityMW) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Curtailment (Corte):</span>
              <span className={solar.curtailmentPercent ? 'text-red-400 font-bold' : 'text-slate-300'}>
                {solar.curtailmentPercent || 0}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={solar.curtailmentPercent || 0}
              onChange={(e) => onUpdateSolarCurtailment(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />
            <div className="flex justify-between text-[9px] text-slate-500">
              <span>0% (Pleno)</span>
              <span>Razão Energética</span>
              <span>100% (Corte Total)</span>
            </div>
          </div>
        </div>

        {/* 4. Eólica */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-cyan-500/30 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Wind className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wide">EOL (Eólica)</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              H = 0s (Conversor, sem inércia)
            </span>
          </div>

          <div>
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-slate-400">Potencial / Gerado:</span>
              <span className="text-cyan-300 font-bold">
                {(wind.actualMW / 1000).toFixed(1)} / {((wind.weatherPotentialMW || wind.actualMW) / 1000).toFixed(1)} GW
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-cyan-400 h-full transition-all duration-100"
                style={{ width: `${(wind.actualMW / wind.maxCapacityMW) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Curtailment (Corte):</span>
              <span className={wind.curtailmentPercent ? 'text-red-400 font-bold' : 'text-slate-300'}>
                {wind.curtailmentPercent || 0}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={wind.curtailmentPercent || 0}
              onChange={(e) => onUpdateWindCurtailment(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[9px] text-slate-500">
              <span>0% (Pleno)</span>
              <span>Restrição de Transmissão</span>
              <span>100% (Corte Total)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Dashboard Action Bar */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Power balance readout */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Carga SIN:</span>
            <strong className="text-white">{(actualLoadMW / 1000).toFixed(1)} GW</strong>
            {eracStage > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                -{(state.shedLoadMW / 1000).toFixed(1)} GW (ERAC)
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 border-l border-slate-800 pl-4">
            <span className="text-slate-400">Geração Total:</span>
            <strong className="text-emerald-400">{(totalGenMW / 1000).toFixed(1)} GW</strong>
          </div>

          <div className="flex items-center space-x-1.5 border-l border-slate-800 pl-4">
            <span className="text-slate-400">Desbalanço (ΔP):</span>
            <strong className={Math.abs(powerMismatch) < 500 ? 'text-emerald-400' : powerMismatch > 0 ? 'text-sky-400' : 'text-red-400'}>
              {powerMismatch >= 0 ? '+' : ''}{(powerMismatch / 1000).toFixed(2)} GW
            </strong>
          </div>
        </div>

        {/* Action buttons: Governor & Trip injection */}
        <div className="flex items-center space-x-2">
          {/* Primary Control Droop Toggle */}
          <button
            type="button"
            onClick={onTogglePrimaryControl}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs transition cursor-pointer ${
              isPrimaryControlEnabled
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-xs'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Estatismo / Regulador de Velocidade das turbinas hidráulicas (Droop 5%)"
          >
            {isPrimaryControlEnabled ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>Regulação Primária (Governador): {isPrimaryControlEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Generator Trip Injection Button */}
          <button
            type="button"
            onClick={onTriggerGeneratorTrip}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:border-red-500/60 transition text-xs cursor-pointer font-bold"
            title="Simula o desligamento intempestivo de 2.800 MW de unidades hidrelétricas síncronas (ordem de grandeza de 4 UGs de 700 MW de Itaipu; valor ilustrativo)"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Trip Usina (-2.8 GW)</span>
          </button>
        </div>
      </div>

      {/* Economics & Emissions telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
        <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800 flex justify-between items-center">
          <span>Custo Operativo Matriz:</span>
          <span className="text-white font-bold">
            R$ {(hourlyCostBRL / 1e6).toFixed(2)} M/h
          </span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800 flex justify-between items-center">
          <span>Emissões Específicas:</span>
          <span className="text-slate-200 font-bold">
            {hourlyCO2Tons.toFixed(0)} tCO₂/h
          </span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800 flex justify-between items-center">
          <span>Inércia Síncrona:</span>
          <span className="text-emerald-300 font-bold">
            {((hydro.actualMW + thermal.actualMW) / totalGenMW * 100).toFixed(0)}% da geração
          </span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800 flex justify-between items-center">
          <span>Geração Inversor (IBR):</span>
          <span className="text-cyan-300 font-bold">
            {((solar.actualMW + wind.actualMW) / totalGenMW * 100).toFixed(0)}% da geração
          </span>
        </div>
      </div>
    </div>
  );
};
