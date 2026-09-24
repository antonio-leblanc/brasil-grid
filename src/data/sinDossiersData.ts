import type { SourceRef } from './sources';

export interface DossierStep {
  time?: string;
  title: string;
  description: string;
  tag?: string;
  badgeType?: 'danger' | 'warning' | 'info' | 'neutral' | 'success';
  technicalDetail?: string;
}

export interface SinDossier {
  id: string;
  title: string;
  badge: string;
  badgeColor: 'amber' | 'rose' | 'cyan' | 'emerald';
  subtitle: string;
  summary: string;
  keyFormulas?: { label: string; formula: string; explanation: string }[];
  keyMetrics: { label: string; value: string; detail: string }[];
  stepsTitle: string;
  steps: DossierStep[];
  lessonsLearned: { title: string; desc: string }[];
  sources: SourceRef[];
}

export const sinDossiers: SinDossier[] = [
  {
    id: 'apagao-2023',
    title: 'Anatomia do Apagão de 15 de Agosto de 2023',
    badge: 'COLAPSO DE TENSÃO & MODELOS DE EÓLICAS/SOLARES',
    badgeColor: 'rose',
    subtitle: 'Da abertura acidental de uma LT 500 kV ao colapso de tensão no Nordeste, à separação do SIN em ilhas e à atuação do ERAC',
    summary:
      'Em 15 de agosto de 2023, às 08h30min36s, a abertura da LT 500 kV Quixadá – Fortaleza II (atuação acidental da lógica SOTF, sem curto-circuito) provocou um colapso de tensão no Nordeste, a separação do SIN em ilhas elétricas e a interrupção de ~23.368 MW de carga (RAP final do ONS), afetando 25 estados e o DF. Segundo o ONS, o fator determinante foi o suporte dinâmico de potência reativa das usinas eólicas e fotovoltaicas da região ter sido, em campo, muito aquém do previsto pelos modelos matemáticos fornecidos pelos agentes — o que impediu que os estudos identificassem o risco do ponto de operação.',
    keyFormulas: [
      {
        label: 'Equação de Oscilação (Swing Equation)',
        formula: 'df/dt = (f₀ / 2H) · (P_mec - P_elec)',
        explanation:
          'A taxa de variação da frequência (RoCoF) após um desbalanço é inversamente proporcional à inércia equivalente H. Governa a dinâmica das ilhas formadas após a separação. O RAP, porém, registra que o SIN operava com inércia adequada (~265 GW·s para ~73 GW de carga) e que o fenômeno inicial foi um colapso de tensão, não evitável por mais inércia.'
      },
      {
        label: 'Ajustes Novos (Uniformizados) do ERAC',
        formula: 'f ≤ 58,5 / 58,2 / 57,9 / 57,7 / 57,5 Hz  →  cortes de 5 / 6 / 7 / 8 / 9% (até 35% da carga)',
        explanation:
          'Relés de subfrequência (81) cortam carga em estágios para reequilibrar carga e geração antes que geradores se desconectem por subfrequência. Em 15/08/2023 a uniformização ainda estava em implantação por região: o SE/CO operava com os ajustes antigos (mesmos limiares, 7% por estágio, atuação instantânea) e o Norte/Nordeste estava em transição, com parte dos alimentadores ainda nos ajustes antigos por taxa de variação de frequência.'
      }
    ],
    keyMetrics: [
      { label: 'Carga Interrompida', value: '~23.368 MW', detail: 'RAP final; ≈ 32% dos ~73 GW atendidos no SIN no momento' },
      { label: 'Abrangência', value: '25 estados + DF', detail: 'Roraima, isolado do SIN, permaneceu atendido' },
      { label: 'Separação do Norte', value: '≈ 2,6 s', detail: 'Após o evento inicial; o Nordeste ficou ligado ao SE/CO por ≈ 18,6 s' },
      { label: 'Nordeste Exportador', value: '~22,5 GW gerados', detail: 'Para ~10,2 GW de carga; FNESE 6.392 MW e FNEN 5.879 MW no pré-evento' }
    ],
    stepsTitle: 'Cronologia Operativa (RAP-ONS 00012/2023)',
    steps: [
      {
        time: '08:30:36,946 (T0)',
        title: 'Evento Inicial: Abertura da LT 500 kV Quixadá – Fortaleza II',
        description:
          'A linha, com o maior carregamento de sua história (~1.950 MW, 2.375 A para limite normal de 2.390 A), abriu no terminal de Quixadá sem curto-circuito, pela atuação acidental da lógica de fechamento sob falta (SOTF) da proteção principal.',
        tag: 'Desarme de LT',
        badgeType: 'warning',
        technicalDetail:
          'Uma função de sobrecorrente de 2.310 A foi habilitada sem a associação externa à lógica SOTF que deveria desativá-la após a energização — e com ajuste abaixo do limite nominal da linha. Pelos estudos do ONS, essa perda simples era suportável sem corte de carga.'
      },
      {
        time: 'T0 + 0,53 s',
        title: 'Colapso de Tensão no Ceará e Abertura da Interligação N/NE',
        description:
          'O fluxo migrou para o tronco de 230 kV entre Milagres e Fortaleza II e para o 500 kV remanescente, com afundamento de tensão em Boa Esperança, Buritirama, Queimada Nova 2, Açu III e Campo Grande III. As usinas eólicas e fotovoltaicas próximas forneceram suporte de potência reativa muito inferior ao dos seus modelos (controle de planta — PPC — e injeção de corrente reativa sob falta dos inversores).',
        tag: 'Colapso de Tensão',
        badgeType: 'danger',
        technicalDetail:
          'Aos 530 ms, a proteção de perda de sincronismo (PPS) da LT 500 kV Presidente Dutra – Boa Esperança atuou e o SEP associado abriu também Presidente Dutra – Teresina II C1/C2 e Imperatriz – Presidente Dutra C2. Seguiram-se desligamentos por proteções de distância no 230 kV e o início de oscilações de potência entre áreas.'
      },
      {
        time: 'T0 + 2,6 s a T0 + 3,5 s',
        title: 'Separação do Norte e do Acre/Rondônia',
        description:
          'A abertura da LT 500 kV Serra da Mesa – Gurupi C2 (T0 + 2,642 s) isolou o Norte (com Amapá e Amazonas), que era importador e entrou em subfrequência. Em ≈ 3,5 s, o Acre/Rondônia também se separou, em sobrefrequência e sobretensão.',
        tag: 'Ilhamento',
        badgeType: 'danger',
        technicalDetail:
          'No Norte, o ERAC atuou mas não bastou para reequilibrar carga e geração: unidades geradoras desligaram e o sistema colapsou. O Acre/Rondônia também colapsou, apesar da atuação de 2 estágios do ERAC antes da separação.'
      },
      {
        time: 'T0 + 2,6 s a ≈ T0 + 20 s',
        title: 'ERAC no SE/CO, Sul e Nordeste',
        description:
          'No bloco Sul/Sudeste/Centro-Oeste, a frequência chegou a ~57,76 Hz (SE/CO) e ~57,66 Hz (Sul), com atuação de 3 estágios do ERAC (cortes esperados de 21% e 25%). O Nordeste, exportador, ficou ≈ 18,6 s ligado ao SE/CO em subfrequência — sensibilizando os 5 estágios (35% nos ajustes novos, 55% nos antigos) — e depois ilhou-se em sobrefrequência e sobretensão.',
        tag: 'Disparo de ERAC',
        badgeType: 'warning',
        technicalDetail:
          'O ONS avaliou o ERAC como satisfatório no SE/CO, Sul e Nordeste: no SE/CO e Sul a frequência voltou a 59,5 Hz em menos de 20 s. Os agentes informaram 15,61 GW cortados pelo esquema. Parte do Nordeste formou uma ilha estável com hidráulicas remanescentes e, principalmente, eólicas e fotovoltaicas.'
      },
      {
        time: '08:43 – 14:49',
        title: 'Recomposição Fluente & Black Start',
        description:
          'O Sul teve as cargas restabelecidas entre 08h43 e 09h05 e o Sudeste entre 08h52 e 09h33. O Norte foi recomposto a partir do autorrestabelecimento (black start) de Tucuruí, Balbina, Coaracy Nunes, Estreito e Samuel; o Nordeste, pela expansão da ilha remanescente, pelo black start de Itapebi e com tensão vinda do SIN.',
        tag: 'Recomposição',
        badgeType: 'success',
        technicalDetail:
          'O autorrestabelecimento de Sobradinho falhou, exigindo tensão da ilha do Nordeste para partir suas unidades. O ONS autorizou o restabelecimento total das cargas às 14h49.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Modelos Validados em Campo para Eólicas e Solares',
        desc: 'A discrepância entre os modelos cadastrados e o desempenho real levou o ONS a adaptar sua base de estudos ao comportamento observado, reduzir limites de intercâmbio do Nordeste, publicar guia de validação de modelos e requisitos de PMU para as usinas e propor à ANEEL a revisão do Submódulo 7.4 (requisitos de modelos reais e comissionamento).'
      },
      {
        title: 'Inércia Não Foi a Causa',
        desc: 'O RAP afasta explicitamente a inércia e o número de máquinas síncronas como causa: o fenômeno foi um colapso de tensão por falta de suporte de reativos. Compensadores síncronos elevam a potência de curto-circuito, mas, mantidas as discrepâncias de reativos das usinas, o risco permaneceria semelhante.'
      },
      {
        title: 'Proteções e ERAC Revisados',
        desc: 'A CHESF corrigiu a lógica SOTF da LT Quixadá – Fortaleza II no mesmo dia; o ONS determinou a reavaliação dos ajustes das PPS com a base de modelos revisada. O ERAC seguiu para ajustes uniformes no SE/CO, Sul, Nordeste e Norte, sem relés por taxa de variação de frequência no N/NE.'
      }
    ],
    sources: [
      {
        label: 'ONS — RAP-ONS 00012/2023: Análise da Perturbação de 15/08/2023 (versão final)',
        url: 'https://www.ons.org.br/AcervoDigitalDocumentosEPublicacoes/RAP%202023.08.15%2008h030min%20vers%C3%A3o%20final.pdf'
      },
      {
        label: 'ONS — Análise do desempenho do ERAC na perturbação de 15/08/2023',
        url: 'https://www.ons.org.br/AcervoDigitalDocumentosEPublicacoes/Apresenta%C3%A7%C3%A3o%20ERAC%2015-08-2023.pdf'
      },
      {
        label: 'ONS — Ocorrência no SIN em 15 de agosto de 2023',
        url: 'https://www.ons.org.br/Paginas/Noticias/Ocorr%C3%AAncia-no-SIN-em-15-de-agosto-de-2023.aspx'
      },
      {
        label: 'ONS — ONS eleva limite de intercâmbio de energia do Nordeste (27/09/2023)',
        url: 'https://www.ons.org.br/Paginas/Noticias/20230928-ONS-eleva-limite-de-interc%C3%A2mbio-de-energia-do-Nordeste-na-%C3%BAltima-quarta-feira,-27-de-setembro.aspx'
      }
    ]
  },
  {
    id: 'custo-agua-pld',
    title: 'O Custo Futuro da Água & A Formação do Preço (PLD)',
    badge: 'OPERAÇÃO HIDROTÉRMICA & DESPACHO CENTRALIZADO',
    badgeColor: 'cyan',
    subtitle: 'Como a cadeia NEWAVE / DECOMP / DESSEM define despacho e preço no SIN, em vez de ofertas de preço dos geradores',
    summary:
      'Diferentemente de mercados em que o preço spot resulta de ofertas dos geradores, no Brasil o despacho e o Custo Marginal de Operação (CMO) são calculados centralizadamente por modelos de otimização do CEPEL, e a CCEE deriva do CMO o Preço de Liquidação das Diferenças (PLD). A água armazenada nos reservatórios é valorada pelo custo futuro que ela evita: usá-la hoje ou guardá-la é uma decisão econômica sob incerteza hidrológica.',
    keyFormulas: [
      {
        label: 'Valor da Água & CMO',
        formula: 'Valor da água = −∂FCF / ∂V   |   CMO = ∂C_total / ∂Demanda',
        explanation:
          'A Função de Custo Futuro (FCF) dá o custo esperado de operação futura em função do armazenamento V. O valor da água é a redução desse custo por unidade adicional armazenada; o CMO é o custo de atender 1 MWh adicional de carga — a variável dual da restrição de atendimento à demanda. Quando uma hidrelétrica é a fonte marginal, o CMO se iguala ao seu valor da água.'
      },
      {
        label: 'Equilíbrio Hidrotérmico Ótimo',
        formula: 'min [ C_imediato(Térmicas, Déficit) + FCF(V_final) ]',
        explanation:
          'Em cada etapa, o operador minimiza o custo imediato (combustível e déficit) somado ao custo futuro esperado associado ao armazenamento que sobra. Usar muita água hoje barateia o presente e encarece o futuro; poupar demais leva a vertimento e térmicas desnecessárias.'
      },
      {
        label: 'Fator de Ajuste do MRE (GSF)',
        formula: 'GSF = Geração total das hidrelétricas do MRE / Σ Garantias Físicas do MRE',
        explanation:
          'Com GSF < 1, a energia alocada a cada hidrelétrica do Mecanismo de Realocação de Energia fica abaixo da sua garantia física, base dos contratos vendidos. A diferença é liquidada no Mercado de Curto Prazo ao PLD — o chamado risco hidrológico.'
      }
    ],
    keyMetrics: [
      { label: 'Energia Armazenável Máx. SIN', value: '≈ 292 GWmês', detail: 'SE/CO concentra ~70% (204,6 GWmês); ONS dados abertos, 2026' },
      { label: 'Granularidade do PLD', value: 'Horário, desde 2021', detail: 'CCEE calcula a partir do CMO do DESSEM (resolução semi-horária)' },
      { label: 'Limites do PLD 2026 (ANEEL)', value: 'Mín R$ 57,31 | Máx estrutural R$ 785,27 | Máx horário R$ 1.611,04/MWh', detail: 'Publicados em dez/2025, válidos para o ano civil de 2026' },
      { label: 'Submercados', value: '4 (SE/CO, S, NE, N)', detail: 'Preço único em cada um; limites de intercâmbio descolam os PLDs' }
    ],
    stepsTitle: 'A Cadeia Hierárquica de Modelos do CEPEL / ONS / CCEE',
    steps: [
      {
        title: 'NEWAVE: Planejamento de Médio/Longo Prazo (mensal)',
        description:
          'Programação Dinâmica Dual Estocástica (PDDE) em base mensal, com horizonte de até 10 anos (5 anos no uso para o PMO/PLD). As hidrelétricas podem ser agregadas em Reservatórios Equivalentes de Energia (REE) ou individualizadas, e a hidrologia é representada por cenários de Energia Natural Afluente (ENA).',
        tag: 'Estratégico / Mensal',
        badgeType: 'info',
        technicalDetail:
          'Produz as funções de custo futuro que indicam se vale mais guardar água ou despachar térmicas agora para reduzir o risco de déficit adiante.'
      },
      {
        title: 'DECOMP: Planejamento de Curto Prazo (semanal/mensal)',
        description:
          'Programação Dinâmica Dual com usinas hidrelétricas individualizadas, patamares de carga e horizonte de até 1 ano (no cálculo do preço, cerca de 2 meses com discretização semanal), refinando a política do NEWAVE.',
        tag: 'Tático / Semanal',
        badgeType: 'info',
        technicalDetail:
          'Acopla-se ao NEWAVE pela FCF no fim do seu horizonte e gera a FCF que serve de condição de contorno para o DESSEM.'
      },
      {
        title: 'DESSEM: Programação Diária e Preço Horário',
        description:
          'Resolve um unit commitment hidrotérmico por programação linear inteira mista, em base semi-horária e horizonte de até 7 dias, com unidades geradoras detalhadas e rede elétrica representada por modelagem DC (limites de fluxo nas linhas).',
        tag: 'Operativo / Diário',
        badgeType: 'success',
        technicalDetail:
          'Fornece o CMO de cada submercado usado pela CCEE para o PLD horário (desde 1º/01/2021). Quando os limites de intercâmbio saturam, os preços dos submercados descolam — o exportador pode cair ao piso regulatório enquanto o importador sobe.'
      },
      {
        title: 'A Separação entre Despacho Físico (ONS) e Liquidação Financeira (CCEE)',
        description:
          'O ONS despacha as usinas por custo e segurança elétrica. A CCEE confronta a geração e o consumo medidos com os contratos registrados e liquida as diferenças no Mercado de Curto Prazo ao PLD.',
        tag: 'Governança',
        badgeType: 'neutral',
        technicalDetail:
          'Uma térmica despachada fora da ordem de mérito por restrição elétrica ou segurança é ressarcida via Encargos de Serviços do Sistema (ESS), rateados entre os consumidores.'
      }
    ],
    lessonsLearned: [
      {
        title: 'O Preço no Brasil É Custo Otimizado, Não Lance',
        desc: 'Geradores não ofertam preço no Mercado de Curto Prazo: o CMO é a variável dual do balanço de carga no modelo, e o PLD é esse CMO limitado pelo piso e pelos tetos definidos pela ANEEL.'
      },
      {
        title: 'O Conflito do GSF',
        desc: 'GSF baixo não vem só da hidrologia: restrições de transmissão, geração fora da ordem de mérito e garantias físicas sobredimensionadas também comprimem o fator, alimentando a judicialização que travou liquidações na CCEE.'
      },
      {
        title: 'O Debate sobre Preço por Oferta',
        desc: 'O Projeto Meta II (CCEE/PSR, com apoio do Banco Mundial) comparou os modelos "por custo" e "por oferta", e o MME abriu consulta pública sobre a transição para um modelo híbrido que incorpora ofertas dos agentes na formação de preços.'
      }
    ],
    sources: [
      {
        label: 'CEPEL — Modelos de Otimização Energética (NEWAVE, DECOMP, DESSEM)',
        url: 'https://see.cepel.br/manual/libs/latest/modelos_otimizacao_energetica/modelos_otimizacao_energetica.html'
      },
      {
        label: 'CCEE — Conceitos de Preços (CMO, PLD, modelos, limites)',
        url: 'https://www.ccee.org.br/precos/conceitos-precos'
      },
      {
        label: 'ANEEL — Tarifas de otimização, serviços ancilares e limites do PLD para 2026',
        url: 'https://www.gov.br/aneel/pt-br/assuntos/noticias/2025/aneel-define-tarifas-de-energia-de-otimizacao-de-servicos-ancilares-e-pld-para-2026'
      },
      {
        label: 'Canal Solar — ANEEL define limites do PLD para 2026',
        url: 'https://canalsolar.com.br/aneel-define-limite-pld-2026/'
      },
      {
        label: 'ONS Dados Abertos — EAR diária por subsistema (2026)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/ear_subsistema_di/EAR_DIARIO_SUBSISTEMA_2026.csv'
      },
      {
        label: 'GESEL/UFRJ — A Crise do GSF: Causas, Consequências e Soluções',
        url: 'https://gesel.ie.ufrj.br/app/webroot/files/IFES/BV/sales94.pdf'
      },
      {
        label: 'ANEEL — Regras de Comercialização: Encargos',
        url: 'https://www2.aneel.gov.br/cedoc/aren20221051_2_10.pdf'
      },
      {
        label: 'CCEE — MME abre consulta pública sobre modernização da formação de preços',
        url: 'https://www.ccee.org.br/en/web/guest/-/mme-abre-consulta-publica-sobre-modernizacao-da-formacao-de-precos-resultado-de-estudo-da-ccee'
      }
    ]
  },
  {
    id: 'curtailment-duck-curve',
    title: 'Curtailment, A Curva do Pato & Gargalos de Transmissão',
    badge: 'TRANSIÇÃO ENERGÉTICA & GESTÃO DA INTERMITÊNCIA',
    badgeColor: 'amber',
    subtitle: 'Por que o ONS é forçado a cortar usinas solares e eólicas enquanto mantém outras fontes em operação?',
    summary:
      'Com cerca de 42 GW de micro e minigeração distribuída (ANEEL, jul/2025) e a expansão eólica e solar concentrada no Nordeste, a carga líquida do SIN passou a ter o formato da "Curva do Pato": no meio do dia sobra geração — e falta rede para escoá-la —; ao entardecer, a queda da geração solar exige uma rampa rápida das fontes despacháveis.',
    keyFormulas: [
      {
        label: 'Carga Líquida do Sistema',
        formula: 'Carga Líquida = Carga Total - Geração Solar (Centralizada + MMGD) - Eólica',
        explanation:
          'O "ventre do pato" surge perto do meio-dia, quando a produção solar atinge o pico e reduz a demanda a ser atendida pelas usinas despacháveis. O "pescoço do pato" é a subida íngreme da carga líquida no fim da tarde.'
      },
      {
        label: 'Rampa de Carga Líquida',
        formula: 'Rampa = Δ(Carga Líquida) / Δt  [MW/min]',
        explanation:
          'Quanto maior a capacidade de MMGD, menor a carga líquida mínima ao meio-dia e maior a rampa exigida quando o sol se põe, pois essa geração não é controlada pelo ONS e desaparece justamente antes do pico de consumo.'
      }
    ],
    keyMetrics: [
      { label: 'Cortes por Razão Energética (2024)', value: '~4.330 GWh', detail: 'Eólica + solar; pico semi-horário de 22.766 MWmed (ONS)' },
      { label: 'Micro e Minigeração Distribuída', value: '~42,3 GW', detail: 'ANEEL, 31/07/2025; sem supervisão nem controle do ONS' },
      { label: 'Exportação N/NE ➔ SE/CO', value: '~15.600 MW', detail: 'Capacidade na ponta estimada para jan/2025; 20.500 MW em dez/2029 (PAR/PEL 2024)' },
      { label: 'Baterias (LRCAP 2026)', value: '1º leilão de armazenamento', detail: 'Início de operação em 01/08/2028; requisitos ONS/EPE incluem grid forming' }
    ],
    stepsTitle: 'A Dinâmica Diária da Intermitência e dos Gargalos',
    steps: [
      {
        time: 'Meio do dia',
        title: 'O Ventre do Pato & O Excedente de Geração no Nordeste',
        description:
          'Com sol e vento, a geração renovável do Nordeste supera com folga o consumo da região, que se torna fortemente exportadora — em 15/08/2023, às 08h30, já gerava ~22,5 GW para ~10,2 GW de carga.',
        tag: 'Pico Solar',
        badgeType: 'info',
        technicalDetail:
          'A MMGD, espalhada pelo país, reduz a carga vista pelas usinas despachadas: em 2024 chegou a ~23,7 GW médios (dado semi-horário), e o SIN precisa reduzir hidrelétricas e demais fontes controláveis para manter o equilíbrio carga-geração.'
      },
      {
        time: 'Meio do dia',
        title: 'Saturação das Interligações N/NE ➔ SE/CO',
        description:
          'O escoamento do excedente esbarra nos limites de intercâmbio — definidos por carregamento de linhas e por estabilidade de tensão e angular sob contingência — das interligações que ligam o Nordeste ao Sudeste/Centro-Oeste e ao Norte.',
        tag: 'Gargalo de Transmissão',
        badgeType: 'warning',
        technicalDetail:
          'Os limites são calculados para que a perda de um elemento (critério N-1) não leve à instabilidade. Após o apagão de 2023, o ONS chegou a restringir o fluxo Nordeste → Sudeste a 5.000 MW, elevando-o gradualmente à medida que revisava os estudos de estabilidade.'
      },
      {
        time: 'Meio do dia',
        title: 'Ordem de Corte (Constrained-Off / Curtailment)',
        description:
          'O ONS determina a redução da geração de usinas eólicas e fotovoltaicas por três razões: indisponibilidade externa (rede fora de serviço), confiabilidade elétrica (limites de transmissão e segurança) e razão energética (oferta maior que a carga).',
        tag: 'Curtailment',
        badgeType: 'danger',
        technicalDetail:
          'Os cortes por razão energética são rateados entre as fontes despachadas pelo ONS, enquanto a MMGD permanece fora do processo — o que sobrecarrega os geradores centralizados e alimenta o debate regulatório sobre quem arca com a receita frustrada.'
      },
      {
        time: 'Entardecer',
        title: 'A Rampa Crítica do Entardecer (O Pescoço do Pato)',
        description:
          'A geração solar cai em poucas horas até zerar enquanto o consumo sobe rumo ao pico noturno. A carga líquida dispara e precisa ser atendida por fontes despacháveis.',
        tag: 'Rampa Severa',
        badgeType: 'warning',
        technicalDetail:
          'As hidrelétricas com reservatório assumem a maior parte da rampa, aumentando a vazão turbinada em questão de minutos, com reserva girante para manter os 60 Hz; térmicas flexíveis complementam quando falta água ou transmissão.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Baterias em Escala de Utilidade (BESS)',
        desc: 'Armazenar o excedente do meio do dia e descarregar no fim da tarde reduz cortes e alivia a rampa. O primeiro Leilão de Reserva de Capacidade de armazenamento (LRCAP 2026) exige requisitos técnicos definidos por ONS e EPE, incluindo controle de tensão e frequência e operação grid forming.'
      },
      {
        title: 'Compensadores Síncronos e Suporte de Reativos',
        desc: 'Em redes com muita geração por inversores, compensadores síncronos elevam a potência de curto-circuito e o suporte de reativos. O PAR/PEL 2024 propõe três unidades nas subestações mais críticas: duas em Açu III 500 kV e uma em João Câmara III 500 kV.'
      },
      {
        title: 'Leilões de Transmissão Estruturantes',
        desc: 'O Lote 1 do Leilão de Transmissão nº 2/2023 — bipolo ±800 kV Graça Aranha (MA) – Silvânia (GO), com ~1.500 km, arrematado pela State Grid — é o maior lote da história da ANEEL, com operação prevista para 2030 para ampliar o escoamento do N/NE ao Centro-Oeste/Sudeste.'
      }
    ],
    sources: [
      {
        label: 'ONS — RT DGL 0189/2025: Diagnóstico e Perspectiva da Evolução dos Cortes de Geração no Brasil',
        url: 'https://www.ons.org.br/AcervoDigitalDocumentosEPublicacoes/RT%20DGL-ONS%200189-2025%20-%20GT%20Curtailment%20rev1.pdf'
      },
      {
        label: 'ONS Dados Abertos — Restrição de operação por constrained-off de usinas eólicas',
        url: 'https://dados.ons.org.br/dataset/restricao_coff_eolica_usi'
      },
      {
        label: 'ANEEL — Crescimento da micro e minigeração distribuída supera os 5 GW em 2025',
        url: 'https://www.gov.br/aneel/pt-br/assuntos/noticias/2025/crescimento-da-micro-e-minigeracao-distribuida-supera-os-5-gw-em-2025'
      },
      {
        label: 'ONS — PAR/PEL 2024: Sumário Executivo',
        url: 'https://www.ons.org.br/paginas/energia-no-futuro/suprimento-eletrico/parpel2024/sumario-executivo/index.html'
      },
      {
        label: 'ONS — ONS eleva limite de intercâmbio de energia do Nordeste (27/09/2023)',
        url: 'https://www.ons.org.br/Paginas/Noticias/20230928-ONS-eleva-limite-de-interc%C3%A2mbio-de-energia-do-Nordeste-na-%C3%BAltima-quarta-feira,-27-de-setembro.aspx'
      },
      {
        label: 'ONS — Análise do desempenho do ERAC na perturbação de 15/08/2023 (balanço pré-ocorrência)',
        url: 'https://www.ons.org.br/AcervoDigitalDocumentosEPublicacoes/Apresenta%C3%A7%C3%A3o%20ERAC%2015-08-2023.pdf'
      },
      {
        label: 'EPE — Nota Técnica com requisitos mínimos para o LRCAP de Armazenamento de 2026',
        url: 'https://www.epe.gov.br/pt/imprensa/noticias/epe-e-ons-publicam-nota-tecnica-com-os-requisitos-minimos-para-o-leilao-de-reserva-de-capacidade-lrcap-de-armazenamento-de-2026'
      },
      {
        label: 'EPE — Leilão de Reserva de Capacidade na forma de Potência: Armazenamento 2026',
        url: 'https://www.epe.gov.br/pt/leiloes-de-energia/leiloes/leilao-de-reserva-de-capacidade-na-forma-de-potencia-armazenamento-2026'
      },
      {
        label: 'Cenário Energia — Hidrelétricas assumem a maior parte da rampa de carga do SIN (jul/2026)',
        url: 'https://cenarioenergia.com.br/2026/07/02/efeito-copa-hidreletricas-da-axia-assumem-54-da-rampa-de-carga-do-sin-pos-jogo/'
      },
      {
        label: 'ANEEL — Homologação do resultado do Leilão de Transmissão nº 2/2023',
        url: 'https://www.gov.br/aneel/pt-br/assuntos/noticias/2024/aneel-homologa-resultado-dos-tres-lotes-do-leilao-de-transmissao-2-2023'
      }
    ]
  }
];
