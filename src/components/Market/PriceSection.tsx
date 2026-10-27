import React from 'react';
import { getNumberLocale } from '../../i18n/language';
import { cmoHourlyProfile, marketMonthly, type MarketMonth } from '../../data/marketData';
import { SourcesList } from '../Sources/SourcesList';
import { CmoHourlyProfileChart } from './CmoHourlyProfileChart';
import { EarCmoScatter } from './EarCmoScatter';
import { formatBRL, formatMonth } from './format';
import { formatDate } from '../../utils/format';
import { useMarketCopy } from './copy';
import { ModulationCostBars } from './ModulationCostBars';

const SIMILAR_WATER = { min: 60, max: 75 };

const formatRatio = (ratio: number | null) => (ratio === null ? '—' : `${ratio.toLocaleString(getNumberLocale(), { minimumFractionDigits: 1 })}×`);

const yearOf = (m: MarketMonth) => Number(m.mes.slice(0, 4));

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const cmoWithSimilarWater = (months: MarketMonth[], fromYear: number, toYear: number) => {
  const cmos = months
    .filter((m) => yearOf(m) >= fromYear && yearOf(m) <= toYear)
    .filter((m) => m.earBrasil >= SIMILAR_WATER.min && m.earBrasil <= SIMILAR_WATER.max)
    .map((m) => m.cmo);
  return { median: median(cmos), count: cmos.length };
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11px] text-slate-500">{children}</h4>
);

export const PriceSection: React.FC = () => {
  const c = useMarketCopy();
  const { anos, ultimoDado, inicio, sources } = cmoHourlyProfile;
  const lastData = formatDate(ultimoDado);
  const duckYears = anos.filter((yr) => yr.ano >= 2024);

  const { meses, blocoAnoCorrente } = marketMonthly;
  const lastMonth = meses[meses.length - 1];
  const oldRegime = cmoWithSimilarWater(meses, 2022, 2023);
  const newRegime = cmoWithSimilarWater(meses, 2025, blocoAnoCorrente.ano);
  const recentModulation = meses.filter((m) => yearOf(m) >= 2025 && m.modulacao !== null).map((m) => m.modulacao as number);

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-slate-100">{c.title}</h2>
        <p className="mt-1 text-xs text-slate-400">
          {c.intro}
        </p>
      </header>

      <article className="border-t border-slate-800 pt-6 space-y-6">
        <div>
          <p className="text-[11px] text-cyan-300">{c.duck.kicker(formatDate(inicio).full, lastData.full)}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 leading-snug">{c.duck.title}</h3>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {c.duck.body}
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-x-6 border-y border-slate-800/70 py-4">
          {duckYears.map((yr) => (
            <div key={yr.ano}>
              <dt className="text-[11px] text-slate-500 font-mono tabular-nums">{yr.ano}</dt>
              <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">{formatRatio(yr.razao18h12hMesmaJanela)}</dd>
              <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">{c.duck.ratio}</dd>
            </div>
          ))}
        </dl>
        <p className="-mt-3 text-[11px] text-slate-500 leading-relaxed">
          {c.duck.sameWindow(lastData.short)}
        </p>

        <CmoHourlyProfileChart years={anos} lastDataLabel={lastData.short} />

        <div className="space-y-3">
          <Label>{c.duck.tableTitle}</Label>
          <table className="w-full max-w-md text-xs">
            <thead>
              <tr className="text-[11px] text-slate-500 text-left">
                <th className="py-1 font-normal">{c.duck.year}</th>
                <th className="py-1 font-normal text-right">{c.duck.fullYear}</th>
                <th className="py-1 font-normal text-right">{c.duck.window(lastData.short)}</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {anos.map((yr) => (
                <tr key={yr.ano} className="border-t border-slate-800/70">
                  <td className="py-1 text-slate-300">{yr.ano}</td>
                  <td className="py-1 text-right text-slate-100">{yr.parcial ? '—' : formatRatio(yr.razao18h12h)}</td>
                  <td className="py-1 text-right text-slate-100">{formatRatio(yr.razao18h12hMesmaJanela)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {c.duck.tableNote}
          </p>
        </div>

        <SourcesList sources={sources} />
      </article>

      <article className="border-t border-slate-800 pt-6 space-y-6">
        <div>
          <p className="text-[11px] text-cyan-300">{c.water.kicker}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 leading-snug">{c.water.title}</h3>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {c.water.body}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 border-y border-slate-800/70 py-4">
          {[
            { label: '2022–2023', stats: oldRegime },
            { label: `2025–${blocoAnoCorrente.ano}`, stats: newRegime }
          ].map(({ label, stats }) => (
            <div key={label}>
              <dt className="text-[11px] text-slate-500 font-mono tabular-nums">{label}</dt>
              <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">R$ {formatBRL(stats.median)}</dd>
              <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                {c.water.statNote(stats.count, SIMILAR_WATER.min, SIMILAR_WATER.max)}
              </dd>
            </div>
          ))}
        </dl>

        <EarCmoScatter months={meses} />

        <p className="text-[11px] text-slate-500 leading-relaxed">
          {c.water.footnote(formatMonth(lastMonth.mes), formatDate(marketMonthly.ultimoDado).short)}
        </p>
      </article>

      <article className="border-t border-slate-800 pt-6 space-y-6">
        <div>
          <p className="text-[11px] text-cyan-300">{c.shaping.kicker}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 leading-snug">{c.shaping.title}</h3>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {c.shaping.body}
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-x-6 border-y border-slate-800/70 py-4">
          <div>
            <dt className="text-[11px] text-slate-500 font-mono tabular-nums">2025–{blocoAnoCorrente.ano}</dt>
            <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">
              R$ {formatBRL(Math.min(...recentModulation))}–{formatBRL(Math.max(...recentModulation))}
            </dd>
            <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">{c.shaping.rangeNote}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-slate-500 font-mono tabular-nums">{blocoAnoCorrente.ano} · flat</dt>
            <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">R$ {formatBRL(blocoAnoCorrente.flat)}</dd>
            <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">{c.shaping.flatNote}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-slate-500 font-mono tabular-nums">{blocoAnoCorrente.ano} · {c.shaping.eveningLabel}</dt>
            <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">R$ {formatBRL(blocoAnoCorrente.fimDeTarde18h22h)}</dd>
            <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">{c.shaping.eveningNote}</dd>
          </div>
        </dl>

        <div className="space-y-2">
          <Label>{c.shaping.barsTitle}</Label>
          <ModulationCostBars months={meses} />
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          {c.shaping.footnote}
        </p>

        <SourcesList sources={marketMonthly.sources} />
      </article>
    </section>
  );
};
