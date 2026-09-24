import React, { useRef, useEffect } from 'react';
import type { HistoryPoint } from '../../services/gridPhysics';

interface FrequencyStripChartProps {
  history: HistoryPoint[];
  currentFreq: number;
  currentGenMW: number;
  currentLoadMW: number;
  isBlackout: boolean;
}

export const FrequencyStripChart: React.FC<FrequencyStripChartProps> = ({
  history,
  currentFreq,
  currentGenMW,
  currentLoadMW,
  isBlackout
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Layout partitioning:
    // Top 60%: Frequency scope (57.0 Hz to 61.0 Hz)
    // Bottom 40%: Power balance scope (Gen vs Load in GW)
    const padLeft = 45;
    const padRight = 15;
    const padTop = 15;
    const padBottom = 20;

    const availableW = width - padLeft - padRight;
    const scopeH = height - padTop - padBottom;
    const freqH = scopeH * 0.58;
    const splitGap = 10;
    const powerTop = padTop + freqH + splitGap;
    const powerH = scopeH - freqH - splitGap;

    // Clear background
    ctx.fillStyle = '#05070b';
    ctx.fillRect(0, 0, width, height);

    // Draw Frequency Grid (Top)
    // Skewed low because underfrequency (ERAC) is the dominant failure mode; overfrequency is capped by P(f)
    const freqMin = 57.0;
    const freqMax = 61.0;
    const getFreqY = (hz: number) => padTop + freqH - ((hz - freqMin) / (freqMax - freqMin)) * freqH;

    const freqLevels = [
      { hz: 60.5, color: '#f59e0b', dash: [3, 3], label: '60.5' },
      { hz: 60.0, color: '#10b981', dash: [], label: '60.00' },
      { hz: 59.5, color: '#475569', dash: [2, 3], label: '59.5' },
      { hz: 58.5, color: '#ef4444', dash: [4, 3], label: '58.5 (ERAC)' },
      { hz: 57.5, color: '#ef4444', dash: [2, 3], label: '57.5' }
    ];

    ctx.font = '9px monospace';
    ctx.textAlign = 'right';

    for (const lvl of freqLevels) {
      const y = getFreqY(lvl.hz);
      ctx.strokeStyle = lvl.color;
      ctx.lineWidth = lvl.hz === 60.0 ? 1.5 : 1;
      ctx.setLineDash(lvl.dash);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + availableW, y);
      ctx.stroke();

      ctx.fillStyle = lvl.hz === 60.0 ? '#10b981' : lvl.hz <= 58.5 ? '#ef4444' : '#64748b';
      ctx.fillText(lvl.label, padLeft - 6, y + 3);
    }
    ctx.setLineDash([]);

    // Draw Power Grid (Bottom)
    const maxPower = 110000; // 110 GW
    const minPower = 40000; // 40 GW
    const getPowerY = (mw: number) => powerTop + powerH - ((mw - minPower) / (maxPower - minPower)) * powerH;

    const powerTicks = [50000, 75000, 100000];
    for (const p of powerTicks) {
      const y = getPowerY(p);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + availableW, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.fillText(`${(p / 1000).toFixed(0)}G`, padLeft - 6, y + 3);
    }
    ctx.setLineDash([]);

    // Trace plot data
    if (history.length > 1) {
      const count = history.length;
      const getX = (index: number) => padLeft + (index / (count - 1)) * availableW;

      // 1. Draw Frequency Trace
      ctx.lineWidth = 2;
      ctx.strokeStyle = isBlackout ? '#ef4444' : '#38bdf8';
      ctx.beginPath();
      history.forEach((pt, idx) => {
        const x = getX(idx);
        const y = Math.max(padTop, Math.min(padTop + freqH, getFreqY(pt.frequencyHz)));
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Current frequency head glow dot
      const lastIdx = count - 1;
      const lastX = getX(lastIdx);
      const lastY = Math.max(padTop, Math.min(padTop + freqH, getFreqY(currentFreq)));
      ctx.fillStyle = isBlackout ? '#ef4444' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Generation Trace (Cyan/Emerald)
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      history.forEach((pt, idx) => {
        const x = getX(idx);
        const y = Math.max(powerTop, Math.min(powerTop + powerH, getPowerY(pt.totalGenMW)));
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // 3. Draw Load Trace (Amber dashed)
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      history.forEach((pt, idx) => {
        const x = getX(idx);
        const y = Math.max(powerTop, Math.min(powerTop + powerH, getPowerY(pt.totalLoadMW)));
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Time axis label at bottom
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.fillText('HISTÓRICO TEMPORAL (OSCILOSCÓPIO SCADA)', padLeft, height - 6);

    ctx.textAlign = 'right';
    const deltaMW = currentGenMW - currentLoadMW;
    const deltaColor = Math.abs(deltaMW) < 500 ? '#10b981' : deltaMW > 0 ? '#38bdf8' : '#ef4444';
    ctx.fillStyle = deltaColor;
    ctx.fillText(
      `ΔP: ${deltaMW >= 0 ? '+' : ''}${(deltaMW / 1000).toFixed(2)} GW`,
      padLeft + availableW,
      height - 6
    );
  }, [history, currentFreq, currentGenMW, currentLoadMW, isBlackout]);

  return (
    <div className="flex-1 flex flex-col p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 shadow-inner select-none font-mono">
      <div className="flex items-center justify-between text-[11px] mb-2 px-1">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-slate-300">REGISTRADOR GRÁFICO (f & P)</span>
          <div className="flex items-center space-x-1.5 text-[10px]">
            <span className="w-2.5 h-0.5 bg-sky-400 rounded"></span>
            <span className="text-slate-400">f(t) [Hz]</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px]">
            <span className="w-2.5 h-0.5 bg-emerald-400 rounded"></span>
            <span className="text-slate-400">P_ger</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px]">
            <span className="w-2.5 h-0.5 bg-amber-400 rounded stroke-dasharray"></span>
            <span className="text-slate-400">P_carga</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-500">
          Amostragem em tempo real (60 FPS)
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-[180px]">
        <canvas ref={canvasRef} className="w-full h-full block rounded-lg" />
      </div>
    </div>
  );
};
