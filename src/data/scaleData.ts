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
}

export const powerVsEnergyExplainer = {
  power: {
    title: 'Potência (W, kW, MW, GW)',
    analogy: 'O velocímetro do carro / A bitola do cano d\'água',
    meaning: 'Capacidade instantânea de realizar trabalho em um determinado segundo. É a taxa de fluxo elétrico demandada naquele exato momento.'
  },
  energy: {
    title: 'Energia (Wh, kWh, MWh, GWh, TWh)',
    analogy: 'O odômetro do carro / O volume de água dentro da caixa',
    meaning: 'O total acumulado ao longo do tempo. É a potência multiplicada pelo número de horas de uso (Energia = Potência × Tempo).'
  }
};

export const scaleLevels: ScaleLevel[] = [
  {
    unit: 'W',
    name: 'Watts',
    factor: '10⁰ W (1 Watt)',
    concept: 'Escala de componentes eletrônicos individuais e iluminação.',
    examples: [
      { item: 'Lâmpada LED', power: '10 W', description: 'Ilumina um cômodo inteiro consumindo 1/6 de uma antiga lâmpada incandescente.' },
      { item: 'Carregador de Smartphone', power: '20 W a 65 W', description: 'Carregador rápido moderno USB-C de celular ou notebook.' },
      { item: 'Notebook em Operação', power: '50 W a 100 W', description: 'Consumo típico em carga de trabalho de programação/estudo.' }
    ]
  },
  {
    unit: 'kW',
    name: 'Quilowatts',
    factor: '10³ W (1.000 Watts)',
    concept: 'Escala dos aparelhos domésticos pesados e do consumo residencial mensal.',
    examples: [
      { item: 'Geladeira Duplex Moderna', power: '0.15 kW (150 W)', description: 'Consome cerca de 35 a 50 kWh ao longo do mês ligando e desligando o compressor.' },
      { item: 'Ar-Condicionado Split 12.000 BTUs', power: '1.2 kW', description: 'Se ligado 8 horas por dia no verão, consome ~280 kWh no mês (quase uma conta inteira).' },
      { item: 'Chuveiro Elétrico no Inverno', power: '5.5 kW a 7.5 kW', description: 'O aparelho de maior potência instantânea em qualquer residência. 15 minutos de banho quente = 1.8 kWh.' },
      { item: 'Conta Média Residencial BR', power: '150 a 250 kWh/mês', description: 'Consumo de energia mensal acumulado de uma família típica brasileira no Grupo B.' }
    ]
  },
  {
    unit: 'MW',
    name: 'Megawatts',
    factor: '10⁶ W (1.000.000 Watts)',
    concept: 'Escala de indústrias, shoppings, fazendas solares e pequenas usinas.',
    examples: [
      { item: 'Supermercado de Médio Porte', power: '0.5 MW a 1.2 MW', description: 'Demanda contínua para câmaras frigoríficas, iluminação de salão e ar-condicionado central.' },
      { item: 'Shopping Center Médio', power: '3 MW a 8 MW', description: 'Equivalente à demanda de uma pequena cidade de 10 a 20 mil habitantes.' },
      { item: 'Usina Solar Fotovoltaica Típica (GD)', power: '2.5 MW a 5 MW', description: 'Fazenda solar com cerca de 5.000 a 10.000 painéis solares em solo.' },
      { item: 'Pequena Central Hidrelétrica (PCH)', power: '10 MW a 30 MW', description: 'Usina a fio d\'água que abastece microrregiões sem alagar grandes áreas.' }
    ]
  },
  {
    unit: 'GW',
    name: 'Gigawatts',
    factor: '10⁹ W (1.000.000.000 Watts)',
    concept: 'Escala de grandes usinas nacionais e da demanda total simultânea do Brasil.',
    examples: [
      { item: 'Central Nuclear Angra 2', power: '1.35 GW', description: 'A maior usina nuclear do Brasil, localizada em Angra dos Reis (RJ).' },
      { item: 'Usina Hidrelétrica Belo Monte (PA)', power: '11.23 GW', description: 'A maior usina 100% brasileira em capacidade instalada, no Rio Xingu.' },
      { item: 'Usina Binacional de Itaipu (BR/PY)', power: '14.00 GW', description: 'Com 20 turbinas de 700 MW cada. O Brasil tem direito a 7 GW e compra o excedente paraguaio.' },
      { item: 'Pico de Demanda do SIN (Brasil Inteiro)', power: '102 a 105 GW', description: 'Momento de consumo simultâneo mais alto da história do país (atingido em ondas de calor extremo).' }
    ]
  },
  {
    unit: 'TWh',
    name: 'Terawatts-hora',
    factor: '10¹² Wh (1.000.000.000.000 Wh)',
    concept: 'Escala de energia total gerada e consumida anualmente pelo país.',
    examples: [
      { item: 'Geração Anual de Itaipu', power: '~70 a 90 TWh/ano', description: 'Sozinha, Itaipu já gerou energia suficiente para abastecer o planeta inteiro por 40 dias.' },
      { item: 'Consumo Anual de Energia do Brasil (SIN)', power: '~530 a 560 TWh/ano', description: 'A soma de toda a eletricidade consumida por 215 milhões de habitantes e todas as indústrias em 365 dias.' },
      { item: 'Geração Eólica Anual Brasileira', power: '~80+ TWh/ano', description: 'O vento já produz mais energia anual no Brasil do que todo o consumo do estado do Rio de Janeiro.' }
    ]
  }
];
