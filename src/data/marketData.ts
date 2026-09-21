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

export const tyrEnergySpotlight = {
  name: 'Tyr Energia',
  holding: 'Mercurio Partners',
  foundersTechLead: 'Pedro Bittencourt (CTO, ex-GreenAnt)',
  tagline: 'Gestão Inteligente de Energia no Mercado Livre com Telemetria em Tempo Real',
  coreDifferentiators: [
    {
      title: 'Smart Metering & IoT na Borda (GreenAnt)',
      desc: 'Com a aquisição da GreenAnt em fev/2026, a Tyr incorporou hardware proprietário e telemetria de alta frequência para ler o consumo em tempo real sem esperar o fechamento da fatura no fim do mês.'
    },
    {
      title: 'Comercialização Varejista Descomplicada',
      desc: 'A Tyr representa o cliente integralmente na CCEE. O condomínio ou restaurante migra com zero aporte de capital e passa a usufruir de economia imediata com contrato digital simples.'
    },
    {
      title: 'Otimização da Curva de Carga',
      desc: 'Com dados minuto a minuto, o cliente identifica picos de consumo, desvios operacionais em motores e ar-condicionado e desperdício de energia fora do horário comercial.'
    }
  ]
};
