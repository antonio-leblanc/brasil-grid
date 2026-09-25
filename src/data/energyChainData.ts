import type { SourceRef } from './sources';

export interface ValueChainStage {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  voltage: string;
  description: string;
  revenueModel: string;
  regulator: string;
  mainCompanies: { name: string; tag: string }[];
  keyMetrics: { label: string; value: string }[];
  highlights: string[];
  sources: SourceRef[];
}

export const energyChainStages: ValueChainStage[] = [
  {
    id: 'geracao',
    number: '01',
    name: 'Geração',
    subtitle: 'A Origem da Energia',
    voltage: '0,69 kV (eólica) a 18 kV (Itaipu) → Elevada a 230–500 kV na subestação',
    description: 'Conversão de fontes primárias em eletricidade. O Brasil opera uma das matrizes mais limpas do planeta: 86,8% de oferta renovável em 2025, assentada na flexibilidade hidrelétrica e no salto solar/eólico.',
    revenueModel: 'Venda de contratos no ACR (leilões regulados) ou no ACL (livre negociação bilateral). Diferenças entre geração física e compromissos contratuais são liquidadas ao PLD horário na CCEE.',
    regulator: 'ANEEL (outorga e fiscalização) • ONS (despacho hidrotérmico centralizado por mérito econômico e segurança).',
    mainCompanies: [
      { name: 'Eletrobras', tag: 'Maior geradora do país (44,4 GW no 2T2025, ~22% da capacidade)' },
      { name: 'Engie Brasil', tag: 'Maior geradora privada 100% renovável' },
      { name: 'Auren Energia', tag: 'Hidrelétrica, eólica e solar (8,8 GW após incorporar a AES Brasil)' },
      { name: 'Eneva', tag: 'Maior operadora privada de gás natural; térmicas a gás (modelo reservoir-to-wire)' },
      { name: 'CPFL Geração', tag: 'UHEs, PCHs, eólicas e biomassa' }
    ],
    keyMetrics: [
      { label: 'Capacidade Instalada (2025)', value: '261 GW (incl. MMGD)' },
      { label: 'Renováveis na Geração (2025)', value: '86,8%' },
      { label: 'Hidrelétricas (2025)', value: '51,7% da geração' },
      { label: 'Eólica + Solar (2025)', value: '26,4% da geração' }
    ],
    highlights: [
      'Despacho Centralizado: O ONS determina a produção de cada usina minuto a minuto para minimizar o custo futuro de operação da água.',
      'Avanço da MMGD: 54,5 TWh gerados por micro/minigeração em 2025 (+28,9% vs 2024), reduzindo a carga líquida vista pela rede básica no meio do dia.',
      'Sinergia no Nordeste: Pico solar concentrado nas horas diurnas e geração eólica predominante à noite, com safra de ventos de agosto a novembro.'
    ],
    sources: [
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2026 (Destaques, ano-base 2025)', url: 'https://dashboard.epe.gov.br/apps/anuario-livro/livro/pt/destaques.html' },
      { label: 'Eletrobras — Geração de Energia', url: 'https://eletrobras.com/pt/Paginas/Geracao-de-Energia.aspx' },
      { label: 'ENGIE Brasil — Rumo aos 100% renovável', url: 'https://www.alemdaenergia.engie.com.br/newsletters/rumo-aos-100-renovavel/' },
      { label: 'Brazil Journal — Auren compra a AES Brasil', url: 'https://braziljournal.com/breaking-auren-compra-a-aes-brasil-e-multiplica-sua-capacidade-de-geracao-por-24x/' },
      { label: 'Eneva — Quem Somos', url: 'https://www.eneva.com.br/a-eneva/quem-somos/' },
      { label: 'CPFL — Geração e Renováveis', url: 'https://www.grupocpfl.com.br/unidades-de-negocios/cpfl-geracao-e-renovaveis' },
      { label: 'Itaipu — transformadores elevadores 18 kV → 500 kV (Portal Potência)', url: 'https://revistapotencia.com.br/portal-potencia/energia/itaipu-tera-novo-sistema-de-combate-a-incendio-nos-transformadores-principais/' },
      { label: 'O Setor Elétrico — Plantas eólicas: modelagem para curto-circuito', url: 'https://osetoreletrico.com.br/plantas-eolicas' },
      { label: 'EPE — Análise da complementaridade entre fontes (Workshop Projetos Híbridos, 2019)', url: 'https://www.epe.gov.br/sites-pt/sala-de-imprensa/noticias/Documents/MRTS%20_%20Projetos%20Hibridos%20_%20Workshop%20EPE%2015_05_2019.pdf' },
      { label: 'IstoÉ Sustentável — Safra dos ventos no Nordeste', url: 'https://sustentavel.istoe.com.br/safra-dos-ventos-impulsiona-geracao-eolica-no-nordeste-entre-agosto-e-outubro' }
    ]
  },
  {
    id: 'transmissao',
    number: '02',
    name: 'Transmissão',
    subtitle: 'As Autoestradas de Alta Tensão',
    voltage: 'Rede Básica (230 a 765 kV CA) • Bipolos UHVDC (±600 e ±800 kV CC)',
    description: 'Autoestradas elétricas de ultra-alta tensão que transportam grandes blocos de potência por milhares de quilômetros, integrando usinas remotas (Norte/Nordeste/Itaipu) aos polos de consumo no Sudeste/Sul.',
    revenueModel: 'RAP (Receita Anual Permitida) baseada estritamente na disponibilidade dos ativos (independe do volume de energia transportado), com penalidade por indisponibilidade via Parcela Variável (PV).',
    regulator: 'ANEEL (leilões de concessão de 30 anos por menor RAP) • ONS (coordenação operacional e supervisão em tempo real).',
    mainCompanies: [
      { name: 'Taesa', tag: 'Dedicada exclusivamente à transmissão (~14,7 mil km em operação)' },
      { name: 'ISA Energia Brasil (ex-ISA CTEEP)', tag: '~95% da energia transmitida em SP' },
      { name: 'Eletrobras', tag: 'Chesf, Eletronorte e CGT Eletrosul (~38% das linhas do país)' },
      { name: 'Alupar', tag: 'Maior transmissora de controle 100% privado nacional' },
      { name: 'State Grid Brazil', tag: 'Controla os bipolos ±800 kV CC de Belo Monte' }
    ],
    keyMetrics: [
      { label: 'Extensão da Rede Básica (2025)', value: '181.782 km' },
      { label: 'Tensão Máxima', value: '±800 kV (UHVDC)' },
      { label: 'Remuneração', value: 'RAP − Parcela Variável' },
      { label: 'Prazo da Concessão', value: '30 anos' }
    ],
    highlights: [
      'Bipolos ±800 kV UHVDC: Escoamento de Belo Monte via Xingu–Estreito (2.076 km) e Xingu–Terminal Rio (2.543 km, o maior tronco de ultra-alta tensão do país).',
      'Remuneração por Disponibilidade: Concessionárias não correm risco de volume; receita é reajustada anualmente pelo IPCA e deduzida em caso de falhas na linha.',
      'Interligação Sistêmica Nacional: O intercâmbio regional viabiliza o aproveitamento estacional e o intercâmbio de excedentes entre bacias hidrográficas distantes.'
    ],
    sources: [
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2026 (Destaques, ano-base 2025)', url: 'https://dashboard.epe.gov.br/apps/anuario-livro/livro/pt/destaques.html' },
      { label: 'ONS Dados Abertos — Linhas de Transmissão da Rede de Operação', url: 'https://dados.ons.org.br/dataset/linha-transmissao' },
      { label: 'ANEEL — Leilão de Transmissão alcança economia de R$ 11,5 bilhões', url: 'https://www.gov.br/aneel/pt-br/assuntos/noticias/2025/leilao-de-transmissao-alcanca-economia-de-r-11-5-bilhoes-para-o-consumidor' },
      { label: 'ANEEL — Edital do Leilão nº 04/2025', url: 'https://ppi.gov.br/wp-content/uploads/2025/02/SEI_0202054_Edital_de_Leilao_04_2025.pdf' },
      { label: 'ANEEL — REN nº 729/2016 (Parcela Variável)', url: 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=detalharAto&tipo=REN&numeroAto=00000729&seqAto=000&valorAno=2016&orgao=ANEEL%2FMME&nomeTitulo=codigos&desItem=&desItemFim=&cod_modulo=644&cod_menu=9486' },
      { label: 'Taesa — Nosso Negócio', url: 'https://institucional.taesa.com.br/a-companhia/nosso-negocio/' },
      { label: 'ISA Energia Brasil — ISA CTEEP agora é ISA ENERGIA BRASIL', url: 'https://www.isaenergiabrasil.com.br/centro-de-midia/noticias/isa-cteep-agora-e-isa-energia-brasil-e-reforca-presenca-nacional/' },
      { label: 'Eletrobras — Sobre a Eletrobras', url: 'https://eletrobras.com/pt/Paginas/Sobre-a-Eletrobras.aspx' },
      { label: 'Alupar — A Companhia', url: 'https://www.alupar.com.br/company/?lang=en' },
      { label: 'State Grid Brazil — Linha Xingu-Rio completa cinco anos', url: 'https://stategrid.com.br/en/mais-extenso-sistema-de-ultra-alta-tensao-brasileiro-linha-de-transmissao-xingu-rio-completa-cinco-anos-de-operacao/' }
    ]
  },
  {
    id: 'distribuicao',
    number: '03',
    name: 'Distribuição',
    subtitle: 'A Malha Urbana & Fio Físico',
    voltage: 'Média Tensão (13,8 / 34,5 kV) • Baixa Tensão (127/220 V e 220/380 V)',
    description: 'Malha capilar que recebe energia rebaixada das subestações e a distribui porta a porta a mais de 94 milhões de consumidores. Funciona como monopólio natural regulado.',
    revenueModel: 'Tarifa TUSD: Parcela B remunera investimentos (CAPEX) e custos operacionais (OPEX) da concessionária; Parcela A repassa sem lucro custos de compra de energia, transmissão e encargos setoriais.',
    regulator: 'ANEEL (revisões tarifárias periódicas a cada 4–5 anos e fiscalização de metas DEC/FEC).',
    mainCompanies: [
      { name: 'Light', tag: 'Região Metropolitana do Rio de Janeiro (31 municípios)' },
      { name: 'Enel Brasil', tag: 'Distribuição em SP, RJ e CE' },
      { name: 'Neoenergia', tag: 'Distribuição na BA, PE, RN, SP/MS e DF' },
      { name: 'Equatorial Energia', tag: 'Distribuição no MA, PA, PI, AL, RS, AP e GO' },
      { name: 'CPFL Energia', tag: 'SP (Paulista, Piratininga, Santa Cruz) e RS (RGE)' }
    ],
    keyMetrics: [
      { label: 'Unidades Consumidoras (dez/2024)', value: '~94 milhões' },
      { label: 'Natureza Jurídica', value: 'Monopólio Geográfico Concedido' },
      { label: 'Perdas', value: 'Técnicas (rede) + Não técnicas (furtos)' },
      { label: 'Componente Fio B', value: 'Custo da infraestrutura local' }
    ],
    highlights: [
      'Monopólio Natural: Não há postes concorrentes na mesma via; toda a infraestrutura física local pertence à concessionária da área outorgada.',
      'Uso da Rede no Mercado Livre: Consumidores que migram para o ACL continuam conectados à distribuidora e pagam a TUSD pelo uso do fio.',
      'Desafio do Fluxo Reverso: A rápida expansão de microgeração solar residencial e comercial exige reforço de alimentadores e controle dinâmico de sobretensão.'
    ],
    sources: [
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2025 (factsheet, ano-base 2024)', url: 'https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-160/topico-168/anuario-factsheet.pdf' },
      { label: 'ANEEL — PRODIST Módulo 8 (Qualidade da Energia Elétrica)', url: 'https://www2.aneel.gov.br/cedoc/aren2020888_prodist_modulo_8_v11.pdf' },
      { label: 'CPFL — Revisão Tarifária', url: 'https://www.cpfl.com.br/revisao-tarifaria' },
      { label: 'Agência iNFRA — Municípios atendidos pela Light pedem renovação da concessão', url: 'https://agenciainfra.com/blog/municipios-atendidos-pela-light-pedem-a-aneel-a-renovacao-da-concessao/' },
      { label: 'Enel Brasil — Nossos negócios', url: 'https://www.enel.com.br/pt-saopaulo/quemsomos/a201611-nossos-negocios.html' },
      { label: 'Neoenergia — Distribuição', url: 'https://www.neoenergia.com/en/distribution' },
      { label: 'Equatorial Energia — Sobre o Grupo', url: 'https://www.equatorialenergia.com.br/grupo-equatorial/sobre-o-grupo/' },
      { label: 'CPFL — Distribuição', url: 'https://www.grupocpfl.com.br/unidades-de-negocios/distribuicao' }
    ]
  },
  {
    id: 'comercializacao',
    number: '04',
    name: 'Comercialização',
    subtitle: 'Mercado Livre, Contratos & Liquidação CCEE',
    voltage: 'Gestão contratual e financeira (desvinculada do fluxo físico)',
    description: 'Elo responsável pelo casamento econômico entre oferta e demanda. Abrange o Ambiente de Contratação Regulada (ACR / mercado cativo) e o Ambiente de Contratação Livre (ACL / mercado livre).',
    revenueModel: 'Spread em contratos de compra e venda bilateral (PPAs), gestão de carteira e mitigação do risco de submercado e exposição ao PLD horário.',
    regulator: 'CCEE (registro de contratos, apuração de medições e liquidação financeira do MCP) • ANEEL.',
    mainCompanies: [
      { name: 'BTG Pactual', tag: 'Maior volume negociado no ACL (MM12 até out/2025)' },
      { name: 'Santander Comercializadora', tag: '2º maior volume negociado no ACL (MM12 até out/2025)' },
      { name: 'Auren Energia', tag: 'Geradora com uma das maiores comercializadoras do país' },
      { name: 'Comerc Energia', tag: 'Gestão de consumidores livres; controlada pela Vibra desde 2025' }
    ],
    keyMetrics: [
      { label: 'Consumo no ACL (2025)', value: '44,8% do consumo nacional' },
      { label: 'Preço de Curto Prazo', value: 'PLD Horário (desde 2021)' },
      { label: 'Consumidores Livres (2024)', value: '67,0 mil' },
      { label: 'Abertura da Baixa Tensão', value: 'Residencial até nov/2028 (Lei 15.269/2025)' }
    ],
    highlights: [
      'Liquidação Financeira na CCEE: A CCEE confronta a cada hora a energia medida (SMF) com a carteira contratada, liquidando sobras ou déficits ao PLD de cada submercado.',
      'Expansão do Mercado Livre: O ACL já responde por 44,8% de todo o consumo brasileiro após a abertura para todos os consumidores do Grupo A (média e alta tensão).',
      'Separação Lastro × Energia (Lei 15.269/2025): A garantia física e confiabilidade sistêmica (lastro) é rateada por todos os consumidores, enquanto a energia (MWh) é livremente negociada.'
    ],
    sources: [
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2026 (Destaques, ano-base 2025)', url: 'https://dashboard.epe.gov.br/apps/anuario-livro/livro/pt/destaques.html' },
      { label: 'EPE — Anuário Estatístico de Energia Elétrica 2025 (factsheet, ano-base 2024)', url: 'https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-160/topico-168/anuario-factsheet.pdf' },
      { label: 'CCEE — Conceitos de Preços', url: 'https://www.ccee.org.br/precos/conceitos-precos' },
      { label: 'CCEE — Medição', url: 'https://www.ccee.org.br/mercado/medicao' },
      { label: 'Planalto — Lei nº 15.269/2025', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15269.htm' },
      { label: 'Thunders — Ranking das maiores comercializadoras (dados CCEE, out/2025)', url: 'https://www.thunders.com.br/2025/12/08/ranking-das-maiores-comercializadoras-de-energia-dados-referentes-a-outubro-25/' },
      { label: 'Brazil Journal — Auren compra a AES Brasil', url: 'https://braziljournal.com/breaking-auren-compra-a-aes-brasil-e-multiplica-sua-capacidade-de-geracao-por-24x/' },
      { label: 'eixos — Vibra conclui compra total da Comerc', url: 'https://eixos.com.br/energia-eletrica/com-aquisicao-total-pela-vibra-comerc-quer-ampliar-capilaridade-no-mercado-livre-de-energia/' }
    ]
  }
];
