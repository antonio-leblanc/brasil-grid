import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Gauge,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Info,
  Clock
} from 'lucide-react';
import type {
  GridSimulationState,
  HistoryPoint
} from '../../services/gridPhysics';
import {
  createInitialSimulation,
  stepSimulation,
  formatSimClock
} from '../../services/gridPhysics';
import { FrequencyGauge } from './FrequencyGauge';
import { FrequencyStripChart } from './FrequencyStripChart';
import { DispatchControlDesk } from './DispatchControlDesk';

interface DispatchSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DispatchSimulatorModal: React.FC<DispatchSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [scenarioId, setScenarioId] = useState<GridSimulationState['scenarioId']>('pato');
  const [simState, setSimState] = useState<GridSimulationState>(() => createInitialSimulation('pato'));
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  // Simulation physics loop refs
  const stateRef = useRef<GridSimulationState>(simState);

  useEffect(() => {
    stateRef.current = simState;
  }, [simState]);

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
    setSimState(fresh);
    stateRef.current = fresh;
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
  }, [scenarioId]);

  // Handle scenario switch
  const handleSelectScenario = (newScenario: GridSimulationState['scenarioId']) => {
    setScenarioId(newScenario);
    handleReset(newScenario);
  };

  // Speed multiplier update
  const handleSetSpeed = (speed: number) => {
    setSimState((prev) => ({
      ...prev,
      speedMultiplier: speed
    }));
  };

  // Dispatch adjustments
  const handleUpdateHydroTarget = (targetMW: number) => {
    setSimState((prev) => ({
      ...prev,
      hydro: { ...prev.hydro, targetMW }
    }));
  };

  const handleUpdateThermalTarget = (targetMW: number) => {
    setSimState((prev) => ({
      ...prev,
      thermal: { ...prev.thermal, targetMW }
    }));
  };

  const handleUpdateSolarCurtailment = (percent: number) => {
    setSimState((prev) => ({
      ...prev,
      solar: { ...prev.solar, curtailmentPercent: percent }
    }));
  };

  const handleUpdateWindCurtailment = (percent: number) => {
    setSimState((prev) => ({
      ...prev,
      wind: { ...prev.wind, curtailmentPercent: percent }
    }));
  };

  const handleTogglePrimaryControl = () => {
    setSimState((prev) => ({
      ...prev,
      isPrimaryControlEnabled: !prev.isPrimaryControlEnabled
    }));
  };

  // Sudden trip event (-2800 MW instantaneous drop)
  const handleTriggerGeneratorTrip = () => {
    setSimState((prev) => {
      const cutMW = 2800;
      const hydroNewActual = Math.max(0, prev.hydro.actualMW - cutMW);
      const events = [
        {
          id: `trip_manual_${Date.now()}`,
          timestampSeconds: prev.simTimeSeconds,
          timeLabel: formatSimClock(prev.simTimeSeconds),
          type: 'critical' as const,
          message: `EVENTO DE CONTINGÊNCIA N-2: Trip repentino de 2.800 MW nas usinas hidroelétricas estruturantes!`
        },
        ...prev.events
      ];
      return {
        ...prev,
        hydro: {
          ...prev.hydro,
          actualMW: hydroNewActual
        },
        events: events.slice(0, 40)
      };
    });
  };

  // Continuous physics engine ticker (runs only when modal is open)
  useEffect(() => {
    if (!isOpen) return;

    lastFrameTimeRef.current = performance.now();
    lastHistoryPushRef.current = performance.now();

    const loop = (now: number) => {
      const deltaMs = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      // Cap deltaMs to avoid simulation explosions on tab switch
      const dtSeconds = Math.min(deltaMs / 1000, 0.1);

      if (dtSeconds > 0 && stateRef.current.speedMultiplier > 0 && !stateRef.current.isBlackout) {
        const nextState = stepSimulation(stateRef.current, dtSeconds);
        stateRef.current = nextState;
        setSimState(nextState);

        // Record history point at ~15-20 Hz for smooth chart without bloating memory
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
            // Keep last 150 points (~10-15 seconds window)
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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#080b11] border border-slate-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[96vh] flex flex-col overflow-hidden text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top SCADA Modal Bar */}
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/70 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide font-mono">
                  SALA DE OPERAÇÃO & ESTABILIDADE 60 HZ
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  MINI-ONS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center space-x-2">
                <span>Balanço Ativo • Equação de Swing • Inércia Dinâmica Heq</span>
              </p>
            </div>
          </div>

          {/* Right Header Action Tools: Time, Speed, Reset & Close */}
          <div className="flex items-center space-x-2 font-mono text-xs">
            {/* Simulation Clock Display */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{formatSimClock(simState.simTimeSeconds)}</span>
              <span className="text-[10px] text-slate-500 font-semibold">BRT</span>
            </div>

            {/* Speed Multipliers */}
            <div className="flex items-center space-x-0.5 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-[11px]">
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
                title="Recomendado para simular o Crepúsculo da Curva do Pato"
              >
                5x
              </button>
              <button
                type="button"
                onClick={() => handleSetSpeed(10)}
                className={`px-2 py-1 rounded transition cursor-pointer ${
                  simState.speedMultiplier === 10 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                10x
              </button>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={() => handleReset()}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              title="Reiniciar Simulação"
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

        {/* Scenario Selection Tabs */}
        <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between overflow-x-auto gap-2 font-mono text-xs">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-slate-500 text-[10px] uppercase font-bold mr-1">CENÁRIOS:</span>
            <button
              type="button"
              onClick={() => handleSelectScenario('pato')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold cursor-pointer ${
                scenarioId === 'pato'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Curva do Pato (17h30)
            </button>
            <button
              type="button"
              onClick={() => handleSelectScenario('trip_itaipu')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold cursor-pointer ${
                scenarioId === 'trip_itaipu'
                  ? 'bg-red-500/20 text-red-300 border-red-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Perda de Usina (-2.8 GW)
            </button>
            <button
              type="button"
              onClick={() => handleSelectScenario('alta_renovavel')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold cursor-pointer ${
                scenarioId === 'alta_renovavel'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Baixa Inércia & Curtailment
            </button>
            <button
              type="button"
              onClick={() => handleSelectScenario('livre')}
              className={`px-3 py-1.5 rounded-lg border transition font-semibold cursor-pointer ${
                scenarioId === 'livre'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Modo Livre (Sandbox)
            </button>
          </div>

          <div className="text-[11px] text-slate-400 shrink-0 hidden md:block">
            {scenarioId === 'pato' && 'Compense a queda solar das 17h30 com rampas hidroelétricas.'}
            {scenarioId === 'trip_itaipu' && 'Teste a reação inercial e acionamento de reserva primária.'}
            {scenarioId === 'alta_renovavel' && 'Controle o excesso e a alta volatilidade aplicando curtailment.'}
            {scenarioId === 'livre' && 'Controle total sem roteiro predefinido.'}
          </div>
        </div>

        {/* Scrollable Main Control Room Viewport */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Blackout Warning Banner if triggered */}
          {simState.isBlackout && (
            <div className="p-4 rounded-xl bg-red-950/70 border border-red-600 text-red-200 flex items-center justify-between animate-pulse">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <h3 className="font-mono font-bold text-sm text-white">COLAPSO DO SISTEMA INTERLIGADO (APAGÃO GERAL)</h3>
                  <p className="text-xs font-mono text-red-300 mt-0.5">{simState.blackoutReason}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleReset()}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition cursor-pointer"
              >
                REINICIAR GRID
              </button>
            </div>
          )}

          {/* Top Row: Tachometer + Real-time Strip Chart */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-72 shrink-0">
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
              currentGenMW={totalGenMW}
              currentLoadMW={simState.actualLoadMW}
              isBlackout={simState.isBlackout}
            />
          </div>

          {/* Middle Row: Dispatch Control Desk (Fleet Sliders & Actions) */}
          <DispatchControlDesk
            state={simState}
            onUpdateHydroTarget={handleUpdateHydroTarget}
            onUpdateThermalTarget={handleUpdateThermalTarget}
            onUpdateSolarCurtailment={handleUpdateSolarCurtailment}
            onUpdateWindCurtailment={handleUpdateWindCurtailment}
            onTriggerGeneratorTrip={handleTriggerGeneratorTrip}
            onTogglePrimaryControl={handleTogglePrimaryControl}
          />

          {/* Bottom Row: SCADA Event Log + Technical Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs font-mono">
            {/* Event Log */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col h-40">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 border-b border-slate-900 pb-1">
                <span className="font-bold text-slate-300 uppercase">LOG DE EVENTOS & PROTEÇÃO SCADA</span>
                <span>{simState.events.length} registros</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono text-[10px]">
                {simState.events.length === 0 ? (
                  <span className="text-slate-600 italic">Nenhum evento anômalo registrado.</span>
                ) : (
                  simState.events.map((ev) => (
                    <div
                      key={ev.id}
                      className={`p-1.5 rounded flex items-start space-x-2 border ${
                        ev.type === 'critical'
                          ? 'bg-red-500/10 border-red-500/30 text-red-300'
                          : ev.type === 'alert'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : ev.type === 'warning'
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="text-slate-500 font-bold shrink-0">[{ev.timeLabel}]</span>
                      <span className="leading-tight">{ev.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Theoretical Physics Card */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between space-y-2 text-slate-300">
              <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-[11px] border-b border-slate-900 pb-1">
                <Info className="w-3.5 h-3.5" />
                <span>Mecânica da Equação de Swing no SIN</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                A aceleração do rotor de todo o parque gerador é regida por:{' '}
                <code className="text-cyan-300 font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">
                  df/dt = (f0 / 2*Heq) * ((P_ger - P_carga)/S_base)
                </code>
                . Quando a geração de hidrelétricas síncronas é substituída por solar/eólica (fontes baseadas em inversores IBR), a inércia mecânica real cai de ~4.5s para ~1.5s, dobrando o RoCoF e a sensibilidade a qualquer degrau de carga.
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Norma ONS: Faixa normal 59.90 Hz - 60.10 Hz</span>
                <span>ERAC 1: 59.50 Hz (-5% Carga)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-slate-800/80 bg-slate-950/70 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Simulador de Alta Fidelidade (SIN 60 Hz) • ONS Educational Lab</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
