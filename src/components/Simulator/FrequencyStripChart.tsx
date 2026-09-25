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
  isBlackout
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const padLeft = 45;
    const padRight = 15;
    const padTop = 20;
    const padBottom = 25;

    const availableW = width - padLeft - padRight;
    const availableH = height - padTop - padBottom;

    // Background
    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, width, height);

    // Frequency range: 58.0 to 61.0 Hz
    const freqMin = 58.0;
    const freqMax = 61.0;
    const getFreqY = (hz: number) =>
      padTop + availableH - ((hz - freqMin) / (freqMax - freqMin)) * availableH;

    // 1. Draw Safe Zone Band (59.90 to 60.10 Hz)
    const ySafeTop = getFreqY(60.1);
    const ySafeBottom = getFreqY(59.9);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.fillRect(padLeft, ySafeTop, availableW, ySafeBottom - ySafeTop);

    // 2. Draw Horizontal Grid Lines
    const gridLines = [
      { hz: 60.5, label: '60.5', color: '#334155', dash: [3, 3] },
      { hz: 60.0, label: '60.00 Hz', color: '#10b981', dash: [] },
      { hz: 59.5, label: '59.5', color: '#334155', dash: [3, 3] },
      { hz: 58.5, label: '58.5 (ERAC)', color: '#ef4444', dash: [4, 4] }
    ];

    ctx.font = '10px monospace';
    ctx.textAlign = 'right';

    for (const line of gridLines) {
      const y = getFreqY(line.hz);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.hz === 60.0 ? 1.5 : 1;
      ctx.setLineDash(line.dash);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + availableW, y);
      ctx.stroke();

      ctx.fillStyle = line.hz === 60.0 ? '#10b981' : line.hz === 58.5 ? '#ef4444' : '#64748b';
      ctx.fillText(line.label, padLeft - 6, y + 3);
    }
    ctx.setLineDash([]);

    // 3. Draw Frequency History Path
    if (history.length > 1) {
      const count = history.length;
      const getX = (index: number) => padLeft + (index / (count - 1)) * availableW;

      // Fill area under frequency curve slightly
      ctx.beginPath();
      history.forEach((pt, idx) => {
        const x = getX(idx);
        const y = Math.max(padTop, Math.min(padTop + availableH, getFreqY(pt.frequencyHz)));
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(padLeft + availableW, padTop + availableH);
      ctx.lineTo(padLeft, padTop + availableH);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, padTop, 0, padTop + availableH);
      gradient.addColorStop(0, isBlackout ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.15)');
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw Main Frequency Line
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isBlackout ? '#ef4444' : '#38bdf8';
      ctx.beginPath();
      history.forEach((pt, idx) => {
        const x = getX(idx);
        const y = Math.max(padTop, Math.min(padTop + availableH, getFreqY(pt.frequencyHz)));
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Current live dot at the tip
      const lastIdx = count - 1;
      const lastX = getX(lastIdx);
      const lastY = Math.max(padTop, Math.min(padTop + availableH, getFreqY(currentFreq)));

      ctx.fillStyle = isBlackout ? '#ef4444' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Time axis footer
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.fillText('← Passado (últimos segundos)', padLeft, height - 8);

    ctx.textAlign = 'right';
    ctx.fillText('Tempo Real (Agora) →', padLeft + availableW, height - 8);
  }, [history, currentFreq, isBlackout]);

  return (
    <div className="flex-1 flex flex-col p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-lg select-none">
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-300">HISTÓRICO DE ESTABILIDADE</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            Meta: 60.00 Hz
          </span>
        </div>
        <span className="text-[11px] text-slate-400">Faixa Segura: 59,9 a 60,1 Hz</span>
      </div>

      <div className="flex-1 w-full relative min-h-[170px]">
        <canvas ref={canvasRef} className="w-full h-full block rounded-lg" />
      </div>
    </div>
  );
};
