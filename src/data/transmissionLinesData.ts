import type { TransmissionLineFeature } from './gridData';

export const majorTransmissionLines: TransmissionLineFeature[] = [
  {
    id: 'linha-belo-monte-rio',
    name: 'Bipolo 2 de Belo Monte (Xingu ➔ Terminal Rio)',
    voltageKV: 800,
    type: 'CC',
    lengthKm: 2543,
    from: 'SE Xingu (Anapu - PA)',
    to: 'SE Terminal Rio (Paracambi - RJ)',
    concessionaire: 'XRTE – Xingu Rio Transmissora (State Grid Brasil)',
    coordinates: [
      [-51.6300, -3.1700],
      [-49.8000, -6.5000],
      [-48.5000, -10.2000],
      [-47.8000, -14.5000],
      [-46.0000, -18.5000],
      [-44.2000, -21.5000],
      [-43.7100, -22.6100]
    ],
    sources: [
      { label: 'Wikipedia — Xingu-Rio HVDC transmission line', url: 'https://en.wikipedia.org/wiki/Xingu-Rio_HVDC_transmission_line' },
      { label: 'State Grid Brasil — Xingu-Rio completa cinco anos de operação', url: 'https://stategrid.com.br/en/mais-extenso-sistema-de-ultra-alta-tensao-brasileiro-linha-de-transmissao-xingu-rio-completa-cinco-anos-de-operacao/' },
      { label: 'NS Energy — Belo Monte-Rio de Janeiro UHVDC Transmission Project', url: 'https://www.nsenergybusiness.com/projects/belo-monte-rio-de-janeiro-uhvdc-transmission-project/' }
    ],
    technicalDetails: {
      converterTechnology: 'UHVDC ±800 kV LCC, 4.000 MW — segundo bipolo de escoamento de Belo Monte, inaugurado em agosto de 2019',
      towerCount: 4448,
      substations: ['SE Xingu (PA)', 'SE Terminal Rio (RJ)']
    }
  },
  {
    id: 'linha-belo-monte-estreito',
    name: 'Bipolo 1 de Belo Monte (Xingu ➔ Estreito)',
    voltageKV: 800,
    type: 'CC',
    lengthKm: 2076,
    from: 'SE Xingu (Anapu - PA)',
    to: 'SE Estreito (Ibiraci - MG)',
    concessionaire: 'BMTE – Belo Monte Transmissora (State Grid Brasil / Axia Energia)',
    coordinates: [
      [-51.6300, -3.1700],
      [-50.2000, -7.5000],
      [-49.0000, -11.5000],
      [-48.6000, -15.8000],
      [-47.9000, -18.8000],
      [-47.1200, -20.4600]
    ],
    sources: [
      { label: 'Wikipedia — Xingu-Estreito HVDC transmission line', url: 'https://en.wikipedia.org/wiki/Xingu-Estreito_HVDC_transmission_line' },
      { label: 'BMTE — Quem somos', url: 'https://bmte.com.br/quem-somos/' },
      { label: 'BMTE — Primeiro bipolo ±800 kV entra em operação', url: 'https://bmte.com.br/2017/12/14/primeiro-bipolo-de-transmissao-de-%c2%b1800-kv-uhvdc-entra-em-operacao-com-dois-meses-de-antecedencia/' }
    ],
    technicalDetails: {
      converterTechnology: 'UHVDC ±800 kV LCC, 4.000 MW — primeiro bipolo de Belo Monte, em operação comercial desde dezembro de 2017',
      substations: ['SE Xingu (PA)', 'SE Estreito (MG)']
    }
  },
  {
    id: 'linha-madeira-sp',
    name: 'Bipolos 1 e 2 do Madeira (Porto Velho ➔ Araraquara 2)',
    voltageKV: 600,
    type: 'CC',
    lengthKm: 2385,
    from: 'SE Coletora Porto Velho (Porto Velho - RO)',
    to: 'SE Araraquara 2 (Araraquara - SP)',
    concessionaire: 'IE Madeira (ISA Energia Brasil) — bipolo 1 / NBTE (Evoltz) — linha do bipolo 2',
    coordinates: [
      [-63.9000, -8.8000],
      [-60.5000, -11.8000],
      [-56.0000, -14.5000],
      [-52.5000, -18.2000],
      [-49.0000, -20.8000],
      [-48.1800, -21.7900]
    ],
    sources: [
      { label: 'ISA Energia Brasil — Interligação Elétrica do Madeira', url: 'https://www.isaenergiabrasil.com.br/transicao-energetica/nossos-projetos/interligacao-eletrica-madeira/' },
      { label: 'Wikipedia — Rio Madeira HVDC system', url: 'https://en.wikipedia.org/wiki/Rio_Madeira_HVDC_system' },
      { label: 'Norte Brasil Transmissora — Demonstrações financeiras 2024', url: 'https://publicidadelegal.monitormercantil.com.br/wp-content/uploads/2025/04/Norte-Brasil-Transmissora-de-Energia-S.A.-Balanco-2024-1.pdf' },
      { label: 'LexLatin — Ontario Teachers\' consolida a Norte Brasil Transmissora', url: 'https://lexlatin.com/noticias/ontario-teachers-pension-pan-norte-brasil-transmissora-de-energia' }
    ],
    technicalDetails: {
      converterTechnology: 'HVDC ±600 kV LCC, 2 bipolos de 3.150 MW. Linha do bipolo 1 (IE Madeira): 2.385 km e 4.919 torres; linha do bipolo 2 (NBTE): 2.411 km. Em Porto Velho, 2 conversoras back-to-back somam 800 MW para o sistema local de 230 kV',
      substations: ['SE Coletora Porto Velho', 'SE Araraquara 2']
    }
  },
  {
    id: 'linha-itaipu-sp',
    name: 'Tronco de Itaipu em 765 kV (Foz do Iguaçu ➔ Ivaiporã ➔ Itaberá ➔ Tijuco Preto)',
    voltageKV: 765,
    type: 'CA',
    lengthKm: 900,
    from: 'SE Foz do Iguaçu (Foz do Iguaçu - PR)',
    to: 'SE Tijuco Preto (Mogi das Cruzes - SP)',
    concessionaire: 'Axia Energia (ex-Eletrobras Furnas)',
    coordinates: [
      [-54.5889, -25.4083],
      [-51.6800, -24.2500],
      [-49.1400, -23.8600],
      [-47.5000, -23.7500],
      [-46.1300, -23.6000]
    ],
    sources: [
      { label: 'Furnas — A Subestação de Tijuco Preto completa 37 anos', url: 'https://www.furnas.com.br/noticia/103/noticias/1296/a-subestacao-de-tijuco-preto-completa-37-anos-de-operacao' },
      { label: 'Wikipedia — HVDC Itaipu', url: 'https://en.wikipedia.org/wiki/HVDC_Itaipu' },
      { label: 'Furnas — Recorde de transmissão de energia', url: 'https://www.furnas.com.br/subsecao/439' }
    ],
    technicalDetails: {
      converterTechnology: '765 kV CA em 3 circuitos — escoa a geração de 60 Hz do setor brasileiro de Itaipu; em Ivaiporã, a transformação 765/500 kV acopla o tronco ao subsistema Sul',
      substations: ['SE Foz do Iguaçu', 'SE Ivaiporã', 'SE Itaberá', 'SE Tijuco Preto']
    }
  },
  {
    id: 'linha-interligacao-ne-se',
    name: 'Interligação Sudeste–Nordeste (Serra da Mesa ➔ Bom Jesus da Lapa II ➔ Sapeaçu)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1050,
    from: 'SE Serra da Mesa (GO)',
    to: 'SE Sapeaçu (Governador Mangabeira - BA)',
    concessionaire: 'Taesa',
    coordinates: [
      [-48.3100, -13.8300],
      [-44.6400, -13.4000],
      [-43.4200, -13.2500],
      [-41.3000, -13.2000],
      [-39.3000, -12.6200]
    ],
    sources: [
      { label: 'Taesa — Estatuto social (descrição das concessões)', url: 'https://ri.taesa.com.br/en/corporate-governance/bylaws/' },
      { label: 'ONS — MOP 090-S-2021 (trecho 500 kV Rio das Éguas)', url: 'https://www.ons.org.br//MPO2/Mensagem%20Operativa/Sist%C3%AAmica/CNOS/MOP-ONS%20090-S-2021.pdf' }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — fechou o anel de transmissão Norte–Nordeste–Sudeste; em Bom Jesus da Lapa II, a transformação 500/230 kV acopla a malha regional da Bahia',
      substations: ['SE Serra da Mesa', 'SE Rio das Éguas (Correntina)', 'SE Bom Jesus da Lapa II', 'SE Ibicoara (Mucugê)', 'SE Sapeaçu (Governador Mangabeira)']
    }
  },
  {
    id: 'linha-tucurui-manaus',
    name: 'Linhão de Tucuruí (Tucuruí ➔ Jurupari ➔ Oriximiná ➔ Manaus, com ramal para Macapá)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1800,
    from: 'SE Tucuruí (PA)',
    to: 'SE Engenheiro Lechuga (Manaus - AM)',
    concessionaire: 'LXTE e LMTE (Energisa) / MTE (Evoltz)',
    coordinates: [
      [-49.6469, -3.8328],
      [-51.6300, -3.1700],
      [-52.4500, -1.2000],
      [-55.8700, -1.7600],
      [-58.2000, -2.8400],
      [-60.0500, -3.1000]
    ],
    sources: [
      { label: 'Wikipedia — Linhão de Tucuruí', url: 'https://pt.wikipedia.org/wiki/Linh%C3%A3o_de_Tucuru%C3%AD' },
      { label: 'Wikipedia — Tucuruí transmission line', url: 'https://en.wikipedia.org/wiki/Tucuru%C3%AD_transmission_line' },
      { label: 'MegaWhat — Energisa conclui aquisição da Gemini Energy', url: 'https://megawhat.energy/news/146695/energisa-conclui-aquisicao-de-transmissora-do-apagao-do-amapa-por-r-8225-milhoes' },
      { label: 'CanalEnergia — Eletrobras conclui venda da Manaus Transmissora para Evoltz', url: 'https://www.canalenergia.com.br/noticias/53146295/eletrobras-conclui-venda-de-participacao-na-manaus-transmissora-para-evoltz' }
    ],
    technicalDetails: {
      converterTechnology: 'Circuito duplo 500 kV (ramal de Macapá em 230 kV). Trechos: Tucuruí–Xingu–Jurupari (LXTE, 527 km), Oriximiná–Jurupari–Macapá (LMTE, 713 km), Oriximiná–Silves–Lechuga (MTE, 558 km). Travessia do Rio Amazonas em Almeirim (PA) com torres de cerca de 295 m',
      substations: ['SE Tucuruí', 'SE Xingu', 'SE Jurupari', 'SE Oriximiná', 'SE Silves', 'SE Engenheiro Lechuga', 'SE Macapá']
    }
  },
  {
    id: 'linha-norte-nordeste',
    name: 'Interligação Norte–Nordeste (Sobradinho ➔ Imperatriz)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1000,
    from: 'SE Sobradinho (BA)',
    to: 'SE Imperatriz (MA)',
    concessionaire: 'Chesf / Eletronorte (Axia Energia)',
    coordinates: [
      [-40.8300, -9.4300],
      [-42.2000, -8.4000],
      [-43.0000, -7.0000],
      [-44.4900, -5.2900],
      [-47.4900, -5.5300]
    ],
    sources: [
      { label: 'Memória da Eletricidade — Chesf', url: 'https://memoriadaeletricidade.com.br/acervo/2068/chesf' },
      { label: 'Memória da Eletricidade — Eletronorte 50 anos', url: 'https://memoriadaeletricidade.com.br/blog/125160/eletronorte-50-anos-conheca-essa-historia' }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — linha de extra-alta tensão da Chesf, inaugurada em 1981 e complementada por linhas da Eletronorte, que passou a permitir o intercâmbio entre os subsistemas Norte e Nordeste'
    }
  },
  {
    id: 'linha-manaus-boavista',
    name: 'Linhão Manaus ➔ Boa Vista (Transnorte)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 715,
    from: 'SE Engenheiro Lechuga (Manaus - AM)',
    to: 'SE Boa Vista (RR)',
    concessionaire: 'Transnorte Energia (Alupar / Axia Energia)',
    coordinates: [
      [-60.0500, -3.1000],
      [-60.0200, -2.0500],
      [-60.4300, 0.9400],
      [-60.6700, 2.8200]
    ],
    sources: [
      { label: 'Canal Solar — Linhão Manaus–Boa Vista conecta Roraima ao SIN', url: 'https://canalsolar.com.br/linhao-manaus-boa-vista-conecta-roraima-sin/' },
      { label: 'CanalEnergia — Ibama emite licença para o Linhão Manaus-Boa Vista', url: 'https://www.canalenergia.com.br/noticias/53188715/ibama-emite-licenca-para-o-linhao-manaus-boa-vista' },
      { label: 'Agência Brasil — Linhão conecta Roraima ao sistema interligado', url: 'https://agenciabrasil.ebc.com.br/radioagencia-nacional/politica/audio/2025-09/linhao-conecta-capital-de-roraima-ao-sistema-interligado-de-energia' }
    ],
    technicalDetails: {
      converterTechnology: 'Circuito duplo 500 kV — energizado em setembro de 2025, encerrou o isolamento elétrico de Roraima, último estado fora do SIN',
      substations: ['SE Engenheiro Lechuga', 'SE Equador', 'SE Boa Vista']
    }
  },
  {
    id: 'linha-acre-rondonia',
    name: 'Interligação Acre–Rondônia, 3º circuito (Porto Velho ➔ Abunã ➔ Rio Branco)',
    voltageKV: 230,
    type: 'CA',
    lengthKm: 493,
    from: 'SE Porto Velho (RO)',
    to: 'SE Rio Branco I (AC)',
    concessionaire: 'EDP Transmissão Norte / EDP Transmissão Norte 2',
    coordinates: [
      [-63.9000, -8.7600],
      [-65.3600, -9.7000],
      [-67.8100, -9.9700]
    ],
    sources: [
      { label: 'Diário do Acre — inauguração do terceiro linhão', url: 'https://diariodoacre.com.br/governo-do-acre-se-junta-a-operadora-internacional-de-energia-para-inaugurar-obra-historica-no-estado/' },
      { label: 'BNamericas — Lote 1: LT Abunã – Rio Branco C3', url: 'https://www.bnamericas.com/en/project-profile/lot-1-abuna---rio-branco-acre-transmission-line' }
    ],
    technicalDetails: {
      converterTechnology: '230 kV CA — terceiro circuito de suprimento ao Acre, inaugurado em março de 2025: Porto Velho–Abunã (188 km) e Abunã–Rio Branco I (305 km)',
      substations: ['SE Porto Velho', 'SE Abunã', 'SE Rio Branco I', 'SE Tucumã']
    }
  },
  {
    id: 'linha-brasil-argentina',
    name: 'Interligação Brasil–Argentina (Conversora Garabi ➔ Santo Ângelo ➔ Itá)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 743,
    from: 'Conversora Garabi (Garruchos - RS)',
    to: 'SE Itá (SC)',
    concessionaire: 'Taesa (desde 2023; antes Enel Cien)',
    coordinates: [
      [-55.6400, -28.1800],
      [-54.2600, -28.3000],
      [-53.3000, -27.8000],
      [-52.3500, -27.2800]
    ],
    sources: [
      { label: 'ISTOÉ Dinheiro — Taesa vence lote 5 do Leilão de Transmissão 2/2022', url: 'https://istoedinheiro.com.br/taesa-vence-disputa-por-lote-5-em-leilao-ao-oferecer-lance-com-desagio-de-3421' },
      { label: 'Jornal do Comércio — Modernização da conversora de Garruchos', url: 'https://www.jornaldocomercio.com/economia/2024/01/1138959-modernizacao-de-conversora-de-energia-em-garruchos-sera-adiantada.html' },
      { label: 'ONS — Acompanhamento mensal dos intercâmbios internacionais (dez/2019)', url: 'https://www.ons.org.br/AcervoDigitalDocumentosEPublicacoes/Relatorio_Intercambio_Internacional_12%2019.pdf' }
    ],
    technicalDetails: {
      converterTechnology: 'Conversoras back-to-back 50/60 Hz Garabi I e II (4 × 550 MW = 2.200 MW) em Garruchos; 743 km de LTs 525 kV somando os dois circuitos até Itá, seccionados em Santo Ângelo',
      substations: ['Conversora Garabi', 'SE Santo Ângelo', 'SE Itá']
    }
  },
  {
    id: 'bipolo-itaipu-ibiuna',
    name: 'Bipolos de Itaipu HVDC (Foz do Iguaçu ➔ Ibiúna)',
    voltageKV: 600,
    type: 'CC',
    lengthKm: 807,
    from: 'Conversora Foz do Iguaçu (Foz do Iguaçu - PR)',
    to: 'Conversora Ibiúna (Ibiúna - SP)',
    concessionaire: 'Axia Energia (ex-Eletrobras Furnas)',
    coordinates: [
      [-54.5889, -25.4083],
      [-52.5000, -24.8000],
      [-49.8000, -24.0000],
      [-47.1050, -23.6670]
    ],
    sources: [
      { label: 'Wikipedia — HVDC Itaipu', url: 'https://en.wikipedia.org/wiki/HVDC_Itaipu' },
      { label: 'MME — Revitalização do sistema de transmissão de Itaipu', url: 'https://www.gov.br/mme/pt-br/a-revolucao-brasileira-em-energia-e-mineracao/transicao-energetica-e-planejamento/revitalizacao-do-sistema-de-transmissao-de-energia-de-itaipu' }
    ],
    technicalDetails: {
      converterTechnology: 'HVDC ±600 kV LCC, 2 bipolos de 3.150 MW em linhas de 807 e 818 km — retifica os 50 Hz das unidades do setor paraguaio de Itaipu e entrega 60 Hz em Ibiúna (345 e 500 kV)',
      substations: ['Conversora Foz do Iguaçu', 'Conversora Ibiúna']
    }
  },
  {
    id: 'linha-norte-sul-500',
    name: 'Interligação Norte–Sul, circuito 1 (Imperatriz ➔ Serra da Mesa ➔ Samambaia)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1276,
    from: 'SE Imperatriz (MA)',
    to: 'SE Samambaia (DF)',
    concessionaire: 'Eletronorte / Furnas (Axia Energia)',
    coordinates: [
      [-47.4900, -5.5300],
      [-48.4700, -8.0500],
      [-48.3900, -9.5700],
      [-49.0700, -11.7300],
      [-48.3100, -13.8300],
      [-48.0800, -15.8700]
    ],
    sources: [
      { label: 'Wikipedia — Linhão Norte-Sul', url: 'https://pt.wikipedia.org/wiki/Linh%C3%A3o_Norte-Sul' },
      { label: 'Memória da Eletricidade — Eletronorte 50 anos', url: 'https://memoriadaeletricidade.com.br/blog/125160/eletronorte-50-anos' }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — primeiro circuito da Interligação Norte–Sul, em operação desde março de 1999; uniu os sistemas Norte/Nordeste e Sul/Sudeste/Centro-Oeste',
      substations: ['SE Imperatriz', 'SE Colinas', 'SE Miracema', 'SE Gurupi', 'SE Serra da Mesa', 'SE Samambaia']
    }
  },
  {
    id: 'linha-telespires-seco',
    name: 'Linhão Teles Pires (Paranaíta ➔ Cláudia ➔ Paranatinga ➔ Ribeirãozinho)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 1005,
    from: 'SE Paranaíta (MT)',
    to: 'SE Ribeirãozinho (MT)',
    concessionaire: 'Matrinchã Transmissora (State Grid Brasil / Copel GeT)',
    coordinates: [
      [-56.4800, -9.6600],
      [-54.8800, -11.5000],
      [-54.0500, -14.4300],
      [-52.6900, -16.4800]
    ],
    sources: [
      { label: 'Matrinchã Transmissora — Informações intermediárias 3T2025', url: 'https://tplt.com.br/wp-content/uploads/2025/11/MTE-DF-3ITR-2025.pdf' },
      { label: 'Alstom — contrato do projeto de transmissão Teles Pires', url: 'https://www.alstom.com/press-releases-news/2013/8/alstom-signs-contract-for-teles-pires-transmission-project-in-brazil-' }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA — escoa as hidrelétricas do Rio Teles Pires até o SIN, atravessando o Mato Grosso',
      substations: ['SE Paranaíta', 'SE Cláudia', 'SE Paranatinga', 'SE Ribeirãozinho']
    }
  },
  {
    id: 'linha-gracaaranha-silvania',
    name: 'Bipolo Graça Aranha ➔ Silvânia (em construção)',
    voltageKV: 800,
    type: 'CC',
    lengthKm: 1468,
    from: 'SE Graça Aranha (MA)',
    to: 'SE Silvânia (GO)',
    concessionaire: 'GATE – Graça Aranha Transmissora de Energia (State Grid Brasil)',
    coordinates: [
      [-44.3400, -5.4100],
      [-46.0000, -7.5000],
      [-47.2000, -10.5000],
      [-47.8000, -13.5000],
      [-48.6100, -16.6600]
    ],
    sources: [
      { label: 'Wikipedia — Linha de Transmissão Graça Aranha–Silvânia', url: 'https://pt.wikipedia.org/wiki/Linha_de_Transmiss%C3%A3o_Gra%C3%A7a_Aranha%E2%80%93Silv%C3%A2nia' },
      { label: 'EPE — Relatório R2: Elo CC ±800 kV Graça Aranha – Silvânia', url: 'https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-276/topico-674/EPE-DEE-RE-092-2022-rev1%20-%20R2%20Bipolo%20Gra%C3%A7a%20Aranha%20-%20Silv%C3%A2nia.pdf' },
      { label: 'BNamericas — Bipolo Graça Aranha – Silvânia (Lote 1)', url: 'https://www.bnamericas.com/en/project-profile/lot-1-maranhao---tocantins---goias-transmission-line' },
      { label: 'Click Petróleo e Gás — projeto de 1.468 km', url: 'https://en.clickpetroleoegas.com.br/o-maior-projeto-de-transmissao-de-energia-do-brasil-tem-1-468-km-de-extensao-e-um-investimento-de-r-23-bilhoes-mhbb01/' }
    ],
    technicalDetails: {
      converterTechnology: 'UHVDC ±800 kV LCC, 5.000 MW — Lote 1 do Leilão de Transmissão 2/2023 (dezembro de 2023), para escoar excedentes eólicos e solares do Nordeste ao Centro-Oeste/Sudeste; entrada em operação prevista a partir de 2029',
      substations: ['SE Graça Aranha (MA)', 'SE Silvânia (GO)']
    }
  },
  {
    id: 'linha-porto-sergipe-jardim',
    name: 'LT 500 kV UTE Porto de Sergipe I ➔ Jardim',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 34,
    from: 'UTE Porto de Sergipe I (Barra dos Coqueiros - SE)',
    to: 'SE Jardim (Nossa Senhora do Socorro - SE)',
    concessionaire: 'São Francisco Transmissão de Energia',
    coordinates: [
      [-36.9800, -10.8000],
      [-37.0500, -10.8800],
      [-37.1300, -10.8600]
    ],
    sources: [
      { label: 'CanalEnergia — GE conclui LT de 34 km na Termelétrica Porto de Sergipe I', url: 'https://www.canalenergia.com.br/noticias/53097467/ge-conclui-lt-de-34-km-na-termeletrica-porto-de-sergipe-i' },
      { label: 'Jornal do Dia — LT 500 kV UTE Porto Sergipe I – SE Jardim', url: 'https://jornaldodiase.com.br/saiba-mais-sobre-a-linha-de-transmissao-500-kv-ute-porto-sergipe-i-se-jardim-da-sao-francisco-transmissao-de-energia-2/' },
      { label: 'Wikipedia — Usina Termoelétrica Porto de Sergipe I', url: 'https://pt.wikipedia.org/wiki/Usina_Termoel%C3%A9trica_Porto_de_Sergipe_I' }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA em dois circuitos independentes — conecta a termelétrica a gás natural de ~1,5 GW (Eneva, ex-Celse) à SE Jardim da Chesf',
      towerCount: 80,
      substations: ['SE UTE Porto de Sergipe I', 'SE Jardim']
    }
  },
  {
    id: 'linha-extremo-sul-gaucho',
    name: 'Tronco Litoral Sul Gaúcho (Nova Santa Rita ➔ Povo Novo ➔ Marmeleiro ➔ Santa Vitória do Palmar)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 487,
    from: 'SE Santa Vitória do Palmar (RS)',
    to: 'SE Nova Santa Rita (RS)',
    concessionaire: 'CGT Eletrosul (Axia Energia) — ativos da ex-TSLE',
    coordinates: [
      [-53.3700, -33.5200],
      [-53.0500, -33.0500],
      [-52.6000, -32.5500],
      [-52.2500, -31.9900],
      [-52.3500, -31.5000],
      [-51.8500, -30.8000],
      [-51.4500, -30.2000],
      [-51.2800, -29.8600]
    ],
    sources: [
      { label: 'CanalEnergia — Eletrosul conclui incorporação de ativos da TSLE', url: 'https://www.canalenergia.com.br/noticias/53207609/eletrosul-conclui-incorporacao-de-ativos-da-tsle' },
      { label: 'Governo do RS — LT Nova Santa Rita-Povo Novo recebe licença de instalação', url: 'https://estado.rs.gov.br/linha-de-transmissao-nova-santa-rita-povo-novo-recebe-licenca-de-instalacao' },
      { label: 'BNamericas — Nova Santa Rita-Povo Novo-Marmeleiro-Santa Vitória do Palmar', url: 'https://www.bnamericas.com/en/project-profile/nova-santa-rita-povo-novo-marmeleiro-santa-vitoria-do-palmar-transmission-line' }
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA — Nova Santa Rita–Povo Novo (281 km), Povo Novo–Marmeleiro (154 km, com 15 km na Estação Ecológica do Taim) e Marmeleiro–Santa Vitória do Palmar (52 km); escoa a geração eólica do extremo sul gaúcho',
      substations: ['SE Santa Vitória do Palmar', 'SE Marmeleiro', 'SE Povo Novo', 'SE Nova Santa Rita']
    }
  }
];
