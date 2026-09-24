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
    voltage: '0,69 kV (aerogeradores) a 18 kV (hidrogeradores de Itaipu), elevada por transformadores para a transmissão (ex.: 18 → 500 kV em Itaipu)',
    description: 'Transformação de recursos naturais primários em eletricidade. O Brasil possui uma das matrizes elétricas mais limpas do mundo: em 2025, 86,8% da oferta interna de energia elétrica veio de fontes renováveis.',
    revenueModel: 'Venda de energia por contratos no ACR (leilões de energia nova, existente e de reserva) ou no ACL (contratos bilaterais), com as diferenças entre geração e contratos liquidadas ao PLD na CCEE.',
    regulator: 'ANEEL (outorga e fiscalização) / ONS (despacho centralizado).',
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
      'Despacho hidrotérmico centralizado pelo ONS para otimizar o uso da água dos reservatórios.',
      'Boom da micro e minigeração distribuída (MMGD, sobretudo solar): 54,5 TWh gerados em 2025, alta de 28,9% sobre 2024.',
      'Complementaridade no Nordeste: solar concentrada no meio do dia; eólica com predominância noturna e safra dos ventos entre agosto e novembro.'
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
    voltage: 'Rede Básica ≥ 230 kV: 230, 345, 440, 500/525 e 765 kV CA; ±600 kV e ±800 kV CC',
    description: 'Transporte de imensas massas de energia por milhares de quilômetros, ligando os grandes centros de geração (Norte/Nordeste/Itaipu) aos polos de consumo no Sudeste/Sul.',
    revenueModel: 'RAP (Receita Anual Permitida) — remuneração pela disponibilidade da instalação, independente do fluxo de potência transportado, com descontos por indisponibilidade (Parcela Variável).',
    regulator: 'ANEEL (leilões de concessão de 30 anos; vence a menor RAP ofertada) / ONS (operação).',
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
      'Os bipolos ±800 kV de Belo Monte: Xingu–Estreito (MG, 2.076 km, BMTE: State Grid 51%, Furnas 24,5%, Eletronorte 24,5%) e Xingu–Terminal Rio (RJ, 2.543 km, XRTE/State Grid), o mais extenso sistema de ultra-alta tensão do Brasil.',
      'Nos contratos de concessão recentes, a RAP é reajustada anualmente pelo IPCA; indisponibilidades geram desconto via Parcela Variável por Indisponibilidade (REN ANEEL 729/2016).',
      'O Sistema Interligado Nacional (SIN) permite que a geração de Belo Monte (PA) atenda cargas no Sudeste e, via interligações regionais, no Sul.'
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
    voltage: '13,8 kV / 34,5 kV (média tensão) para 127/220 V ou 220/380 V (baixa tensão)',
    description: 'O elo que recebe a eletricidade das subestações de transmissão e a entrega aos postes, transformadores e medidores finais de residências, hospitais, fábricas e comércios.',
    revenueModel: 'Receita regulada pela TUSD (Tarifa de Uso do Sistema de Distribuição): a Parcela B remunera a rede e a operação da distribuidora; custos de energia, transmissão e encargos (Parcela A) são repassados. Revisão tarifária periódica a cada 4 ou 5 anos, conforme o contrato de concessão.',
    regulator: 'ANEEL (metas de continuidade DEC/FEC — duração e frequência equivalentes de interrupção por unidade consumidora).',
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
      'Monopólio natural: não existem duas fiações de postes concorrentes na mesma rua.',
      'O fio de distribuição continua sendo usado mesmo quando o consumidor migra para o Mercado Livre: a distribuidora segue cobrando a TUSD.',
      'Enfrenta o maior desafio de transição com a proliferação da geração distribuída solar (fluxo reverso na baixa tensão) e dos veículos elétricos.'
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
    voltage: 'Negociação financeira e de dados (independente da tensão)',
    description: 'A comercialização faz o casamento financeiro entre oferta e demanda por meio de contratos bilaterais e da liquidação das diferenças no Mercado de Curto Prazo, valoradas ao PLD. No ACL, consumidores do Grupo A (média e alta tensão) contratam energia livremente; no ACR, as distribuidoras atendem o mercado cativo via leilões públicos.',
    revenueModel: 'Compra e venda de contratos de energia, com gestão da exposição ao PLD horário e do risco de submercado.',
    regulator: 'CCEE (registro de contratos, contabilização e liquidação) e ANEEL.',
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
      'A CCEE contabiliza a cada hora o descompasso entre a energia medida (gerada/consumida) e a energia contratada, liquidando sobras e déficits ao PLD de cada submercado.',
      'A medição de faturamento (SMF) dos agentes é coletada diariamente pelo SCDE da CCEE e integralizada em base horária, compatível com o período de comercialização.',
      'Com a Lei 15.269/2025, o custo da contratação de lastro (reserva de capacidade para a segurança do SIN) é rateado entre todos os usuários finais do SIN, cativos e livres, enquanto a energia (MWh) segue negociada em contratos.'
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
