import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Gauge,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Clock,
  Lightbulb
} from 'lucide-react';
import type {
  GridSimulationState,
  HistoryPoint
} from '../../services/gridPhysics';
import {
  advanceSimulation,
  applyGeneratorTrip,
  createInitialSimulation,
  formatSimClock
} from '../../services/gridPhysics';
import { FrequencyGauge } from './FrequencyGauge';
import { FrequencyStripChart } from './FrequencyStripChart';
import { DispatchControlDesk } from './DispatchControlDesk';

interface DispatchSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCENARIOS = [
  {
    id: 'pato' as const,
    label: '1. O Pôr do Sol (Curva do Pato)',
    shortLabel: 'Curva do Pato',
    objective: 'Às 17h30 a geração solar despenca rapidamente. Suba as hidrelétricas para cobrir o buraco e evitar que a frequência caia!'
  },
  {
    id: 'trip_itaipu' as const,
    label: '2. Queda de Usina (-2.8 GW)',
    shortLabel: 'Queda de Usina',
    objective: 'Uma grande usina caiu de repente! Reaja rápido aumentando a geração de reserva antes que a frequência acione o corte de emergência (ERAC).'
  },
  {
    id: 'alta_renovavel' as const,
    label: '3. Excesso Solar (Curtailment)',
    shortLabel: 'Excesso Solar',
    objective: 'Meio-dia ensolarado: há tanta energia renovável na rede que a frequência sobe. Use o corte (Curtailment) para estabilizar os 60 Hz.'
  },
  {
    id: 'livre' as const,
    label: '4. Modo Livre (Sandbox)',
    shortLabel: 'Modo Livre',
    objective: 'Experimente livremente! Suba e desça a potência de cada fonte para sentir o peso da balança elétrica.'
  }
];

