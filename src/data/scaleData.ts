import type { SourceRef } from './sources';

export interface ScaleLevel {
  unit: string;
  name: string;
  factor: string;
  concept: string;
  examples: {
    item: string;
    power: string;
    description: string;
  }[];
  sources: SourceRef[];
}

export const powerVsEnergyExplainer = {
  power: {
    title: 'Potência (W, kW, MW, GW)',
    analogy: 'O velocímetro do carro / A vazão da torneira (litros por segundo)',
    meaning: 'Taxa instantânea de conversão ou transferência de energia (1 W = 1 J/s). É o fluxo elétrico demandado naquele exato momento.'
  },
  energy: {
    title: 'Energia (Wh, kWh, MWh, GWh, TWh)',
    analogy: 'O odômetro do carro / O volume de água acumulado na caixa',
    meaning: 'O total acumulado ao longo do tempo: a potência integrada no tempo (Energia = Potência × Tempo, para potência constante). 1 kWh = 1 kW durante 1 hora = 3,6 MJ.'
  }
};

export const scaleLevels: ScaleLevel[] = [
  {
    unit: 'W',
    name: 'Watts',
    factor: '10⁰ W (1 Watt)',
    concept: 'Escala de componentes eletrônicos individuais e iluminação.',
    examples: [
      { item: 'Lâmpada LED', power: '9 W', description: 'Entrega fluxo luminoso equivalente ao de uma incandescente de 60 W, com cerca de 1/6 da potência.' },
      { item: 'Modem de Internet', power: '~8 W', description: 'O Procel estima 1,9 kWh/mês para 8 horas de uso por dia (1,92 kWh ÷ 240 h = 8 W).' },
      { item: 'Notebook em Operação', power: '~20 W (média)', description: 'O Procel estima 4,8 kWh/mês para 8 horas de uso por dia (4,8 kWh ÷ 240 h = 20 W).' }
    ],
    sources: [
      { label: 'Procel/Eletrobras — Tabela de estimativa de consumo médio mensal de eletrodomésticos', url: 'https://industriahoje.com.br/wp-content/uploads/downloads/2015/01/Tabela-Consumo-Equipamentos-Procel-Eletrobras.pdf' },
      { label: 'Abilumi — Tabela de Equivalência (2020)', url: 'https://www.abilumi.org.br/tabela-de-equivalencia-abilumi-2020/' }
    ]
  },
  {
    unit: 'kW',
    name: 'Quilowatts',
    factor: '10³ W (1.000 Watts)',
    concept: 'Escala dos aparelhos domésticos pesados e do consumo residencial mensal.',
    examples: [
      { item: 'Geladeira 2 Portas Frost Free', power: '~0,08 kW (média)', description: 'O Procel estima ~57 kWh/mês. Como o compressor liga e desliga, a potência média (57 kWh ÷ 720 h ≈ 79 W) fica bem abaixo da nominal.' },
      { item: 'Ar-Condicionado Split 12.000 BTU/h', power: '~0,8 kW (média)', description: 'O Procel estima ~194 kWh/mês a 8 horas por dia (faixa de 10.001 a 15.000 BTU/h; 194 kWh ÷ 240 h ≈ 0,8 kW) — mais que o consumo residencial médio brasileiro.' },
      { item: 'Residência Média BR Ligada 24 h', power: '~0,24 kW (média)', description: '177 kWh/mês × 12 ÷ 8.760 h ≈ 0,24 kW contínuos. Menos que um único split rodando: a casa média passa a maior parte do tempo com carga baixa e tem picos curtos (chuveiro).' },
      { item: 'Chuveiro Elétrico', power: '4,5 kW a 5,5 kW', description: 'O aparelho de maior potência instantânea na maioria das residências. 15 minutos de banho a 5,5 kW = 1,375 kWh; o Procel estima 88 kWh/mês para 32 min/dia.' },
      { item: 'Consumo Médio Residencial BR (2024)', power: '~177 kWh/mês', description: 'Consumo residencial de 176,5 TWh ÷ 82,9 milhões de unidades residenciais ÷ 12 meses. Varia de 136 kWh/mês (Nordeste) a 220 kWh/mês (Norte).' }
    ],
    sources: [
      { label: 'Procel/Eletrobras — Tabela de estimativa de consumo médio mensal de eletrodomésticos', url: 'https://industriahoje.com.br/wp-content/uploads/downloads/2015/01/Tabela-Consumo-Equipamentos-Procel-Eletrobras.pdf' },
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2025 (factsheet, ano-base 2024)', url: 'https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-160/topico-168/anuario-factsheet.pdf' }
    ]
  },
  {
    unit: 'MW',
    name: 'Megawatts',
    factor: '10⁶ W (1.000.000 Watts)',
    concept: 'Escala de indústrias, minigeração distribuída, pequenas hidrelétricas e reatores nucleares.',
    examples: [
      { item: 'Minigeração Solar Fotovoltaica (GD)', power: 'até 3 MW', description: 'Limite da Lei 14.300/2022 para fontes não despacháveis. Com módulos de ~550 W, 3 MW exigem ~5.500 módulos (sem sobredimensionamento CC).' },
      { item: 'Bairro com 10 mil Residências', power: '~2,4 MW (média)', description: '10.000 × 0,24 kW (residência média BR, 2024). Só consumo residencial: comércio e iluminação pública ficam de fora. No pico do fim da tarde a demanda passa bem disso.' },
      { item: 'Cidade Pequena (20 mil habitantes)', power: '~6 MW (média)', description: 'Média nacional de ~0,30 kW por habitante (566,7 TWh ÷ 213,4 milhões ÷ 8.760 h), somando residências, comércio e indústria. Uma cidade com indústria eletrointensiva pode consumir várias vezes mais.' },
      { item: 'Pequena Central Hidrelétrica (PCH)', power: '> 5 MW a 30 MW', description: 'Enquadramento legal: potência acima de 5 MW e até 30 MW, com reservatório de até 13 km² (excluída a calha do rio).' },
      { item: 'Usina Nuclear Angra 1 (RJ)', power: '640 MW', description: 'Primeira usina nuclear do Brasil, em operação comercial desde 1985 (reator PWR).' }
    ],
    sources: [
      { label: 'Planalto — Lei nº 14.300/2022 (Marco Legal da MMGD)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14300.htm' },
      { label: 'ANEEL — Resolução Normativa nº 875/2020', url: 'https://www2.aneel.gov.br/cedoc/ren2020875.html' },
      { label: 'Amazul — Usinas nucleares no Brasil', url: 'https://amazul.marinha.mil.br/portal-saber-nuclear/usinas-nucleares-no-brasil' },
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2025 (factsheet, ano-base 2024)', url: 'https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-160/topico-168/anuario-factsheet.pdf' },
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2026 (Destaques, ano-base 2025)', url: 'https://dashboard.epe.gov.br/apps/anuario-livro/livro/pt/destaques.html', accessedAt: '2026-10-18' },
      { label: 'Agência Gov — IBGE estima 213,4 milhões de habitantes em 2025', url: 'https://agenciagov.ebc.com.br/noticias/202508/populacao-estimada-do-pais-chega-a-213-4-milhoes-de-habitantes-em-2025' }
    ]
  },
  {
    unit: 'GW',
    name: 'Gigawatts',
    factor: '10⁹ W (1.000.000.000 Watts)',
    concept: 'Escala de grandes usinas nacionais e da demanda total simultânea do Brasil.',
    examples: [
      { item: 'Cidade de 1 Milhão de Habitantes', power: '~0,30 GW (média)', description: '10⁶ × 0,30 kW (média nacional por habitante, 2025). Uma Angra 2 cobre algo como 4 cidades desse porte na média — mas não no pico.' },
      { item: 'Usina Nuclear Angra 2 (RJ)', power: '1,35 GW', description: 'A maior usina nuclear do Brasil, na Central Nuclear Almirante Álvaro Alberto, em Angra dos Reis (RJ).' },
      { item: 'Usina Hidrelétrica Belo Monte (PA)', power: '11,23 GW', description: 'A maior usina 100% brasileira em capacidade instalada (11.233,1 MW, 24 unidades), no Rio Xingu.' },
      { item: 'Usina Binacional de Itaipu (BR/PY)', power: '14,0 GW', description: '20 unidades geradoras de 700 MW. Cada país tem direito a 50% da energia; a parcela paraguaia não consumida é cedida ao Brasil (Anexo C do Tratado).' },
      { item: 'Consumo Médio do Brasil (2025)', power: '~64,7 GW (média)', description: '566,7 TWh ÷ 8.760 h. É consumo faturado: a carga medida pelo ONS fica acima, porque inclui as perdas de transmissão e distribuição.' },
      { item: 'Recorde de Demanda Instantânea do SIN', power: '106,5 GW', description: 'Recorde de 106.532 MW registrado pelo ONS em 26/02/2025, durante onda de calor.' }
    ],
    sources: [
      { label: 'Amazul — Usinas nucleares no Brasil', url: 'https://amazul.marinha.mil.br/portal-saber-nuclear/usinas-nucleares-no-brasil' },
      { label: 'Norte Energia — UHE Belo Monte', url: 'https://www.norteenergiasa.com.br/uhe-belo-monte/' },
      { label: 'Neoenergia — Belo Monte', url: 'https://www.neoenergia.com/en/energia-hidrica/belo-monte' },
      { label: 'Itaipu Binacional — Relatório de Sustentabilidade 2016', url: 'https://www.itaipu.gov.br/publicacoes/relatorio-de-sustentabilidade-2016' },
      { label: 'Dialogue Earth — Histórico do acordo de Itaipu (Anexo C)', url: 'https://dialogue.earth/pt-br/energia/entenda-longo-historico-acordo-itaipu/' },
      { label: 'Agência Gov — Sete recordes de demanda no ano (fev/2025)', url: 'https://agenciagov.ebc.com.br/noticias/202502/demanda-de-energia-bate-novo-recorde-e-sistema-eletrico-mantem-estabilidade' },
      { label: 'pv magazine Brasil — EPE estima 8,8 GW de resposta da demanda (cita o recorde de 106.532 MW)', url: 'https://www.pv-magazine-brasil.com/2026/09/22/epe-estima-potencial-de-88-gw-para-resposta-da-demanda-no-brasil/' },
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2026 (Destaques, ano-base 2025)', url: 'https://dashboard.epe.gov.br/apps/anuario-livro/livro/pt/destaques.html', accessedAt: '2026-10-18' },
      { label: 'Agência Gov — IBGE estima 213,4 milhões de habitantes em 2025', url: 'https://agenciagov.ebc.com.br/noticias/202508/populacao-estimada-do-pais-chega-a-213-4-milhoes-de-habitantes-em-2025' }
    ]
  },
  {
    unit: 'TWh',
    name: 'Terawatts-hora',
    factor: '10¹² Wh (1.000.000.000.000 Wh)',
    concept: 'Escala de energia total gerada e consumida anualmente pelo país.',
    examples: [
      { item: 'Cidade de 1 Milhão de Habitantes em um Ano', power: '~2,7 TWh', description: '10⁶ × 2.656 kWh/hab (566,7 TWh ÷ 213,4 milhões, 2025). Um ano de Itaipu (72,9 TWh) abasteceria ~27 cidades desse porte.' },
      { item: 'Geração Anual de Itaipu', power: '72,9 TWh (2025)', description: 'Recorde de 103,1 TWh em 2016. A produção acumulada passou de 3,1 bilhões de MWh em set/2025 — segundo Itaipu, o equivalente a 44 dias do consumo mundial.' },
      { item: 'Consumo Anual de Eletricidade do Brasil', power: '566,7 TWh (2025)', description: 'Toda a eletricidade consumida no país em 2025 (EPE), para uma população estimada em 213,4 milhões de habitantes (IBGE, 2025).' },
      { item: 'Geração Eólica Anual Brasileira', power: '107,7 TWh (2024)', description: 'Mais que todo o consumo da Região Nordeste em 2024 (17,8% de 561,6 TWh ≈ 100 TWh).' }
    ],
    sources: [
      { label: 'Agência Brasil — Itaipu chega a 3,1 bilhões de MWh produzidos', url: 'https://agenciabrasil.ebc.com.br/economia/noticia/2025-09/hidreletrica-de-itaipu-chega-ao-marco-de-31-bilhoes-de-mwh-produzidos' },
      { label: 'Itaipu fecha 2025 com produção de 72,879 milhões de MWh (100fronteiras)', url: 'https://100fronteiras.com/destaque/noticia/usina-de-itaipu-fecha-2025-com-producao-de-72879-milhoes-de-mwh-energia-suficiente-para-abastecer-o-planeta-por-um-dia/' },
      { label: 'Itaipu Binacional — Relatório de Sustentabilidade 2016', url: 'https://www.itaipu.gov.br/publicacoes/relatorio-de-sustentabilidade-2016' },
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2026 (Destaques, ano-base 2025)', url: 'https://dashboard.epe.gov.br/apps/anuario-livro/livro/pt/destaques.html' },
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2025 (factsheet, ano-base 2024)', url: 'https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-160/topico-168/anuario-factsheet.pdf' },
      { label: 'Agência Gov — IBGE estima 213,4 milhões de habitantes em 2025', url: 'https://agenciagov.ebc.com.br/noticias/202508/populacao-estimada-do-pais-chega-a-213-4-milhoes-de-habitantes-em-2025' }
    ]
  }
];
