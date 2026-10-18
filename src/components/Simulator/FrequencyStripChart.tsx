import React, { useRef, useEffect } from 'react';
import type { HistoryPoint } from '../../services/gridPhysics';
import { ERAC_STAGES } from '../../services/gridPhysics';
import { formatDecimal } from '../../utils/format';

interface FrequencyStripChartProps {
  history: HistoryPoint[];
  currentFreq: number;
  isBlackout: boolean;
}

const FREQ_MIN_HZ = 58.0;
const FREQ_MAX_HZ = 61.0;

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
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const padLeft = 40;
    const padRight = 8;
    const padTop = 8;
    const padBottom = 8;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const yOf = (hz: number) => {
      const y = padTop + plotH - ((hz - FREQ_MIN_HZ) / (FREQ_MAX_HZ - FREQ_MIN_HZ)) * plotH;
      return Math.max(padTop, Math.min(padTop + plotH, y));
    };

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(52, 211, 153, 0.08)';
    ctx.fillRect(padLeft, yOf(60.1), plotW, yOf(59.9) - yOf(60.1));

    const eracHz = ERAC_STAGES[0].thresholdHz;
    const gridLines = [
      { hz: 60.5, color: '#1e293b', label: '#475569', dash: [] as number[] },
      { hz: 60.0, color: '#334155', label: '#94a3b8', dash: [] as number[] },
      { hz: 59.5, color: '#1e293b', label: '#475569', dash: [] as number[] },
      { hz: eracHz, color: 'rgba(248, 113, 113, 0.5)', label: '#f87171', dash: [3, 3] }
    ];

    ctx.font = '10px ui-monospace, monospace';
    ctx.textAlign = 'right';
    ctx.lineWidth = 1;
    for (const line of gridLines) {
      const y = Math.round(yOf(line.hz)) + 0.5;
      ctx.strokeStyle = line.color;
      ctx.setLineDash(line.dash);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + plotW, y);
      ctx.stroke();
      ctx.fillStyle = line.label;
      ctx.fillText(formatDecimal(line.hz, 1), padLeft - 6, y + 3);
    }
    ctx.setLineDash([]);

    if (history.length > 1) {
      const xOf = (index: number) => padLeft + (index / (history.length - 1)) * plotW;
      const color = isBlackout ? '#f87171' : '#7dd3fc';

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color;
      ctx.beginPath();
      history.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(xOf(idx), yOf(pt.frequencyHz));
        else ctx.lineTo(xOf(idx), yOf(pt.frequencyHz));
      });
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(xOf(history.length - 1), yOf(currentFreq), 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [history, currentFreq, isBlackout]);

  return (
    <div className="flex-1 flex flex-col select-none">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-slate-500">Histórico</span>
        <span className="text-slate-600">
          faixa normal <span className="font-mono">59,9–60,1 Hz</span>
        </span>
      </div>
      <div className="mt-2 flex-1 w-full relative min-h-[180px] rounded-md border border-slate-800">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
    </div>
  );
};