export const DispatchSimulatorModal: React.FC<DispatchSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [scenarioId, setScenarioId] = useState<GridSimulationState['scenarioId']>('pato');
  const [simState, setSimState] = useState<GridSimulationState>(() => createInitialSimulation('pato'));
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  // The ref is the source of truth so React state re-renders don't drop physics steps
  const stateRef = useRef<GridSimulationState>(simState);

  const updateSim = useCallback((update: (prev: GridSimulationState) => GridSimulationState) => {
    stateRef.current = update(stateRef.current);
    setSimState(stateRef.current);
  }, []);

  const lastFrameTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastHistoryPushRef = useRef<number>(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset simulation function
  const handleReset = useCallback((scenario: GridSimulationState['scenarioId'] = scenarioId) => {
    const fresh = createInitialSimulation(scenario);
    updateSim(() => fresh);
    setHistory([
      {
        timeSeconds: fresh.simTimeSeconds,
        timeLabel: formatSimClock(fresh.simTimeSeconds),
        frequencyHz: fresh.frequencyHz,
        totalGenMW: fresh.hydro.actualMW + fresh.thermal.actualMW + fresh.solar.actualMW + fresh.wind.actualMW,
        totalLoadMW: fresh.actualLoadMW,
        rocofHzS: fresh.rocofHzS,
        inertiaH: fresh.equivalentInertiaH
      }
    ]);
  }, [scenarioId, updateSim]);

  // Handle scenario switch
  const handleSelectScenario = (newScenario: GridSimulationState['scenarioId']) => {
    setScenarioId(newScenario);
    handleReset(newScenario);
  };

  // Speed multiplier update
  const handleSetSpeed = (speed: number) => {
    updateSim((prev) => ({
      ...prev,
      speedMultiplier: speed
    }));
  };

  // Dispatch adjustments
  const handleUpdateHydroTarget = (targetMW: number) => {
    updateSim((prev) => ({
      ...prev,
      hydro: { ...prev.hydro, targetMW }
    }));
  };

  const handleUpdateThermalTarget = (targetMW: number) => {
    updateSim((prev) => ({
      ...prev,
      thermal: { ...prev.thermal, targetMW }
    }));
  };

  const handleUpdateSolarCurtailment = (percent: number) => {
    updateSim((prev) => ({
      ...prev,
      solar: { ...prev.solar, curtailmentPercent: percent }
    }));
  };

  const handleUpdateWindCurtailment = (percent: number) => {
    updateSim((prev) => ({
      ...prev,
      wind: { ...prev.wind, curtailmentPercent: percent }
    }));
  };

  const handleTogglePrimaryControl = () => {
    updateSim((prev) => ({
      ...prev,
      isPrimaryControlEnabled: !prev.isPrimaryControlEnabled
    }));
  };

  const handleTriggerGeneratorTrip = () => {
    updateSim((prev) => applyGeneratorTrip(prev, 2800));
  };

  // Physics animation loop
  useEffect(() => {
    if (!isOpen) return;

    lastFrameTimeRef.current = performance.now();
    lastHistoryPushRef.current = performance.now();

    const loop = (now: number) => {
      const deltaMs = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      if (stateRef.current.speedMultiplier > 0 && !stateRef.current.isBlackout) {
        const nextState = advanceSimulation(stateRef.current, deltaMs / 1000);
        stateRef.current = nextState;
        setSimState(nextState);

        // Record history point for strip chart
        if (now - lastHistoryPushRef.current >= 60) {
          lastHistoryPushRef.current = now;
          const totalGen =
            nextState.hydro.actualMW +
            nextState.thermal.actualMW +
            nextState.solar.actualMW +
            nextState.wind.actualMW;

          setHistory((prevHistory) => {
            const nextPoint: HistoryPoint = {
              timeSeconds: nextState.simTimeSeconds,
              timeLabel: formatSimClock(nextState.simTimeSeconds),
              frequencyHz: nextState.frequencyHz,
              totalGenMW: totalGen,
              totalLoadMW: nextState.actualLoadMW,
              rocofHzS: nextState.rocofHzS,
              inertiaH: nextState.equivalentInertiaH
            };
            const updated = [...prevHistory, nextPoint];
            return updated.length > 150 ? updated.slice(updated.length - 150) : updated;
          });
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalGenMW =
    simState.hydro.actualMW +
    simState.thermal.actualMW +
    simState.solar.actualMW +
    simState.wind.actualMW;

  const deltaMW = totalGenMW - simState.actualLoadMW;

  const activeScenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#080b11] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[96vh] flex flex-col overflow-hidden text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Clean Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide font-mono">
                  SIMULADOR DE REDE 60 HZ
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Didático
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mantenha a geração igual ao consumo para não deixar a frequência cair.
              </p>
            </div>
          </div>

          {/* Action Tools: Time, Speed, Reset & Close */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            {/* Clock */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{formatSimClock(simState.simTimeSeconds)}</span>
            </div>

            {/* Speed Multipliers */}
            <div className="flex items-center space-x-0.5 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => handleSetSpeed(simState.speedMultiplier === 0 ? 1 : 0)}
                className={`p-1.5 rounded transition cursor-pointer ${
                  simState.speedMultiplier === 0
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={simState.speedMultiplier === 0 ? 'Continuar' : 'Pausar'}
              >
                {simState.speedMultiplier === 0 ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => handleSetSpeed(1)}
                className={`px-2 py-1 rounded transition cursor-pointer ${
                  simState.speedMultiplier === 1 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                1x
              </button>
              <button
                type="button"
                onClick={() => handleSetSpeed(2)}
                className={`px-2 py-1 rounded transition cursor-pointer ${
                  simState.speedMultiplier === 2 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                2x
              </button>
              <button
                type="button"
                onClick={() => handleSetSpeed(5)}
                className={`px-2 py-1 rounded transition cursor-pointer ${
                  simState.speedMultiplier === 5 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                5x
              </button>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={() => handleReset()}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              title="Reiniciar Desafio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              title="Fechar (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Mission / Scenario Selection */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 uppercase font-mono text-[10px] font-bold shrink-0 mr-1">
              DESAFIOS:
            </span>
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(sc.id)}
                className={`px-3 py-1.5 rounded-lg border transition font-medium text-xs whitespace-nowrap cursor-pointer ${
                  scenarioId === sc.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Mission Objective Banner */}
          <div className="mt-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
            <span className="font-bold text-cyan-400 font-mono text-[11px] shrink-0">OBJETIVO:</span>
            <span>{activeScenario.objective}</span>
          </div>
        </div>

        {/* 3. Main Viewport */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {/* Blackout Banner if triggered */}
          {simState.isBlackout && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-600 text-red-200 flex items-center justify-between animate-pulse">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-white font-mono">APAGÃO GERAL (COLAPSO DA REDE)</h3>
                  <p className="text-xs text-red-300 mt-0.5">
                    {simState.blackoutReason || 'A frequência desceu abaixo dos limites seguros e os geradores desligaram.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleReset()}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition cursor-pointer"
              >
                RECOMEÇAR DESAFIO
              </button>
            </div>
          )}

          {/* Row 1: Frequency Gauge + Strip Chart */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-80 shrink-0">
              <FrequencyGauge
                frequencyHz={simState.frequencyHz}
                rocofHzS={simState.rocofHzS}
                inertiaH={simState.equivalentInertiaH}
                eracStage={simState.eracStage}
                isBlackout={simState.isBlackout}
                isOverfrequencyAlert={simState.isOverfrequencyAlert}
                deltaMW={deltaMW}
              />
            </div>
            <FrequencyStripChart
              history={history}
              currentFreq={simState.frequencyHz}
              currentGenMW={totalGenMW}
              currentLoadMW={simState.actualLoadMW}
              isBlackout={simState.isBlackout}
            />
          </div>

          {/* Row 2: Dispatch Desk (Power Balance & Fleets) */}
          <DispatchControlDesk
            state={simState}
            onUpdateHydroTarget={handleUpdateHydroTarget}
            onUpdateThermalTarget={handleUpdateThermalTarget}
            onUpdateSolarCurtailment={handleUpdateSolarCurtailment}
            onUpdateWindCurtailment={handleUpdateWindCurtailment}
            onTriggerGeneratorTrip={handleTriggerGeneratorTrip}
            onTogglePrimaryControl={handleTogglePrimaryControl}
          />

          {/* Row 3: Didactic Note (Clear & Human) */}
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>Como funciona a física de 60 Hz?</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              No Brasil, todos os geradores e motores da rede giram juntos a exatamente <strong>60 rotações por segundo (60 Hz)</strong>.
              Se o consumo da população for maior do que as usinas estão gerando, as turbinas sofrem resistência mecânica e começam a desacelerar (a frequência cai).
              Se faltar muita geração e a frequência cair abaixo de 58,5 Hz, o sistema de proteção (ERAC) corta energia de cidades inteiras para salvar as máquinas de um colapso completo.
              As <strong>hidrelétricas</strong> são a grande ferramenta do operador: abrem e fecham água com rapidez para manter a balança perfeitamente nivelada.
            </p>
          </div>
        </div>

        {/* 4. Footer */}
        <div className="px-4 sm:px-6 py-2.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Simulador Didático de Estabilidade • Brasil Grid Educational Lab</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
