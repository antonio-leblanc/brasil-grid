import React from 'react';
import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/language';

const strong = (text: string) => <strong className="text-slate-100">{text}</strong>;

const PT = {
  title: 'Preço',
  intro: 'CMO (custo marginal de operação): custo do próximo MWh, calculado pelo ONS a cada meia hora por subsistema.',
  duck: {
    kicker: (from: string, to: string) => `Sudeste/Centro-Oeste · ${from} a ${to}`,
    title: 'A curva do pato chegou ao preço',
    body: (
      <>
        Até 2023 o CMO médio era {strong('plano ao longo do dia')}: o preço dependia da água no reservatório, não da hora.
        Desde 2024 ele cai no meio do dia e dispara no fim da tarde, e o vão aumenta a cada ano.
      </>
    ) as React.ReactNode,
    ratio: 'CMO 18h ÷ 12h',
    sameWindow: (short: string) =>
      `Razão na mesma janela em todos os anos (1º/jan a ${short}), pra comparar com o ano corrente.`,
    tableTitle: 'Razão 18h ÷ 12h por ano',
    year: 'Ano',
    fullYear: 'Ano inteiro',
    window: (short: string) => `1º/jan a ${short}`,
    tableNote:
      'Média de cada hora cheia (18:00 e 18:30 juntas). Em 2023 o CMO do meio-dia ficou em R$ 0 e a razão não tem sentido. O ONS não publicou o CMO do Sudeste em 42 dias de 2020 a 2026; a média usa os dias que existem.'
  },
  water: {
    kicker: 'EAR do SIN × CMO do Sudeste/Centro-Oeste · média do mês',
    title: 'A água já não explica o preço',
    body: (
      <>
        EAR (energia armazenada) é a água nos reservatórios, medida pela energia que ela gera. Até 2024, preço alto vinha
        de reservatório baixo. De 2025 em diante, {strong('com a mesma água, o CMO do mês fica várias vezes acima')}.
      </>
    ) as React.ReactNode,
    statNote: (count: number, min: number, max: number) =>
      `CMO mediano dos ${count} meses com EAR entre ${min}% e ${max}%`,
    footnote: (month: string, short: string) =>
      `EAR do Brasil = água somada das regiões ÷ capacidade somada; o Sudeste é ~70% dela. ${month} é parcial (até ${short}).`
  },
  shaping: {
    kicker: 'Sudeste/Centro-Oeste · mensal',
    title: 'Quanto custa a curva do pato',
    body: (
      <>
        Quem vende energia flat (o mesmo MW toda hora) e entrega a curva de carga do cliente compra mais nas horas caras.
        O custo de modulação é o CMO ponderado pela carga menos a média simples. Pra carga média do Sudeste ele é{' '}
        {strong('pequeno')}; pesa pra quem consome no fim da tarde.
      </>
    ) as React.ReactNode,
    rangeNote: 'modulação por MWh, carga média do SE',
    flatNote: 'CMO médio, todas as horas',
    eveningLabel: '18h–22h',
    eveningNote: 'CMO médio só no fim da tarde',
    barsTitle: 'Custo de modulação por mês, R$/MWh',
    footnote:
      'Usa o CMO, não o PLD: sem o piso e o teto da Aneel, o pico aparece maior do que o mercado paga. A carga é a do Sudeste inteiro; residência e comércio pequeno têm pico mais concentrado no fim da tarde e custo maior que este.'
  },
  charts: {
    partialYear: (year: number, short: string) => `${year} (até ${short})`,
    hourlyAria: 'CMO médio do Sudeste por meia hora do dia, uma linha por ano',
    drought: 'seca',
    today: 'hoje',
    scatterAria: 'Um ponto por mês: EAR do Brasil no eixo horizontal, CMO médio do Sudeste no vertical',
    scatterY: 'CMO médio do mês, R$/MWh',
    scatterX: 'EAR Brasil, média do mês (% da capacidade)',
    earBrazil: 'EAR Brasil',
    cmoSE: 'CMO SE',
    barsAria: 'Custo de modulação do Sudeste por mês, em R$/MWh'
  }
};

