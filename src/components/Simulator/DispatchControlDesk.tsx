import React from 'react';
import type { GridSimulationState, PlantFleetState } from '../../services/gridPhysics';
import { formatDecimal } from '../../utils/format';
import { useSimulatorCopy } from './copy';

interface DispatchControlDeskProps {
  state: GridSimulationState;
  totalGenMW: number;
  tripMW: number;
  onUpdateHydroTarget: (targetMW: number) => void;
  onUpdateThermalTarget: (targetMW: number) => void;
  onSetCurtailment: (percent: number) => void;
  onTriggerGeneratorTrip: () => void;
  onTogglePrimaryControl: () => void;
  onToggleSecondaryControl: () => void;
}

const BALANCE_SCALE_MW = 110000;
const BALANCED_BAND_MW = 400;
const CURTAILMENT_STEP_PERCENT = 50;

const gw = (mw: number, digits = 1) => formatDecimal(mw / 1000, digits);

const Num: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-mono tabular-nums ${className}`}>{children}</span>
);

interface FleetRowProps {
  label: string;
  dotClass: string;
  fleet: PlantFleetState;
  children?: React.ReactNode;
  detail?: React.ReactNode;
}

const FleetRow: React.FC<FleetRowProps> = ({ label, dotClass, fleet, detail, children }) => (
  <div className="py-2.5">
    <div className="flex items-baseline justify-between gap-3 text-xs">
      <span className="flex items-center gap-2 text-slate-300">
        <span className={`w-2 h-2 rounded-full ${dotClass}`} />
        {label}
        <Num className="text-[11px] text-slate-600">{fleet.rampRateMWs} MW/s</Num>
      </span>
      <span className="text-slate-500">
        <Num className="text-slate-100">{gw(fleet.actualMW)}</Num>
        {detail}
        <span className="ml-1">GW</span>
      </span>
    </div>
    {children && <div className="mt-2">{children}</div>}
  </div>
);

export const DispatchControlDesk: React.FC<DispatchControlDeskProps> = ({
  state,
  totalGenMW,
  tripMW,
  onUpdateHydroTarget,
  onUpdateThermalTarget,
  onSetCurtailment,
  onTriggerGeneratorTrip,
  onTogglePrimaryControl,
  onToggleSecondaryControl
}) => {
  const c = useSimulatorCopy().desk;
  const {
    hydro,
    thermal,
    solar,
    wind,
    actualLoadMW,
    eracStage,
    shedLoadMW,
    isPrimaryControlEnabled,
    isSecondaryControlEnabled,
    secondaryControlMW
  } = state;
  const isDay = state.scenarioId === 'dia';

  const deltaMW = totalGenMW - actualLoadMW;
  const isBalanced = Math.abs(deltaMW) < BALANCED_BAND_MW;
  const deltaTone = isBalanced ? 'text-emerald-400' : deltaMW > 0 ? 'text-amber-400' : 'text-red-400';
  const barTone = isBalanced ? 'bg-emerald-400' : deltaMW > 0 ? 'bg-amber-400' : 'bg-red-400';

  const curtailmentPercent = Math.max(solar.curtailmentPercent ?? 0, wind.curtailmentPercent ?? 0);
  const isCurtailing = curtailmentPercent > 0;

  const clampHydro = (mw: number) => Math.max(hydro.minTechnicalMW, Math.min(hydro.maxCapacityMW, mw));
  const balanceHydro = () =>
    onUpdateHydroTarget(clampHydro(actualLoadMW - thermal.actualMW - solar.actualMW - wind.actualMW));

  const smallButton =
    'px-2 py-0.5 rounded border border-slate-800 text-[11px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors cursor-pointer';
  const slider = 'sim-range w-full cursor-pointer';

  const target = (fleet: PlantFleetState) => (
    <span className="ml-1">
      / {isDay ? c.schedule : c.target} <Num>{gw(fleet.targetMW)}</Num>
    </span>
  );

  const toggle = (label: string, checked: boolean, onClick: () => void, title: string) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onClick}
      className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer"
      title={title}
    >
      <span className={`relative w-7 h-4 rounded-full transition-colors ${checked ? 'bg-emerald-500/70' : 'bg-slate-700'}`}>
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-slate-100 transition-[left] ${checked ? 'left-3.5' : 'left-0.5'}`}
        />
      </span>
      {label}
    </button>
  );

  return (
    <div className="space-y-4 select-none">
      <div>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="text-slate-500">{c.generation}</div>
            <Num className="text-lg text-slate-100">{gw(totalGenMW)}</Num> <span className="text-slate-500">GW</span>
          </div>
          <div>
            <div className="text-slate-500">{c.load}</div>
            <Num className="text-lg text-slate-100">{gw(actualLoadMW)}</Num> <span className="text-slate-500">GW</span>
          </div>
          <div>
            <div className="text-slate-500">ΔP</div>
            <Num className={`text-lg ${deltaTone}`}>
              {Math.abs(deltaMW) < 5 || deltaMW > 0 ? '+' : '−'}
              {gw(Math.abs(deltaMW), 2)}
            </Num>{' '}
            <span className="text-slate-500">GW</span>
          </div>
        </div>

        <div className="mt-2 relative h-1.5 rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-[width] duration-150 ${barTone}`}
            style={{ width: `${Math.min(100, (totalGenMW / BALANCE_SCALE_MW) * 100)}%` }}
          />
          <div
            className="absolute -top-1 -bottom-1 w-0.5 bg-slate-100"
            style={{ left: `${Math.min(100, (actualLoadMW / BALANCE_SCALE_MW) * 100)}%` }}
            title={c.load}
          />
        </div>
        {eracStage > 0 && (
          <p className="mt-2 text-xs text-red-400">
            {c.eracShed(<Num>{gw(shedLoadMW)}</Num>)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div className="divide-y divide-slate-800/70 border-y border-slate-800/70">
          <FleetRow label={c.hydro} dotClass="bg-sky-400" fleet={hydro} detail={target(hydro)}>
            {!isDay && (
              <>
                <input
                  type="range"
                  min={hydro.minTechnicalMW}
                  max={hydro.maxCapacityMW}
                  step={500}
                  value={hydro.targetMW}
                  onChange={(e) => onUpdateHydroTarget(Number(e.target.value))}
                  className={`${slider} text-sky-400`}
                  aria-label={c.hydroTarget}
                />
                <div className="mt-1.5 flex gap-1">
                  <button type="button" onClick={() => onUpdateHydroTarget(clampHydro(hydro.targetMW - 2000))} className={smallButton}>
                    −2 GW
                  </button>
                  <button type="button" onClick={() => onUpdateHydroTarget(clampHydro(hydro.targetMW + 2000))} className={smallButton}>
                    +2 GW
                  </button>
                  <button
                    type="button"
                    onClick={balanceHydro}
                    className={smallButton}
                    title={c.zeroDeltaTitle}
                  >
                    {c.zeroDelta}
                  </button>
                </div>
              </>
            )}
          </FleetRow>

          <FleetRow label={c.thermal} dotClass="bg-rose-500" fleet={thermal} detail={target(thermal)}>
            {!isDay && (
              <>
                <input
                  type="range"
                  min={thermal.minTechnicalMW}
                  max={thermal.maxCapacityMW}
                  step={200}
                  value={thermal.targetMW}
                  onChange={(e) => onUpdateThermalTarget(Number(e.target.value))}
                  className={`${slider} text-rose-500`}
                  aria-label={c.thermalTarget}
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-600">
                  <span>{c.min} {gw(thermal.minTechnicalMW, 0)}</span>
                  <span>{c.max} {gw(thermal.maxCapacityMW, 0)}</span>
                </div>
              </>
            )}
          </FleetRow>
        </div>

        <div className="divide-y divide-slate-800/70 border-y border-slate-800/70 md:border-t">
          <FleetRow label={c.solar} dotClass="bg-amber-400" fleet={solar} />
          <FleetRow label={c.wind} dotClass="bg-emerald-400" fleet={wind} />
          {isSecondaryControlEnabled && (
            <div className="py-2.5 flex items-baseline justify-between text-xs">
              <span className="text-slate-400" title={c.agcAdjustTitle}>
                {c.agcAdjust}
              </span>
              <span className="text-slate-500">
                <Num className="text-slate-100">
                  {secondaryControlMW >= 0 ? '+' : '−'}
                  {gw(Math.abs(secondaryControlMW), 2)}
                </Num>
                <span className="ml-1">GW</span>
              </span>
            </div>
          )}
          {!isDay && (
            <div className="py-2.5 flex items-center justify-between text-xs">
              <span className="text-slate-400">{c.curtailment}</span>
              <button
                type="button"
                onClick={() => onSetCurtailment(isCurtailing ? 0 : CURTAILMENT_STEP_PERCENT)}
                className={`${smallButton} ${isCurtailing ? 'text-amber-300 border-amber-500/40' : ''}`}
              >
                <Num>{isCurtailing ? `${curtailmentPercent}%` : '0%'}</Num>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {toggle(
            c.primary,
            isPrimaryControlEnabled,
            onTogglePrimaryControl,
            c.primaryTitle
          )}
          {toggle(
            c.agc,
            isSecondaryControlEnabled,
            onToggleSecondaryControl,
            c.agcTitle
          )}
        </div>

        <button
          type="button"
          onClick={onTriggerGeneratorTrip}
          className="px-2.5 py-1 rounded-md border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          title={c.tripTitle}
        >
          {c.trip} <Num>−{gw(tripMW)}</Num> GW
        </button>
      </div>
    </div>
  );
};
