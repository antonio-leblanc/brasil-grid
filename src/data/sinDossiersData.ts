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
}

export const sinDossiers: SinDossier[] = [
  {
    id: 'apagao-2023',
    title: 'Anatomia do Apagão de 15 de Agosto de 2023',
    badge: 'ESTABILIDADE ELETROMECÂNICA & IBR',
    badgeColor: 'rose',
    subtitle: 'A física da perda de inércia, o colapso por IBRs e a atuação do ERAC nacional',
    summary:
      'Em 15 de agosto de 2023, às 08h30, o SIN sofreu uma cisão sistêmica que interrompeu ~29.000 MW de carga em 25 estados e no DF. O evento expôs a vulnerabilidade crítica da transição para Recursos Baseados em Inversores (IBRs) operando sem inércia sintética e com parametrização deficiente de resposta a afundamentos de tensão (LVRT).',
    keyFormulas: [
      {
        label: 'Equação de Oscilação (Swing Equation)',
        formula: 'df/dt = (f₀ / 2H) · (P_mec - P_elec)',
        explanation:
          'A taxa de variação da frequência (RoCoF) é inversamente proporcional à inércia equivalente H. Quanto menor a inércia rotativa das hidrelétricas/térmicas no barramento, mais rápido a frequência desaba após uma perda súbita de geração.'
      },
      {
        label: 'Atuação do ERAC (Alívio de Carga)',
        formula: 'f < 59.50 Hz  →  Corte escalonado de 5% a 25% da carga em 5 estágios',
        explanation:
          'Quando a frequência cruza os limiares de segurança, os relés de subfrequência do ERAC desconectam alimentadores de distribuição automaticamente em menos de 200 ms para salvar o sistema de um colapso completo (blackout total).'
      }
    ],
    keyMetrics: [
      { label: 'Carga Interrompida', value: '~29.000 MW', detail: '33% da carga do Brasil no momento' },
      { label: 'Subsistemas Afetados', value: 'N, NE, SE/CO, S', detail: 'Apenas Roraima (isolada) não caiu' },
      { label: 'Tempo até a Cisão', value: '17 segundos', detail: 'Do evento zero até o corte das interconexões' },
      { label: 'Penetração Renovável NE', value: '> 80%', detail: 'Geração dominada por eólica e solar no horário' }
    ],
    stepsTitle: 'Cronologia Operativa Milissegundo a Milissegundo',
    steps: [
      {
        time: '08:30:27.000',
        title: 'Evento Inicial: Abertura da LT 500 kV Quixadá – Fortaleza II',
        description:
          'Um desarme não programado da linha tronco de 500 kV no Ceará provocou a redistribuição imediata de potências pelas linhas paralelas do subsistema Nordeste.',
        tag: 'Desarme de LT',
        badgeType: 'warning',
        technicalDetail:
          'A abertura de uma linha de 500 kV em condições de contingência N-1 deveria ser contornável pelo sistema sem descontinuidade de carga se os controles de tensão respondessem conforme os modelos computacionais.'
      },
      {
        time: '08:30:27.500 – 08:30:40.000',
        title: 'Subdesempenho dos Inversores (IBRs) e Afundamento de Tensão',
        description:
          'Com a redistribuição de fluxo, a tensão caiu nas barras do Nordeste. Centenas de usinas solares e eólicas apresentaram desempenho anômalo de Low-Voltage Ride-Through (LVRT): em vez de sustentarem a tensão injetando reativos, seus inversores reduziram a injeção de corrente ativa e reativa ou se desligaram para proteger os transistores IGBT.',
        tag: 'Falha de LVRT',
        badgeType: 'danger',
        technicalDetail:
          'A perda repentina de ~2.000 MW de geração IBR em cascata amplificou o afundamento de tensão, criando um ciclo vicioso que a inércia local não conseguiu frear.'
      },
      {
        time: '08:30:44.000 (t + 17s)',
        title: 'Cisão Sistêmica: O Brasil se divide em duas ilhas elétricas',
        description:
          'As proteções de sobrecarga e perda de sincronismo atuaram nas interconexões que ligavam o Norte/Nordeste ao Sudeste/Centro-Oeste. O SIN foi partido em dois sistemas desequilibrados e assíncronos.',
        tag: 'Cisão Sistêmica',
        badgeType: 'danger',
        technicalDetail:
          'A ilha Norte/Nordeste ficou com imenso déficit de geração em relação à sua carga e sem suporte das grandes hidrelétricas do Paraná e Paranaíba.'
      },
      {
        time: '08:30:44.200 – 08:30:46.000',
        title: 'Atuação do ERAC Nacional e Estabilização da Frequência',
        description:
          'Na Ilha Norte/Nordeste, a frequência despencou abaixo de 58,5 Hz. Os relés de subfrequência dispararam múltiplos estágios do ERAC simultaneamente, derrubando milhões de alimentadores nas distribuidoras para equilibrar artificialmente geração e carga.',
        tag: 'Disparo de ERAC',
        badgeType: 'warning',
        technicalDetail:
          'Embora o corte de carga tenha sido severo para os consumidores, a atuação do ERAC impediu que as turbinas de Sobradinho, Paulo Afonso e Xingó entrassem em trip de sobrefrequência ou subfrequência destrutivo.'
      },
      {
        time: '08:45 – 14:00',
        title: 'Recomposição Flutuante & Black-Start',
        description:
          'O ONS coordenou o processo de recomposição fluente, isolando os barramentos em falta, energizando linhas tronco a partir de usinas com capacidade de partida a frio (black-start) e religando gradualmente as cargas prioritárias (hospitais e saneamento).',
        tag: 'Recomposição',
        badgeType: 'success',
        technicalDetail:
          'Restabelecimento completo do subsistema Sudeste/Sul em menos de 2 horas; o Norte e Nordeste concluíram a recomposição total no início da tarde.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Auditoria e Correção de Modelos Computacionais de IBRs',
        desc: 'O ONS constatou divergência entre os modelos matemáticos cadastrados pelos geradores e o comportamento real dos inversores em campo. Novas regras de testes e comissionamento de LVRT tornaram-se mandatórias.'
      },
      {
        title: 'Necessidade Crítica de Inércia Sintética & Grid-Forming',
        desc: 'Sistemas dominados por inversores Grid-Following (que apenas perseguem a frequência da rede) não sustentam barramentos isolados. O SIN passou a exigir requisitos de inversores Grid-Forming e incentivos para BESS e compensadores síncronos.'
      },
      {
        title: 'Revisão dos Esquemas Especiais de Proteção (SEP)',
        desc: 'Ajuste das lógicas de corte antecipado de linhas de transmissão e recalibração dos limiares de frequência dos relés do ERAC para evitar cortes generalizados desnecessários.'
      }
    ]
  },
  {
    id: 'custo-agua-pld',
    title: 'O Custo Futuro da Água & A Formação do Preço (PLD)',
    badge: 'OPERAÇÃO HIDROTÉRMICA & DESPACHO CENTRALIZADO',
    badgeColor: 'cyan',
    subtitle: 'Como a otimização estocástica dual (NEWAVE/DESSEM) substitui o leilão de mercado livre no SIN',
    summary:
      'Ao contrário do Texas (ERCOT) ou do Reino Unido (onde o preço spot é ditado por leilões de oferta dos geradores), no Brasil o despacho físico e o Custo Marginal de Operação (CMO) são determinados centralizadamente pelo ONS via modelos matemáticos do CEPEL. A água armazenada nos reservatórios é tratada como um ativo de valor estocástico futuro.',
    keyFormulas: [
      {
        label: 'Custo Marginal de Operação (CMO)',
        formula: 'CMO = - ∂C_fut(EAR, ENA) / ∂EAR',
        explanation:
          'O CMO representa o custo futuro evitado de despachar térmicas caras caso se poupe 1 MWh adicional de Energia Armazenada (EAR) hoje nos reservatórios.'
      },
      {
        label: 'Equilíbrio Hidrotérmico Ótimo',
        formula: 'Custo Total = C_imediato(Térmicas) + E[C_futuro(Água)]',
        explanation:
          'O operador minimiza o somatório do custo imediato de queima de combustíveis hoje com o valor esperado do custo futuro de déficit ou acionamento de térmicas sob cenários hidrológicos incertos.'
      },
      {
        label: 'Fator de Escala de Geração (GSF)',
        formula: 'GSF = Geração Hidrelétrica Verificada / Garantia Física Total',
        explanation:
          'Quando há seca severa, o GSF cai abaixo de 100%. As hidrelétricas geram menos que seus contratos comerciais e são obrigadas a liquidar a diferença ao PLD horário na CCEE, originando o risco hidrológico.'
      }
    ],
    keyMetrics: [
      { label: 'Capacidade Armazenamento SIN', value: '~300 TWh', detail: 'A "bateria de água" do Sudeste e Sul' },
      { label: 'Discretização do PLD', value: 'Horária / Semi-horária', detail: 'Preço spot calculado pelo modelo DESSEM' },
      { label: 'Limites Regulatórios ANEEL', value: 'PLD Mín ~ R$ 60 | Máx ~ R$ 700/MWh', detail: 'Pisos e tetos regulados para estabilidade' },
      { label: 'Contratos Balizados', value: '> 80% em PPA', detail: 'Mercado livre e regulado contratam no longo prazo' }
    ],
    stepsTitle: 'A Cadeia Hierárquica de Modelos do CEPEL / ONS',
    steps: [
      {
        title: 'NEWAVE: Planejamento Energético Plurianual (5 a 10 anos)',
        description:
          'Utiliza Programação Dinâmica Estocástica Dual (SDDP). Discretiza o sistema em subsistemas equivalentes e calcula a função de custo futuro (FCF) considerando milhares de árvores de cenários de Energia Natural Afluente (ENA).',
        tag: 'Estratégico / Mensal',
        badgeType: 'info',
        technicalDetail:
          'Gera as superfícies de custo futuro que indicam para o operador se vale a pena guardar água na represa ou ligar térmicas preventivas para evitar racionamento no ano seguinte.'
      },
      {
        title: 'DECOMP: Planejamento de Médio Prazo (Semanas a Meses)',
        description:
          'Acopla os resultados do NEWAVE e modela as usinas de forma individualizada ao longo de semanas operativas e patamares de carga (pesada, média, leve).',
        tag: 'Tático / Semanal',
        badgeType: 'info',
        technicalDetail:
          'Define as metas de armazenamento por bacia hidrográfica (Paraná, Grande, Paranaíba, São Francisco) e os volumes de desfluência obrigatória.'
      },
      {
        title: 'DESSEM: Despacho e Preço Horário (Intra-diário / Tempo Real)',
        description:
          'Resolve o problema de fluxo de potência em corrente contínua (DC-OPF) a cada meia hora, respeitando limites físicos de transmissão de cada linhão, rampas de tomada de carga, inflexibilidade térmica e vazão mínima.',
        tag: 'Operativo / Horário',
        badgeType: 'success',
        technicalDetail:
          'Determina o CMO e o PLD horário de cada subsistema. Quando as linhas que ligam o Nordeste ao Sudeste saturam, o PLD do Nordeste cai ao piso regulatório (energia represada) enquanto o Sudeste sobe.'
      },
      {
        title: 'A Separação entre Despacho Físico (ONS) e Liquidação Financeira (CCEE)',
        description:
          'O ONS despacha as usinas puramente por critério de custo e segurança elétrica. A CCEE pega a geração real medida e os contratos bilaterais registrados e liquida as diferenças horárias financeiras ao PLD.',
        tag: 'Governança',
        badgeType: 'neutral',
        technicalDetail:
          'Se uma usina for acionada pelo ONS por restrição elétrica de transmissão fora da ordem de mérito econômico, ela é remunerada via Encargos de Serviço do Sistema (ESS), rateados entre todos os consumidores.'
      }
    ],
    lessonsLearned: [
      {
        title: 'O Preço no Brasil Não é Livre Mercado, é Custo Matemático Auditado',
        desc: 'Nenhum gerador hidrelétrico pode dar um "lance" de preço no spot. O preço é o multiplicador de Lagrange da restrição de balanço de potência no modelo computacional DESSEM.'
      },
      {
        title: 'O Conflito GSF e a Necessidade de Reforma do Modelo',
        desc: 'O encolhimento relativo dos reservatórios frente ao crescimento da carga e das fontes renováveis intermitentes sobrecarrega a garantia física das hidrelétricas, exigindo novos produtos de remuneração de potência e flexibilidade.'
      },
      {
        title: 'A Transição para o Preço com Base na Oferta (Bid-Based)',
        desc: 'O setor debate a migração futura de despacho por custo auditado para leilões baseados em ofertas voluntárias de preços, acompanhando a maturidade do mercado livre e das baterias.'
      }
    ]
  },
  {
    id: 'curtailment-duck-curve',
    title: 'Curtailment, A Curva do Pato & Gargalos de Transmissão',
    badge: 'TRANSIÇÃO ENERGÉTICA & GESTÃO DA INTERMITÊNCIA',
    badgeColor: 'amber',
    subtitle: 'Por que o ONS é forçado a cortar usinas solares e eólicas limpas enquanto despacha térmicas?',
    summary:
      'Com mais de 30 GW de geração solar distribuída (telhados) e o boom eólico no Nordeste, o perfil de carga líquida do SIN transformou-se radicalmente na "Curva do Pato". No meio do dia sobra energia onde não há carga; ao entardecer, a rampa solar despenca e força o acionamento emergencial de usinas de resposta rápida.',
    keyFormulas: [
      {
        label: 'Carga Líquida do Sistema',
        formula: 'Carga Líquida = Carga Total - Geração Solar (Centralizada + MMGD) - Eólica',
        explanation:
          'O "ventre do pato" surge ao meio-dia quando a produção solar atinge o pico e derruba a demanda atendida pelas usinas despacháveis. O "pescoço do pato" é a rampa íngreme de fim de tarde.'
      },
      {
        label: 'Rampa de Rastreamento Requerida (Ramping Rate)',
        formula: 'ΔP / Δt > 15.000 MW em 90 minutos (17h00 às 18h30)',
        explanation:
          'O operador precisa injetar mais de 10 GW de potência líquida em menos de duas horas apenas para compensar a perda do recurso solar e atender ao pico de consumo residencial.'
      }
    ],
    keyMetrics: [
      { label: 'Curtailment Anual Eólico/Solar', value: '> 1.000 GWh/ano', detail: 'Geração limpa desperdiçada por restrição de rede' },
      { label: 'Geração Distribuída (MMGD)', value: '> 32 GW', detail: 'Invisível ao despacho primário do ONS (na baixa tensão)' },
      { label: 'Intercâmbio NE ➔ SE/CO', value: 'Capacidade máxima ~14.000 MW', detail: 'Linhões frequentemente saturados em dias de vento/sol' },
      { label: 'Necessidade de BESS', value: '> 5 GW até 2030', detail: 'Projeção EPE para armazenamento em baterias' }
    ],
    stepsTitle: 'A Dinâmica Diária da Intermitência e dos Gargalos',
    steps: [
      {
        time: '11:00 – 14:00',
        title: 'O Ventre do Pato & O Excedente de Geração no Nordeste',
        description:
          'Com céu limpo e ventos constantes, a geração renovável no Nordeste supera em muito o consumo da região. O subsistema torna-se massivamente exportador.',
        tag: 'Pico Solar',
        badgeType: 'info',
        technicalDetail:
          'A geração distribuída nos telhados do Sudeste/Sul derruba a curva de carga medida nas subestações, fazendo com que o SIN precise reduzir o despacho das hidrelétricas ao mínimo operativo técnico.'
      },
      {
        time: '12:30',
        title: 'Saturação dos Linhões Tronco de 500 kV e 800 kV',
        description:
          'A tentativa de empurrar todo o excesso de energia renovável do Nordeste para o Sudeste atinge os limites térmicos de condutores e os limites de estabilidade de tensão das linhas da Bahia e Minas Gerais.',
        tag: 'Gargalo de Transmissão',
        badgeType: 'warning',
        technicalDetail:
          'Se o fluxo exceder o limite de confiabilidade N-1, a perda de um único circuito causaria colapso de tensão sistêmico regional idêntico ao apagão de 2023.'
      },
      {
        time: '13:00',
        title: 'Ordem de Constrained-Off (Corte Forçado / Curtailment)',
        description:
          'Para proteger a rede física de um colapso eletromecânico, o ONS emite comandos telemétricos cortando a injeção de dezenas de parques solares e eólicos.',
        tag: 'Curtailment',
        badgeType: 'danger',
        technicalDetail:
          'Mesmo com custo de combustível zero e sol pleno, os geradores desligam turbinas e invertem inversores, gerando disputas regulatórias sobre quem arca com a frustração de receita.'
      },
      {
        time: '17:30 – 19:00',
        title: 'A Rampa Crítica do Entardecer (O Pescoço do Pato)',
        description:
          'O sol se põe, zerando instantaneamente dezenas de gigawatts solares, enquanto a carga atinge o ápice pelo retorno das pessoas para suas casas e iluminação pública.',
        tag: 'Rampa Severa',
        badgeType: 'warning',
        technicalDetail:
          'As hidrelétricas com reservatórios flexíveis são obrigadas a abrir comportas rapidamente para evitar a queda da frequência de 60 Hz. Se faltar hidrelétrica ou linha de transmissão, acionam-se térmicas de ponta a gás natural.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Baterias em Escala de Utilidade (BESS)',
        desc: 'A instalação de sistemas BESS em subestações do Nordeste permite absorver o pico solar ao meio-dia e descarregar no pico de 18h30, eliminando o curtailment e aliviando a sobrecarga das linhas tronco.'
      },
      {
        title: 'Compensadores Síncronos e Suporte de Reativos',
        desc: 'A substituição de geração síncrona por solar enfraquece a rede física (baixa potência de curto-circuito). A instalação de compensadores síncronos dedicados reforça os barramentos sem emissão de carbono.'
      },
      {
        title: 'Leilões de Transmissão Estruturantes',
        desc: 'O escoamento das renováveis do Nordeste exigiu os maiores leilões de transmissão da história da ANEEL, viabilizando novos bipolos de ±800 kV UHVDC ligando o interior da Bahia ao Sudeste.'
      }
    ]
  }
];
