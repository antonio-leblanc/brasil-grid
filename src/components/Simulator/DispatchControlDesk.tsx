import React from 'react';
import {
  Waves,
  Flame,
  Sun,
  Wind,
  Zap,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Scissors
} from 'lucide-react';
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

  const isCurtailing = (solar.curtailmentPercent || 0) > 0 || (wind.curtailmentPercent || 0) > 0;

  const handleToggleCurtailment = () => {
    if (isCurtailing) {
      onUpdateSolarCurtailment(0);
      onUpdateWindCurtailment(0);
    } else {
      onUpdateSolarCurtailment(50);
      onUpdateWindCurtailment(50);
    }
  };

  const handleQuickHydroAdjust = (deltaMW: number) => {
    const nextTarget = Math.max(hydro.minTechnicalMW, Math.min(hydro.maxCapacityMW, hydro.targetMW + deltaMW));
    onUpdateHydroTarget(nextTarget);
  };

  return (
    <div className="w-full flex flex-col space-y-3 select-none">
      {/* 1. Hero Power Balance: Geração vs Consumo */}
      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              A BALANÇA DE POTÊNCIA (GERAÇÃO vs CONSUMO)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Diferença (ΔP):</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                Math.abs(powerMismatch) < 400
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : powerMismatch > 0
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {powerMismatch >= 0 ? '+' : ''}{(powerMismatch / 1000).toFixed(2)} GW{' '}
              {Math.abs(powerMismatch) < 400
                ? '(Equilibrada)'
                : powerMismatch > 0
                ? '(Sobra energia → 60 Hz sobe)'
                : '(Falta energia → 60 Hz cai)'}
            </span>
          </div>
        </div>

        {/* Visual Balance Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline text-xs font-mono">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-slate-400">Geração Total:</span>
              <strong className="text-emerald-400 text-sm">{(totalGenMW / 1000).toFixed(1)} GW</strong>
            </div>

            <div className="flex items-baseline space-x-1.5">
              <span className="text-slate-400">Consumo do Brasil:</span>
              <strong className="text-white text-sm">{(actualLoadMW / 1000).toFixed(1)} GW</strong>
              {eracStage > 0 && (
                <span className="text-[10px] text-red-400 font-bold ml-1">
                  (-{(state.shedLoadMW / 1000).toFixed(1)} GW cortados por ERAC)
                </span>
              )}
            </div>
          </div>

          {/* Progress bar comparison */}
          <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            {/* Target load marker */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ left: `${Math.min(100, (actualLoadMW / 110000) * 100)}%` }}
              title="Consumo Atual (Alvo de Geração)"
            />
            {/* Total gen fill */}
            <div
              className={`h-full transition-all duration-150 ${
                Math.abs(powerMismatch) < 400
                  ? 'bg-emerald-400'
                  : powerMismatch > 0
                  ? 'bg-sky-400'
                  : 'bg-red-400'
              }`}
              style={{ width: `${Math.min(100, (totalGenMW / 110000) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>0 GW</span>
            <span>A linha branca indica o consumo que você precisa cobrir</span>
            <span>110 GW</span>
          </div>
        </div>
      </div>

      {/* 2. Fleet Dispatch Cards (Clear 3-Column Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Hidrelétricas (A alavanca principal rápida) */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-emerald-500/30 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <Waves className="w-4 h-4" />
              <span>HIDRELÉTRICAS</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
              ⚡ Resposta Rápida
            </span>
          </div>

          <div>
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-slate-400">Despacho Real:</span>
              <strong className="text-emerald-300 font-mono text-sm">
                {(hydro.actualMW / 1000).toFixed(1)} GW
              </strong>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-100"
                style={{ width: `${(hydro.actualMW / hydro.maxCapacityMW) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300 font-mono">
              <span className="text-slate-400">Comando Alvo:</span>
              <strong className="text-white">{(hydro.targetMW / 1000).toFixed(1)} GW</strong>
            </div>
            <input
              type="range"
              min={hydro.minTechnicalMW}
              max={hydro.maxCapacityMW}
              step={500}
              value={hydro.targetMW}
              onChange={(e) => onUpdateHydroTarget(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            {/* Quick adjust buttons */}
            <div className="flex items-center justify-between gap-1 pt-1">
              <button
                type="button"
                onClick={() => handleQuickHydroAdjust(-2000)}
                className="flex-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-mono transition cursor-pointer"
                title="Reduzir 2 GW de hidrelétricas"
              >
                -2 GW
              </button>
              <button
                type="button"
                onClick={() => handleQuickHydroAdjust(2000)}
                className="flex-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-mono transition cursor-pointer"
                title="Aumentar 2 GW de hidrelétricas"
              >
                +2 GW
              </button>
              <button
                type="button"
                onClick={() => {
                  const neededHydro = actualLoadMW - thermal.actualMW - solar.actualMW - wind.actualMW;
                  onUpdateHydroTarget(Math.max(hydro.minTechnicalMW, Math.min(hydro.maxCapacityMW, neededHydro)));
                }}
                className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold transition cursor-pointer"
                title="Ajustar automaticamente as hidrelétricas para zerar o desbalanço da rede"
              >
                Equilibrar
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Termelétricas (Apoio mais lento) */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/30 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
              <Flame className="w-4 h-4" />
              <span>TERMELÉTRICAS</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
              🐢 Resposta Lenta
            </span>
          </div>

          <div>
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-slate-400">Despacho Real:</span>
              <strong className="text-amber-300 font-mono text-sm">
                {(thermal.actualMW / 1000).toFixed(1)} GW
              </strong>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-100"
                style={{ width: `${(thermal.actualMW / thermal.maxCapacityMW) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300 font-mono">
              <span className="text-slate-400">Comando Alvo:</span>
              <strong className="text-white">{(thermal.targetMW / 1000).toFixed(1)} GW</strong>
            </div>
            <input
              type="range"
              min={thermal.minTechnicalMW}
              max={thermal.maxCapacityMW}
              step={200}
              value={thermal.targetMW}
              onChange={(e) => onUpdateThermalTarget(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1">
              <span>Mínimo: {(thermal.minTechnicalMW / 1000).toFixed(0)} GW</span>
              <span>Máximo: {(thermal.maxCapacityMW / 1000).toFixed(0)} GW</span>
            </div>
          </div>
        </div>

        {/* Card 3: Renováveis do Clima (Solar e Eólica) */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-yellow-500/30 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-yellow-400 font-bold text-xs">
              <Sun className="w-4 h-4" />
              <span>SOLAR & EÓLICA</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 font-medium">
              Varia com o Clima
            </span>
          </div>

          {/* Renewable outputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center">
                <Sun className="w-3.5 h-3.5 text-yellow-400 mr-1" /> Solar:
              </span>
              <strong className="text-yellow-300">{(solar.actualMW / 1000).toFixed(1)} GW</strong>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center">
                <Wind className="w-3.5 h-3.5 text-cyan-400 mr-1" /> Eólica:
              </span>
              <strong className="text-cyan-300">{(wind.actualMW / 1000).toFixed(1)} GW</strong>
            </div>
          </div>

          {/* Curtailment action */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleToggleCurtailment}
              className={`w-full py-1.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                isCurtailing
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>{isCurtailing ? 'Cortando Renováveis (Curtailment 50%)' : 'Cortar Excesso de Renováveis'}</span>
            </button>
            <span className="text-[9px] text-slate-500 block text-center mt-1">
              Use o corte quando a geração renovável for excessiva para o consumo
            </span>
          </div>
        </div>
      </div>

      {/* 3. Operator Actions: Piloto Automático & Trip usina */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          {/* Automatic Governor Control Toggle */}
          <button
            type="button"
            onClick={onTogglePrimaryControl}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
              isPrimaryControlEnabled
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Quando ligado, as hidrelétricas aumentam ou diminuem sozinhas para ajudar a estabilizar 60 Hz"
          >
            {isPrimaryControlEnabled ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-slate-500" />
            )}
            <span>Piloto Automático (Regulação Primária): <strong>{isPrimaryControlEnabled ? 'LIGADO' : 'DESLIGADO'}</strong></span>
          </button>
        </div>

        {/* Generator Trip contingency */}
        <button
          type="button"
          onClick={onTriggerGeneratorTrip}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:border-red-500/50 text-xs font-bold transition cursor-pointer"
          title="Simula o desligamento repentino de uma grande usina para você testar a reação do sistema"
        >
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>Simular Queda de Usina (-2.8 GW)</span>
        </button>
      </div>
    </div>
  );
};