const EN: typeof PT = {
  title: 'Price',
  intro: 'CMO (marginal cost of operation): the cost of the next MWh, computed by ONS every half hour for each subsystem.',
  duck: {
    kicker: (from: string, to: string) => `Southeast/Center-West · ${from} to ${to}`,
    title: 'The duck curve has reached the price',
    body: (
      <>
        Until 2023 the average CMO was {strong('flat across the day')}: price depended on the water in the reservoirs, not
        on the hour. Since 2024 it drops at midday and spikes in the late afternoon, and the gap widens every year.
      </>
    ),
    ratio: 'CMO 18:00 ÷ 12:00',
    sameWindow: (short: string) =>
      `Ratio over the same window every year (1 Jan to ${short}), to compare with the current year.`,
    tableTitle: '18:00 ÷ 12:00 ratio by year',
    year: 'Year',
    fullYear: 'Full year',
    window: (short: string) => `1 Jan to ${short}`,
    tableNote:
      'Average of each full hour (18:00 and 18:30 together). In 2023 the midday CMO sat at R$ 0, so the ratio is meaningless. ONS did not publish the Southeast CMO on 42 days between 2020 and 2026; the average uses the days that exist.'
  },
  water: {
    kicker: 'SIN EAR × Southeast/Center-West CMO · monthly average',
    title: 'Water no longer explains the price',
    body: (
      <>
        EAR (stored energy) is the water in the reservoirs, measured by the energy it can generate. Until 2024, high prices
        came from low reservoirs. From 2025 on, {strong('with the same water, the monthly CMO sits several times higher')}.
      </>
    ),
    statNote: (count: number, min: number, max: number) =>
      `Median CMO over the ${count} months with EAR between ${min}% and ${max}%`,
    footnote: (month: string, short: string) =>
      `Brazil EAR = water summed across regions ÷ summed capacity; the Southeast is ~70% of it. ${month} is partial (through ${short}).`
  },
  shaping: {
    kicker: 'Southeast/Center-West · monthly',
    title: 'What the duck curve costs',
    body: (
      <>
        A seller of flat energy (the same MW every hour) who delivers the customer's load curve buys more in the expensive
        hours. The shaping cost is the load-weighted CMO minus the simple average. For the average Southeast load it is{' '}
        {strong('small')}; it weighs on whoever consumes in the late afternoon.
      </>
    ),
    rangeNote: 'shaping cost per MWh, average SE load',
    flatNote: 'Average CMO, all hours',
    eveningLabel: '18:00–22:00',
    eveningNote: 'Average CMO, late afternoon only',
    barsTitle: 'Shaping cost by month, R$/MWh',
    footnote:
      "Uses CMO, not PLD (the spot price): without ANEEL's floor and cap, the peak looks larger than what the market pays. The load is the whole Southeast; homes and small businesses peak harder in the late afternoon and cost more than this."
  },
  charts: {
    partialYear: (year: number, short: string) => `${year} (through ${short})`,
    hourlyAria: 'Average Southeast CMO by half hour of the day, one line per year',
    drought: 'drought',
    today: 'now',
    scatterAria: 'One point per month: Brazil EAR on the horizontal axis, average Southeast CMO on the vertical',
    scatterY: 'Monthly average CMO, R$/MWh',
    scatterX: 'Brazil EAR, monthly average (% of capacity)',
    earBrazil: 'Brazil EAR',
    cmoSE: 'SE CMO',
    barsAria: 'Southeast shaping cost by month, in R$/MWh'
  }
};

const COPY: Record<Lang, typeof PT> = { pt: PT, en: EN };

export const useMarketCopy = () => COPY[useI18n().lang];
