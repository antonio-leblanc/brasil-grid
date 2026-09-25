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
    subtitle: 'Da abertura indevida de uma LT 500 kV ao colapso de tensão, ilhamento do SIN e atuação do ERAC',
    summary:
      'Em 15/08/2023, a abertura indevida da LT 500 kV Quixadá–Fortaleza II deflagrou colapso de tensão no Nordeste, separação do SIN em ilhas elétricas e corte de ~23.368 MW (~32% da carga nacional), afetando 25 estados e o DF. Conforme o RAP final do ONS, o suporte dinâmico de potência reativa das usinas eólicas e solares em campo ficou muito aquém do previsto nos modelos matemáticos cadastrados, inviabilizando a identificação preventiva da vulnerabilidade operativa.',
    keyFormulas: [
      {
        label: 'Equação de Oscilação (Swing Equation)',
        formula: 'df/dt = (f₀ / 2H) · (P_mec - P_elec)',
        explanation:
          'A taxa de variação de frequência (RoCoF) após um desbalanço é inversamente proporcional à inércia H. O RAP registrou inércia sistêmica adequada (~265 GW·s para ~73 GW de carga): o gatilho da ocorrência foi colapso de tensão, insensível ao acréscimo de inércia mecânica.'
      },
      {
        label: 'Ajustes Uniformizados do ERAC',
        formula: 'f ≤ 58,5 / 58,2 / 57,9 / 57,7 / 57,5 Hz  →  cortes de 5 / 6 / 7 / 8 / 9% (até 35% da carga)',
        explanation:
          'Relés de subfrequência (81) realizam alívio de carga escalonado para conter o afundamento da frequência antes do desligamento de geradores. O evento acelerou a padronização definitiva dos 5 degraus de corte em todo o SIN.'
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
        title: 'Desarme Indevido da LT 500 kV Quixadá – Fortaleza II',
        description:
          'Linha abriu no terminal Quixadá sem curto-circuito físico na rede, operando em regime de carregamento recorde de ~1.950 MW (2.375 A para limite nominal de 2.390 A).',
        tag: 'Desarme de LT',
        badgeType: 'warning',
        technicalDetail:
          'Atuação acidental da função 50 SOTF (Switch-On-To-Fault): ajuste calibrado em 2.310 A (abaixo do nominal) sem bloqueio pós-energização. Perda simples N-1 deveria ser suportável.'
      },
      {
        time: 'T0 + 0,53 s',
        title: 'Colapso de Tensão no Ceará e Abertura da Interligação N/NE',
        description:
          'Sobrecarga imediata no tronco de 230 kV e afundamento generalizado de tensão. Usinas eólicas e solares locais não injetaram a potência reativa prevista nos modelos computacionais.',
        tag: 'Colapso de Tensão',
        badgeType: 'danger',
        technicalDetail:
          'Aos 530 ms atuou a Proteção de Perda de Sincronismo (PPS) da LT Presidente Dutra–Boa Esperança 500 kV, disparando abertura de linhas de 230 kV por relés 21 e oscilações interáreas.'
      },
      {
        time: 'T0 + 2,6 s a T0 + 3,5 s',
        title: 'Separação e Blackout do Norte e Acre/Rondônia',
        description:
          'Abertura da LT 500 kV Serra da Mesa–Gurupi C2 isolou o Norte (importador líquido), que afundou em severa subfrequência. Em seguida, o Acre/Rondônia também se separou.',
        tag: 'Ilhamento',
        badgeType: 'danger',
        technicalDetail:
          'No Norte, o ERAC não conteve o desbalanço acentuado entre carga e geração local, provocando queda sucessiva de máquinas e colapso total do subsistema.'
      },
      {
        time: 'T0 + 2,6 s a T0 + 20 s',
        title: 'Atuação Massiva do ERAC no Sul, Sudeste e Nordeste',
        description:
          'Frequência afundou para 57,76 Hz no SE/CO e 57,66 Hz no Sul, sensibilizando 3 estágios do ERAC (~15,6 GW cortados) e recuperando 59,5 Hz em menos de 20 segundos.',
        tag: 'Disparo de ERAC',
        badgeType: 'warning',
        technicalDetail:
          'Nordeste permaneceu conectado ao SE/CO por ~18,6 s em subfrequência (acionando 5 estágios de corte) e depois ilhou-se em sobrefrequência, sustentado por eólicas, solares e hidrelétricas remanescentes.'
      },
      {
        time: '08:43 às 14:49',
        title: 'Recomposição Fluente & Black Start',
        description:
          'Sul e Sudeste restabeleceram a totalidade das cargas em menos de 1 hora. Norte e Nordeste exigiram partida a frio (black start) de grandes hidrelétricas e reconstituição em anéis.',
        tag: 'Recomposição',
        badgeType: 'success',
        technicalDetail:
          'Tucuruí, Balbina, Estreito e Samuel lideraram o black start no Norte; Itapebi e a ilha remanescente reenergizaram o Nordeste (Sobradinho falhou na autopartida). Carga 100% normalizada às 14h49.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Validação Mandatória de Modelos IBR',
        desc: 'Exigência de ensaios de campo e medição fasorial contínua (PMU) para certificar a resposta dinâmica de reativos e suportabilidade a afundamentos (FRT) de parques eólicos e solares.'
      },
      {
        title: 'Física do Colapso: Tensão vs Inércia',
        desc: 'O ONS comprovou que a perturbação decorreu de déficit de suporte de reativos e potência de curto-circuito na malha, e não de insuficiência de inércia mecânica rotativa.'
      },
      {
        title: 'Harmonização dos Esquemas de ERAC',
        desc: 'Correção de lógicas SOTF e unificação dos 5 degraus de subfrequência (58,5 a 57,5 Hz, até 35% de corte) em todos os subsistemas, banindo relés assimétricos por taxa de frequência (df/dt).'
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
    subtitle: 'Como a cadeia NEWAVE / DECOMP / DESSEM define despacho e preço no SIN, em vez de ofertas livres de geradores',
    summary:
      'No SIN, o despacho físico e o preço horário (CMO/PLD) não derivam de leilões de oferta livre, mas da cadeia de otimização estocástica NEWAVE/DECOMP/DESSEM desenvolvida pelo CEPEL. O modelo precifica a água acumulada nos reservatórios pelo custo futuro que ela evita: turbinar hoje com custo imediato baixo ou poupar para blindar o sistema contra térmicas fósseis e risco de déficit futuro.',
    keyFormulas: [
      {
        label: 'Valor da Água & CMO',
        formula: 'Valor da Água = −∂FCF / ∂V   |   CMO = ∂C_total / ∂Demanda',
        explanation:
          'A Função de Custo Futuro (FCF) traduz a expectativa de custo operacional frente ao volume V armazenado. O CMO é a derivada marginal (multiplicador de Lagrange) do balanço de carga. Quando uma hidrelétrica opera na margem, o CMO equivale exatamente ao valor de oportunidade da água.'
      },
      {
        label: 'Equilíbrio Hidrotérmico Ótimo',
        formula: 'min [ C_imediato(Térmicas, Déficit) + FCF(V_final) ]',
        explanation:
          'Minimização matemática em multiestágios: o algoritmo pondera o custo imediato de queima térmica contra o custo futuro de exaustão das reservas hídricas sob múltiplos cenários de vazão.'
      },
      {
        label: 'Fator de Ajuste do MRE (GSF)',
        formula: 'GSF = Geração Total do MRE / Σ Garantias Físicas do MRE',
        explanation:
          'Razão entre a geração hidrelétrica real e a soma das garantias físicas. GSF < 1 impõe déficit volumétrico e exposição financeira à liquidação no Mercado de Curto Prazo ao PLD.'
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
        title: 'NEWAVE — Planejamento Estratégico Plurianual (Mensal)',
        description:
          'Horizonte de até 10 anos em passos mensais. Modela a matriz via Reservatórios Equivalentes de Energia (REE) e séries estocásticas de afluência (ENA).',
        tag: 'Estratégico / Mensal',
        badgeType: 'info',
        technicalDetail:
          'Emprega Programação Dinâmica Dual Estocástica (PDDE) para construir as Funções de Custo Futuro (FCF) que guiam o compromisso entre poupar água e despachar térmicas.'
      },
      {
        title: 'DECOMP — Programação Tática de Médio Prazo (Semanal)',
        description:
          'Horizonte de até 1 ano discretizado em semanas. Detalha usinas hidrelétricas individualizadas e patamares de carga por submercado.',
        tag: 'Tático / Semanal',
        badgeType: 'info',
        technicalDetail:
          'Acopla-se à FCF do NEWAVE e refina restrições hidráulicas de cascata (vazões mínimas, tempos de viagem d’água e limites de defluência).'
      },
      {
        title: 'DESSEM — Despacho Operativo Diário & PLD Horário',
        description:
          'Horizonte de até 7 dias com granularidade semi-horária e horária. Representa a malha elétrica por fluxo de potência linearizado (DC) e limites de transmissão.',
        tag: 'Operativo / Diário',
        badgeType: 'success',
        technicalDetail:
          'Resolve Unit Commitment Hidrotérmico via MILP. O CMO marginal por barra e submercado baliza diretamente a fixação do PLD horário apurado pela CCEE.'
      },
      {
        title: 'Despacho Físico (ONS) vs Liquidação Financeira (CCEE)',
        description:
          'O ONS opera a rede física por ordem de mérito e critérios elétricos de segurança; a CCEE confronta a geração medida com a carteira contratual e liquida as sobras no MCP.',
        tag: 'Governança',
        badgeType: 'neutral',
        technicalDetail:
          'Térmicas acionadas fora da ordem de mérito por restrição elétrica ou confiabilidade recebem ressarcimento por Encargos de Serviços do Sistema (ESS), rateados entre as cargas.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Formação por Custo Otimizado vs Ofertas Livres',
        desc: 'O modelo do SEB é regulado por custo auditado: o preço reflete o multiplicador matemático da restrição de demanda, sem inserção de lances estratégicos de geradores.'
      },
      {
        title: 'Descolamento Espacial de Preços por Congestionamento',
        desc: 'Gargalos nas interligações saturam limites de intercâmbio no DESSEM: o subsistema exportador desaba ao piso regulatório (R$ 57,31/MWh), enquanto o importador sobe rumo ao teto.'
      },
      {
        title: 'Transição Regulatória para Formação por Oferta',
        desc: 'Estudos do Projeto Meta II (CCEE/PSR/Banco Mundial) embasam consultas públicas do MME para migração progressiva rumo a modelos híbridos baseados em ofertas horárias dos agentes.'
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
      'A expansão acelerada da micro e minigeração distribuída solar (~42,3 GW) somada aos complexos eólicos e solares centralizados do Nordeste consolidou a "Curva do Pato" no SIN. No meio do dia há excedente estrutural de geração e saturação nas linhas de transmissão rumo ao Sudeste, forçando cortes de geração renovável (curtailment); no poente solar, o sistema enfrenta uma subida íngreme de rampa nas hidrelétricas e térmicas.',
    keyFormulas: [
      {
        label: 'Carga Líquida do Sistema',
        formula: 'Carga Líquida = Demanda Total - Geração MMGD - Geração Solar/Eólica Centralizada',
        explanation:
          'O "ventre do pato" atinge o mínimo solar entre 11h e 14h, derrubando a demanda atendida por usinas despacháveis. O "pescoço do pato" surge das 17h às 19h com a perda solar e o acendimento de cargas urbanas.'
      },
      {
        label: 'Rampa Crítica de Carga Líquida',
        formula: 'Rampa = Δ(Carga Líquida) / Δt  [MW/min]',
        explanation:
          'A perda abrupta de geração distribuída no entardecer não é controlada pelo ONS, obrigando hidrelétricas com reservatório e térmicas rápidas a cobrir centenas de MW por minuto para resguardar a estabilidade de 60 Hz.'
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
        time: '11h às 14h',
        title: 'O Ventre do Pato e o Superávit do Nordeste',
        description:
          'Concomitância de irradiação solar de pico e ventos converte o Nordeste em pólo exportador massivo (~22,5 GW gerados para ~10,2 GW de carga).',
        tag: 'Pico Solar',
        badgeType: 'info',
        technicalDetail:
          'Injeção maciça de MMGD na ponta consumidora derruba a carga líquida vista pela rede básica; usinas síncronas despacháveis são reduzidas ao mínimo técnico operacional.'
      },
      {
        time: '12h às 15h',
        title: 'Saturação de Intercâmbios N/NE ➔ SE/CO',
        description:
          'Troncos de 500 kV que conectam o Nordeste ao Centro-Oeste e Sudeste esbarram nos limites operativos de estabilidade angular e de tensão.',
        tag: 'Gargalo de Transmissão',
        badgeType: 'warning',
        technicalDetail:
          'Critério N-1 limita o fluxo de exportação para evitar colapso de tensão sistêmico caso ocorra perda de uma linha tronco de 500 kV em contingência simples.'
      },
      {
        time: 'Horário Diurno',
        title: 'Ordem de Corte (Constrained-Off)',
        description:
          'Com interligações saturadas e sem carga suficiente, o ONS emite comandos mandatórios de corte de geração (curtailment) para dezenas de parques eólicos e solares centralizados.',
        tag: 'Curtailment',
        badgeType: 'danger',
        technicalDetail:
          'Cortes por razão de confiabilidade elétrica e excesso energético superaram 4,3 TWh em 2024. A MMGD, desprovida de supervisão do ONS, permanece imune e agrava o corte dos geradores centralizados.'
      },
      {
        time: '17h às 19h',
        title: 'O Pescoço do Pato e a Rampa Hidrelétrica',
        description:
          'Usinas fotovoltaicas zeram geração em menos de 90 minutos enquanto o consumo nacional sobe rumo ao pico noturno. A carga líquida dispara bruscamente.',
        tag: 'Rampa Severa',
        badgeType: 'warning',
        technicalDetail:
          'Hidrelétricas com reservatório de acumulação (bacias do Paraná, Paranaíba e Grande) assumem mais de 50% da rampa de potência em minutos para manter a frequência de 60 Hz.'
      }
    ],
    lessonsLearned: [
      {
        title: 'Sistemas de Armazenamento BESS Grid-Scale',
        desc: 'Baterias em grande escala absorvem o excedente fotovoltaico ao meio-dia e descarregam no pico noturno. O leilão LRCAP 2026 exige inversores grid-forming para controle de tensão e frequência.'
      },
      {
        title: 'Compensadores Síncronos em Subestações Críticas',
        desc: 'Instalação de compensadores (como previsto em Açu III e João Câmara III no PAR/PEL 2024) para elevar a potência de curto-circuito e estabilizar reativos em nós dominados por inversores.'
      },
      {
        title: 'Supercorredores UHVDC ±800 kV',
        desc: 'O bipolo Graça Aranha (MA) – Silvânia (GO), com ~1.500 km arrematado pela State Grid no Leilão 02/2023, adicionará 5 GW de escoamento do Norte/Nordeste para o Sudeste a partir de 2030.'
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
