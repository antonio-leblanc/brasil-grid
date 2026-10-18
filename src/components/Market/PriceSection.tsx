import React from 'react';
import { cmoHourlyProfile } from '../../data/marketData';
import { SourcesList } from '../Sources/SourcesList';
import { CmoHourlyProfileChart } from './CmoHourlyProfileChart';

const formatRatio = (ratio: number | null) => (ratio === null ? '—' : `${ratio.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}×`);

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  return { short: `${day}/${month}`, full: `${day}/${month}/${year}` };
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11px] text-slate-500">{children}</h4>
);

export const PriceSection: React.FC = () => {
  const { anos, ultimoDado, inicio, sources } = cmoHourlyProfile;
  const lastData = formatDate(ultimoDado);
  const duckYears = anos.filter((yr) => yr.ano >= 2024);

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
    </section>
  );
};
