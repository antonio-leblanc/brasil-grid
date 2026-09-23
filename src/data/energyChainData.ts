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
}

export const energyChainStages: ValueChainStage[] = [
  {
    id: 'geracao',
    number: '01',
    name: 'Geração',
    subtitle: 'A Origem da Energia',
    voltage: '13.8 kV a 24 kV (elevada para 230-800 kV)',
    description: 'Transformação de recursos naturais primários em eletricidade. O Brasil possui uma das matrizes elétricas mais limpas do mundo, com mais de 84% de fontes renováveis.',
    revenueModel: 'Venda de energia por contratos no ACR (leilões de energia nova/reserva) ou ACL (PPAs bilaterais de longo prazo).',
    regulator: 'ANEEL (outorga e fiscalização) / ONS (despacho centralizado).',
    mainCompanies: [
      { name: 'Eletrobras', tag: 'Maior geradora da AL (44+ GW)' },
      { name: 'Engie Brasil', tag: 'Líder privada 100% renovável' },
      { name: 'Auren Energia', tag: 'Gigante hidroelétrica e eólica' },
      { name: 'Eneva', tag: 'Líder em gás natural (térmica de despacho)' },
      { name: 'CPFL Geração', tag: 'Parques eólicos e PCHs' }
    ],
    keyMetrics: [
      { label: 'Capacidade Instalada', value: '~205 GW' },
      { label: 'Matriz Renovável', value: '> 84%' },
      { label: 'Hidrelétricas', value: '~55% da matriz' },
      { label: 'Eólica + Solar', value: '~27% da matriz' }
    ],
    highlights: [
      'Despacho hidrotermelétrico centralizado pelo ONS para otimizar o uso da água dos reservatórios.',
      'Boom da Geração Distribuída (GD solar em telhados/fazendas solares) descentralizando a produção.',
      'Sazonalidade e intermitência: sol de dia, vento forte à noite no Nordeste.'
    ]
  },
  {
    id: 'transmissao',
    number: '02',
    name: 'Transmissão',
    subtitle: 'As Autoestradas de Alta Tensão',
    voltage: '230 kV, 345 kV, 500 kV, ±800 kV CC',
    description: 'Transporte de imensas massas de energia por milhares de quilômetros, ligando os grandes centros de geração (Norte/Nordeste/Itaipu) aos polos de consumo no Sudeste/Sul.',
    revenueModel: 'RAP (Receita Anual Permitida) — remuneração fixa pela disponibilidade da linha, independente do volume elétrico transportado.',
    regulator: 'ANEEL (leilões de concessão de 30 anos com desconto de RAP).',
    mainCompanies: [
      { name: 'Taesa', tag: 'Pure play de transmissão líder' },
      { name: 'ISA CTEEP', tag: 'Maior transmissora privada de SP' },
      { name: 'Eletrobras Transmissão', tag: 'Furnas, Chesf, Eletronorte' },
      { name: 'Alupar', tag: 'Concessões de grande porte' },
      { name: 'State Grid', tag: 'Opera os Linhões ±800kV de Belo Monte' }
    ],
    keyMetrics: [
      { label: 'Extensão da Malha', value: '185.000+ km' },
      { label: 'Tensão Máxima', value: '±800 kV (UHVDC)' },
      { label: 'Subestações SIN', value: '600+ unidades' },
      { label: 'Margem de Disponibilidade', value: '> 99.8%' }
    ],
    highlights: [
      'Os Linhões de Belo Monte (Xingu-Rio e Xingu-Estreito) são as maiores linhas de transmissão de corrente contínua da América Latina (~2.500 km cada).',
      'Negócio com perfil de títulos de renda fixa: receita previsível e corrigida pela inflação (IPCA/IGP-M).',
      'O Sistema Interligado Nacional (SIN) permite que a energia de uma usina no Pará acenda uma lâmpada em Porto Alegre.'
    ]
  },
  {
    id: 'distribuicao',
    number: '03',
    name: 'Distribuição',
    subtitle: 'A Malha Urbana & Fio Físico',
    voltage: '13.8 kV / 34.5 kV (postes) para 110V / 220V / 380V (residencial/comercial)',
    description: 'O elo que recebe a eletricidade das subestações de transmissão e a entrega aos postes, transformadores e medidores finais de residências, hospitais, fábricas e comércios.',
    revenueModel: 'Tarifa de Distribuição (TUSD — Tarifa de Uso do Sistema de Distribuição), revisada a cada 4-5 anos pela ANEEL.',
    regulator: 'ANEEL (metas rígidas de continuidade DEC/FEC — tempo e frequência de apagões).',
    mainCompanies: [
      { name: 'Light', tag: 'Concessionária histórica do Rio de Janeiro' },
      { name: 'Enel Brasil', tag: 'Distribuição em SP e RJ' },
      { name: 'Neoenergia', tag: 'Distribuição na Bahia, PE, RN e SP' },
      { name: 'Equatorial Energia', tag: 'Consolidadora regional (MA, PA, AL, PI, RS)' },
      { name: 'CPFL Energia', tag: 'Interior de SP e RS' }
    ],
    keyMetrics: [
      { label: 'Consumidores Atendidos', value: '90+ Milhões' },
      { label: 'Natureza Jurídica', value: 'Monopólio Geográfico' },
      { label: 'Perdas Técnicas/Não-Téc.', value: 'Desafio crítico (gatos/rede)' },
      { label: 'Componente Fio B', value: 'Custo da infraestrutura local' }
    ],
    highlights: [
      'Monopólio natural: não existem duas fiações de postes concorrentes na mesma rua.',
      'O fio de distribuição continua sendo usado mesmo quando a empresa migra para o Mercado Livre (a distribuidora segue cobrando o aluguel do fio — a TUSD).',
      'Enfrenta o maior desafio de transição com a proliferação de geração distribuída solar e carros elétricos.'
    ]
  },
  {
    id: 'comercializacao',
    number: '04',
    name: 'Comercialização',
    subtitle: 'Mercado Livre, Contratos & Liquidação CCEE',
    voltage: 'Negociação financeira e de dados (independente da tensão)',
    description: 'A comercialização viabiliza o casamento financeiro entre oferta e demanda por meio de contratos bilaterais (PPAs) e liquidação de diferenças no mercado spot (PLD). No ACL, grandes consumidores contratam energia livremente, enquanto no ACR as distribuidoras atendem o mercado cativo via leilões públicos.',
    revenueModel: 'Spread de comercialização, gestão de risco de preços (hedge), estruturação de PPAs e serviços de inteligência/telemetria de carga.',
    regulator: 'CCEE (registro e liquidação financeira de contratos) e ANEEL.',
    mainCompanies: [
      { name: 'Comerc Energia', tag: 'Pioneira em gestão e comercialização livre' },
      { name: 'Raízen Power', tag: 'Braço de energia e comercialização do grupo Cosan/Shell' },
      { name: 'Auren Energia', tag: 'Gigante em comercialização de energia limpa' },
      { name: 'Matrix Energia', tag: 'Joint venture focada em mercado livre e baterias' },
      { name: 'Eletrobras Comercialização', tag: 'Maior portfólio de descontratação do país' }
    ],
    keyMetrics: [
      { label: 'Volume Negociado no ACL', value: '~40% da carga nacional' },
      { label: 'Preço Spot de Referência', value: 'PLD Horário (CCEE)' },
      { label: 'Contratos Registrados', value: '100.000+ na CCEE' },
      { label: 'Fronteira Regulatória', value: 'Separação Lastro × Energia' }
    ],
    highlights: [
      'A CCEE contabiliza a cada hora o descompasso entre a energia física gerada/consumida e a energia contratada, liquidando as sobras e déficits ao PLD.',
      'A telemetria de alta frequência (medidores SCADA/IoT nos clientes livres) é essencial para a contabilização semi-horária e para a resposta da demanda.',
      'A separação estrutural entre Lastro (capacidade de potência garantida para segurança do SIN) e Energia (volume de MWh consumido) é o pilar da modernização regulatória do SEB.'
    ]
  }
];
