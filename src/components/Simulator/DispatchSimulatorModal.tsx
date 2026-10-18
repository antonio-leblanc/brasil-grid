import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import type {
  GridSimulationState,
  HistoryPoint
} from '../../services/gridPhysics';
import {
  advanceSimulation,
  applyGeneratorTrip,
  createInitialSimulation,
  formatSimClock,
  ERAC_STAGES,
  GOVERNOR_DROOP_R
} from '../../services/gridPhysics';
import { FrequencyGauge } from './FrequencyGauge';
import { FrequencyStripChart } from './FrequencyStripChart';
import { DispatchControlDesk } from './DispatchControlDesk';

interface DispatchSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScenarioId = GridSimulationState['scenarioId'];

const SCENARIOS: { id: ScenarioId; label: string; description: string }[] = [
  {
    id: 'pato',
    label: 'Pôr do sol',
    description: 'A solar cai com o pôr do sol enquanto a carga sobe rumo ao pico das 19h. Compense com hidro e térmica.'
  },
  {
    id: 'alta_renovavel',
    label: 'Excesso renovável',
    description: 'Solar e eólica dominam o meio-dia e a inércia síncrona fica baixa. Qualquer desbalanço move a frequência rápido.'
  },
  {
    id: 'livre',
    label: 'Livre',
    description: 'Sem eventos programados. Ajuste as fontes ou dispare uma contingência.'
  }
];

const SPEEDS = [1, 2, 5] as const;

const TRIP_MW = 2800;

const toHistoryPoint = (s: GridSimulationState): HistoryPoint => ({
  timeSeconds: s.simTimeSeconds,
  timeLabel: formatSimClock(s.simTimeSeconds),
  frequencyHz: s.frequencyHz,
  totalGenMW: s.hydro.actualMW + s.thermal.actualMW + s.solar.actualMW + s.wind.actualMW,
  totalLoadMW: s.actualLoadMW,
  rocofHzS: s.rocofHzS,
  inertiaH: s.equivalentInertiaH
});

export const DispatchSimulatorModal: React.FC<DispatchSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('pato');
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleReset = useCallback((scenario: ScenarioId = scenarioId) => {
    const fresh = createInitialSimulation(scenario);
    updateSim(() => fresh);
    setHistory([toHistoryPoint(fresh)]);
  }, [scenarioId, updateSim]);

  const handleSelectScenario = (next: ScenarioId) => {
    setScenarioId(next);
    handleReset(next);
  };

  const handleSetSpeed = (speed: number) => {
    updateSim((prev) => ({ ...prev, speedMultiplier: speed }));
  };

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

        if (now - lastHistoryPushRef.current >= 60) {
          lastHistoryPushRef.current = now;
          setHistory((prev) => {
            const updated = [...prev, toHistoryPoint(nextState)];
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

  const activeScenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];
  const isPaused = simState.speedMultiplier === 0;

  const iconButton =
    'p-1.5 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer';
  const segment = (active: boolean) =>
    `px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
      active ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:text-slate-200'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#07090e] border border-slate-800 rounded-lg w-full max-w-5xl max-h-[96vh] flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-h-11 px-4 py-1.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h2 className="text-sm font-semibold text-slate-100">Simulador 60 Hz</h2>

          <div className="flex items-center gap-2">
            <span className="font-mono tabular-nums text-xs text-slate-400">
              {formatSimClock(simState.simTimeSeconds)}
            </span>
            <div className="flex items-center gap-0.5 rounded-md border border-slate-800 p-0.5">
              <button
                type="button"
                onClick={() => handleSetSpeed(isPaused ? 1 : 0)}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isPaused ? 'text-amber-400' : 'text-slate-500 hover:text-slate-200'
                }`}
                aria-label={isPaused ? 'Continuar' : 'Pausar'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              {SPEEDS.map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => handleSetSpeed(speed)}
                  className={`${segment(simState.speedMultiplier === speed)} font-mono`}
                >
                  {speed}×
                </button>
              ))}
            </div>
            <button type="button" onClick={() => handleReset()} className={iconButton} aria-label="Reiniciar cenário">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button type="button" onClick={onClose} className={iconButton} aria-label="Fechar (Esc)">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-slate-800">
          <div className="inline-flex flex-wrap items-center gap-0.5 rounded-md border border-slate-800 p-0.5">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(sc.id)}
                className={segment(scenarioId === sc.id)}
              >
                {sc.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">{activeScenario.description}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {simState.isBlackout && (
            <div className="px-3 py-2.5 rounded-md border border-red-500/40 bg-red-950/30 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-red-300">Apagão</p>
                <p className="mt-0.5 text-xs text-red-200/80">
                  {simState.blackoutReason ?? 'A frequência saiu dos limites e as proteções desligaram os geradores.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleReset()}
                className="shrink-0 px-3 py-1.5 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs transition-colors cursor-pointer"
              >
                Reiniciar
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-64 shrink-0">
              <FrequencyGauge
                frequencyHz={simState.frequencyHz}
                rocofHzS={simState.rocofHzS}
                inertiaH={simState.equivalentInertiaH}
                eracStage={simState.eracStage}
                isBlackout={simState.isBlackout}
                isOverfrequencyAlert={simState.isOverfrequencyAlert}
              />
            </div>
            <FrequencyStripChart
              history={history}
              currentFreq={simState.frequencyHz}
              isBlackout={simState.isBlackout}
            />
          </div>

          <DispatchControlDesk
            state={simState}
            totalGenMW={totalGenMW}
            tripMW={TRIP_MW}
            onUpdateHydroTarget={(targetMW) => updateSim((prev) => ({ ...prev, hydro: { ...prev.hydro, targetMW } }))}
            onUpdateThermalTarget={(targetMW) => updateSim((prev) => ({ ...prev, thermal: { ...prev.thermal, targetMW } }))}
            onSetCurtailment={(percent) =>
              updateSim((prev) => ({
                ...prev,
                solar: { ...prev.solar, curtailmentPercent: percent },
                wind: { ...prev.wind, curtailmentPercent: percent }
              }))
            }
            onTriggerGeneratorTrip={() => updateSim((prev) => applyGeneratorTrip(prev, TRIP_MW))}
            onTogglePrimaryControl={() =>
              updateSim((prev) => ({ ...prev, isPrimaryControlEnabled: !prev.isPrimaryControlEnabled }))
            }
          />

          <details className="text-xs text-slate-400">
            <summary className="cursor-pointer text-slate-500 hover:text-slate-300">Como funciona</summary>
            <div className="mt-2 space-y-1.5 leading-relaxed">
              <p>
                Todas as máquinas síncronas giram a 60 Hz. Se a carga supera a geração, a energia cinética dos rotores
                cobre a diferença e a frequência cai, tanto mais rápido quanto menor a inércia:{' '}
                <span className="font-mono text-slate-300">df/dt = f₀·ΔP / 2Eₖ</span>.
              </p>
              <p>
                A regulação primária das hidrelétricas (estatismo{' '}
                <span className="font-mono">{(GOVERNOR_DROOP_R * 100).toFixed(0)}%</span>) reage em segundos. Abaixo de{' '}
                <span className="font-mono">{ERAC_STAGES[0].thresholdHz.toFixed(1)} Hz</span> o ERAC corta carga em{' '}
                {ERAC_STAGES.length} estágios.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};
