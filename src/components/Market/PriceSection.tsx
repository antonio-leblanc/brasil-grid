import React from 'react';
import { cmoHourlyProfile, marketMonthly, type MarketMonth } from '../../data/marketData';
import { SourcesList } from '../Sources/SourcesList';
import { CmoHourlyProfileChart } from './CmoHourlyProfileChart';
import { EarCmoScatter } from './EarCmoScatter';
import { formatBRL, formatMonth } from './format';
import { ModulationCostBars } from './ModulationCostBars';

const SIMILAR_WATER = { min: 60, max: 75 };

const formatRatio = (ratio: number | null) => (ratio === null ? '—' : `${ratio.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}×`);

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  return { short: `${day}/${month}`, full: `${day}/${month}/${year}` };
};

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
        <h2 className="text-lg font-semibold text-slate-100">Preço</h2>
        <p className="mt-1 text-xs text-slate-400">
          CMO (custo marginal de operação): custo do próximo MWh, calculado pelo ONS a cada meia hora por subsistema.
        </p>
      </header>

      <article className="border-t border-slate-800 pt-6 space-y-6">
        <div>
          <p className="text-[11px] text-cyan-300">Sudeste/Centro-Oeste · {formatDate(inicio).full} a {lastData.full}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 leading-snug">A curva do pato chegou ao preço</h3>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Até 2023 o CMO médio era <strong className="text-slate-100">plano ao longo do dia</strong>: o preço dependia da água no
            reservatório, não da hora. Desde 2024 ele cai no meio do dia e dispara no fim da tarde, e o vão aumenta a cada ano.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-x-6 border-y border-slate-800/70 py-4">
          {duckYears.map((yr) => (
            <div key={yr.ano}>
              <dt className="text-[11px] text-slate-500 font-mono tabular-nums">{yr.ano}</dt>
              <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">{formatRatio(yr.razao18h12hMesmaJanela)}</dd>
              <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">CMO 18h ÷ 12h</dd>
            </div>
          ))}
        </dl>
        <p className="-mt-3 text-[11px] text-slate-500 leading-relaxed">
          Razão na mesma janela em todos os anos (1º/jan a {lastData.short}), pra comparar com o ano corrente.
        </p>

        <CmoHourlyProfileChart years={anos} lastDataLabel={lastData.short} />

        <div className="space-y-3">
          <Label>Razão 18h ÷ 12h por ano</Label>
          <table className="w-full max-w-md text-xs">
            <thead>
              <tr className="text-[11px] text-slate-500 text-left">
                <th className="py-1 font-normal">Ano</th>
                <th className="py-1 font-normal text-right">Ano inteiro</th>
                <th className="py-1 font-normal text-right">1º/jan a {lastData.short}</th>
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
            Média de cada hora cheia (18:00 e 18:30 juntas). Em 2023 o CMO do meio-dia ficou em R$ 0 e a razão não tem sentido.
            O ONS não publicou o CMO do Sudeste em 42 dias de 2020 a 2026; a média usa os dias que existem.
          </p>
        </div>

        <SourcesList sources={sources} />
      </article>

      <article className="border-t border-slate-800 pt-6 space-y-6">
        <div>
          <p className="text-[11px] text-cyan-300">EAR do SIN × CMO do Sudeste/Centro-Oeste · média do mês</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 leading-snug">A água já não explica o preço</h3>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            EAR (energia armazenada) é a água nos reservatórios, medida pela energia que ela gera. Até 2024, preço alto vinha de
            reservatório baixo. De 2025 em diante, <strong className="text-slate-100">com a mesma água, o CMO do mês fica várias vezes acima</strong>.
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
                CMO mediano dos {stats.count} meses com EAR entre {SIMILAR_WATER.min}% e {SIMILAR_WATER.max}%
              </dd>
            </div>
          ))}
        </dl>

        <EarCmoScatter months={meses} />

        <p className="text-[11px] text-slate-500 leading-relaxed">
          EAR do Brasil = água somada das regiões ÷ capacidade somada; o Sudeste é ~70% dela. {formatMonth(lastMonth.mes)} é parcial
          (até {formatDate(marketMonthly.ultimoDado).short}).
        </p>
      </article>

      <article className="border-t border-slate-800 pt-6 space-y-6">
        <div>
          <p className="text-[11px] text-cyan-300">Sudeste/Centro-Oeste · mensal</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 leading-snug">Quanto custa a curva do pato</h3>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Quem vende energia flat (o mesmo MW toda hora) e entrega a curva de carga do cliente compra mais nas horas caras.
            O custo de modulação é o CMO ponderado pela carga menos a média simples. Pra carga média do Sudeste ele é{' '}
            <strong className="text-slate-100">pequeno</strong>; pesa pra quem consome no fim da tarde.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-x-6 border-y border-slate-800/70 py-4">
          <div>
            <dt className="text-[11px] text-slate-500 font-mono tabular-nums">2025–{blocoAnoCorrente.ano}</dt>
            <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">
              R$ {formatBRL(Math.min(...recentModulation))}–{formatBRL(Math.max(...recentModulation))}
            </dd>
            <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">modulação por MWh, carga média do SE</dd>
          </div>
          <div>
            <dt className="text-[11px] text-slate-500 font-mono tabular-nums">{blocoAnoCorrente.ano} · flat</dt>
            <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">R$ {formatBRL(blocoAnoCorrente.flat)}</dd>
            <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">CMO médio, todas as horas</dd>
          </div>
          <div>
            <dt className="text-[11px] text-slate-500 font-mono tabular-nums">{blocoAnoCorrente.ano} · 18h–22h</dt>
            <dd className="mt-0.5 font-mono tabular-nums text-lg text-slate-100">R$ {formatBRL(blocoAnoCorrente.fimDeTarde18h22h)}</dd>
            <dd className="mt-0.5 text-[11px] text-slate-500 leading-snug">CMO médio só no fim da tarde</dd>
          </div>
        </dl>

        <div className="space-y-2">
          <Label>Custo de modulação por mês, R$/MWh</Label>
          <ModulationCostBars months={meses} />
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          Usa o CMO, não o PLD: sem o piso e o teto da Aneel, o pico aparece maior do que o mercado paga. A carga é a do Sudeste
          inteiro; residência e comércio pequeno têm pico mais concentrado no fim da tarde e custo maior que este.
        </p>

        <SourcesList sources={marketMonthly.sources} />
      </article>
    </section>
  );
};
