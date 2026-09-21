export interface MarketComparisonRow {
  aspect: string;
  acr: string;
  acl: string;
  importance: string;
}

export const marketComparisonData: MarketComparisonRow[] = [
  {
    aspect: 'Quem pode participar?',
    acr: 'Residências e pequenos comércios (Grupo B / Baixa Tensão).',
    acl: 'Indústrias e comércios em média e alta tensão (Grupo A — padarias, supermercados, condomínios comerciais).',
    importance: 'Desde janeiro de 2024 (Portaria 50/2022), qualquer CNPJ em média/alta tensão pode migrar, gerando uma corrida de mercado.'
  },
  {
    aspect: 'Escolha do fornecedor',
    acr: 'Nenhuma escolha. Consumidor cativo obrigado a comprar da distribuidora local (monopólio).',
    acl: 'Livre escolha. Pode contratar qualquer geradora ou comercializadora (Tyr, Comerc, Raízen, etc.).',
    importance: 'Permite exigir 100% energia limpa (certificados I-REC) e negociar diretamente com os melhores players.'
  },
  {
    aspect: 'Preço & Tarifa',
    acr: 'Tarifa tabelada anual fixada pela ANEEL, sujeita a bandeiras tarifárias (verde, amarela, vermelha).',
    acl: 'Preço livre negociado em contrato bilateral. Previsibilidade orçamentária de longo prazo (2 a 5 anos).',
    importance: 'Descontos reais entre 15% e 35% em relação à tarifa da distribuidora pública.'
  },
  {
    aspect: 'Governança & Liquidação',
    acr: 'Fiscalizado diretamente pela ANEEL via concessionária de distribuição.',
    acl: 'Registrado, contabilizado e liquidado financeiramente pela CCEE (Câmara de Comercialização de Energia Elétrica).',
    importance: 'A CCEE calcula o PLD (Preço de Liquidação das Diferenças), que é o valor da energia no mercado spot horário.'
  },
  {
    aspect: 'Como fica o fio físico?',
    acr: 'Paga a conta única de energia (energia + uso da rede) direto para a distribuidora.',
    acl: 'Recebe duas faturas: uma da distribuidora pelo aluguel do fio (TUSD) e outra da comercializadora pela energia.',
    importance: 'O fio nunca muda! Não precisa trocar poste ou fiação. Apenas o medidor ou a integração de telemetria.'
  },
  {
    aspect: 'Papel da Comercializadora Varejista',
    acr: 'Não aplicável (distribuidora faz todo o papel).',
    acl: 'Assume toda a burocracia perante a CCEE em nome do cliente, eliminando taxas de adesão e riscos operacionais.',
    importance: 'É o modelo que democratizou o ACL para padarias, açougues e escolas sem precisar de departamento elétrico próprio.'
  }
];

export const telemetrySpotlight = {
  name: 'Smart Metering & Telemetria IoT no ACL',
  category: 'Tecnologia de Borda & Gestão de Carga',
  techLead: 'Medição em Alta Frequência & Algoritmos de Desagregação',
  tagline: 'Como hardware na ponta e inteligência de dados transformam a gestão de faturas no Mercado Livre',
  coreDifferentiators: [
    {
      title: 'Smart Metering & Coleta na Borda',
      desc: 'Medidores digitais inteligentes instalados nos quadros elétricos coletam parâmetros elétricos (tensão, corrente, potência ativa e reativa, fator de potência e THD) em intervalos sub-minuto, transmitindo via 4G/NB-IoT ou Wi-Fi para nuvem.'
    },
    {
      title: 'Desintermediação & Gestão Varejista',
      desc: 'Comercializadoras varejistas utilizam esses fluxos contínuos de dados para fazer a conciliação automática com a CCEE e garantir que empresas do Grupo A (comércios, escolas, clínicas) migrem sem precisar de equipes técnicas dedicadas.'
    },
    {
      title: 'Otimização Ativa da Curva de Carga',
      desc: 'Com medições em tempo real, algoritmos detectam fugas de corrente, partidas desbalanceadas de motores, consumo fantasma fora do horário de expediente e alertam sobre riscos de ultrapassagem de demanda contratada com a distribuidora.'
    }
  ]
};
