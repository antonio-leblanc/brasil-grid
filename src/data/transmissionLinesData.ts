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
  },
  {
    id: 'linha-jurupari-macapa',
    name: 'Tronco Jurupari ➔ Laranjal do Jari ➔ Macapá (Travessia do Amazonas)',
    voltageKV: 230,
    type: 'CA',
    lengthKm: 349,
    from: 'SE Jurupari (Almeirim - PA)',
    to: 'SE Macapá (Macapá - AP)',
    concessionaire: 'LMTE – Linhas de Macapá Transmissora (Energisa)',
    coordinates: [
      [-52.4500, -1.2000],
      [-52.5100, -0.8400],
      [-51.0600, 0.0400]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '230 kV CA circuito duplo com vãos estaiados na travessia dos rios Amazonas e Jari. Composta por LT 230 kV Jurupari / Laranjal (105,0 km, cod: PAJRP-2LAL-1AP) e LT 230 kV Laranjal / Macapá (244,0 km, cod: APLAL-2MCP-1).',
      substations: ['SE Jurupari (PA)', 'SE Laranjal (AP)', 'SE Macapá (AP)']
    }
  },
  {
    id: 'linha-tucurui-vila-do-conde',
    name: 'Tronco Tucuruí ➔ Vila do Conde (Barcarena)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 328.7,
    from: 'SE Tucuruí (Tucuruí - PA)',
    to: 'SE Vila do Conde (Barcarena - PA)',
    concessionaire: 'Axia Norte (Eletronorte) / ETEP / VCTE',
    coordinates: [
      [-49.6469, -3.8328],
      [-48.7700, -2.0000],
      [-48.7200, -1.5400]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA em três circuitos (C1 328,7 km Axia Norte, C2 323,95 km ETEP, C3 324,0 km VCTE). Escoa energia da UHE Tucuruí para o polo eletrointensivo de alumínio de Barcarena e Grande Belém.',
      substations: ['SE Tucuruí (PA)', 'SE Vila do Conde (PA)']
    }
  },
  {
    id: 'linha-tucurui-maraba-imperatriz',
    name: 'Tronco Tucuruí ➔ Marabá ➔ Imperatriz (Interligação N–NE)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 405.5,
    from: 'SE Tucuruí (PA)',
    to: 'SE Imperatriz (MA)',
    concessionaire: 'Axia Norte (Eletronorte) / EATE / ENTE',
    coordinates: [
      [-49.6469, -3.8328],
      [-49.1200, -5.3600],
      [-47.4900, -5.5300]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA interligando Norte e Nordeste. Segmentos: LT 500 kV Marabá / Tucuruí C1 (223,3 km, cod: PAMB--5TC--1) e LT 500 kV Imperatriz / Marabá C1 (182,2 km, cod: MAIZ--5MB--1PA).',
      substations: ['SE Tucuruí (PA)', 'SE Marabá (PA)', 'SE Imperatriz (MA)']
    }
  },
  {
    id: 'linha-xingu-tucurui',
    name: 'Tronco de Acoplamento 500 kV Xingu ➔ Tucuruí',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 265,
    from: 'SE Xingu (Anapu - PA)',
    to: 'SE Tucuruí (Tucuruí - PA)',
    concessionaire: 'LXTE – Leilão Xingu Transmissora (State Grid)',
    coordinates: [
      [-51.6300, -3.1700],
      [-49.6469, -3.8328]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA circuito duplo (265,0 km cada, cod: PATC--5XIN-1 e PATC--5XIN-2). Eixo estruturante de acoplamento hidroelétrico entre as UHEs Belo Monte (Rio Xingu) e Tucuruí (Rio Tocantins).',
      substations: ['SE Xingu (PA)', 'SE Tucuruí (PA)']
    }
  },
  {
    id: 'linha-itaipu-ivaipora-765',
    name: 'Tronco 765 kV Itaipu — Eixo 1 (Foz do Iguaçu ➔ Ivaiporã)',
    voltageKV: 765,
    type: 'CA',
    lengthKm: 322,
    from: 'SE Foz do Iguaçu 60 Hz (PR)',
    to: 'SE Ivaiporã (PR)',
    concessionaire: 'Axia Energia (Furnas)',
    coordinates: [
      [-54.5889, -25.4083],
      [-53.4500, -24.9500],
      [-51.6800, -24.2500]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '765 kV CA circuito triplo (C1 322,0 km, C2 323,0 km, C3 339,0 km, cod: PRSTIV7STF61). Maior nível de tensão alternada do Brasil, escoando os geradores de 60 Hz de Itaipu Binacional.',
      substations: ['SE Foz do Iguaçu 60Hz (PR)', 'SE Ivaiporã (PR)']
    }
  },
  {
    id: 'linha-ivaipora-itabera-765',
    name: 'Tronco 765 kV Itaipu — Eixo 2 (Ivaiporã ➔ Itaberá)',
    voltageKV: 765,
    type: 'CA',
    lengthKm: 265,
    from: 'SE Ivaiporã (PR)',
    to: 'SE Itaberá (SP)',
    concessionaire: 'Axia Energia (Furnas)',
    coordinates: [
      [-51.6800, -24.2500],
      [-50.4000, -24.0500],
      [-49.1400, -23.8600]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '765 kV CA circuito triplo (C1 265,0 km, C2 264,0 km, C3 272,0 km, cod: SPSTIA7STIV1PR). Transpõe a divisa PR/SP transportando a potência da calha de Itaipu para o anel de carga paulista.',
      substations: ['SE Ivaiporã (PR)', 'SE Itaberá (SP)']
    }
  },
  {
    id: 'linha-itabera-tijuco-preto-765',
    name: 'Tronco 765 kV Itaipu — Eixo 3 (Itaberá ➔ Tijuco Preto)',
    voltageKV: 765,
    type: 'CA',
    lengthKm: 305,
    from: 'SE Itaberá (SP)',
    to: 'SE Tijuco Preto (Mogi das Cruzes - SP)',
    concessionaire: 'Axia Energia (Furnas)',
    coordinates: [
      [-49.1400, -23.8600],
      [-47.4500, -23.5000],
      [-46.1300, -23.6000]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '765 kV CA circuito triplo (C1 305,0 km, C2 304,0 km, C3 312,0 km, cod: SPSTIA7STTP1). Alimenta o centro de gravidade da Grande São Paulo e Vale do Paraíba.',
      substations: ['SE Itaberá (SP)', 'SE Tijuco Preto (SP)']
    }
  },
  {
    id: 'linha-ilha-solteira-araraquara',
    name: 'Tronco Paulista 440 kV (Ilha Solteira ➔ Araraquara)',
    voltageKV: 440,
    type: 'CA',
    lengthKm: 375.9,
    from: 'SE Ilha Solteira (SP)',
    to: 'SE Araraquara CTP (SP)',
    concessionaire: 'ISA Energia Brasil (ISA CTEEP)',
    coordinates: [
      [-51.3500, -20.4300],
      [-49.5200, -20.8200],
      [-48.1800, -21.7900]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '440 kV CA em circuito duplo (C1 375,9 km e C2 375,9 km, cod: SPILS-4ARA-1 e SPILS-4ARA-2). Espinha dorsal do sistema CESP escoando a UHE Ilha Solteira (3.444 MW).',
      substations: ['SE Ilha Solteira (SP)', 'SE Araraquara CTP (SP)']
    }
  },
  {
    id: 'linha-araraquara-bauru-embu-guacu',
    name: 'Anel Paulista 440 kV (Araraquara ➔ Bauru ➔ Embu-Guaçu)',
    voltageKV: 440,
    type: 'CA',
    lengthKm: 409.7,
    from: 'SE Araraquara CTP (SP)',
    to: 'SE Embu-Guaçu (SP)',
    concessionaire: 'ISA Energia Brasil (ISA CTEEP)',
    coordinates: [
      [-48.1800, -21.7900],
      [-49.0700, -22.3100],
      [-48.4400, -22.8800],
      [-46.8100, -23.8300]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '440 kV CA integrando o interior paulista à Grande São Paulo. Composta por LT 440 kV Bauru / Araraquara CTP (103,7 km, cod: SPBAU-4ARA-1) e LT 440 kV Bauru / Embu-Guaçu C-1 (305,97 km, cod: SPBAU-4EMG-1).',
      substations: ['SE Araraquara CTP (SP)', 'SE Bauru (SP)', 'SE Embu-Guaçu (SP)']
    }
  },
  {
    id: 'linha-jupia-bauru-440',
    name: 'Tronco 440 kV Rio Paraná (Jupiá ➔ Bauru)',
    voltageKV: 440,
    type: 'CA',
    lengthKm: 312,
    from: 'SE Jupiá (Castilho - SP)',
    to: 'SE Bauru (Bauru - SP)',
    concessionaire: 'ISA Energia Brasil (ISA CTEEP)',
    coordinates: [
      [-51.6700, -20.7800],
      [-50.4400, -21.2000],
      [-49.0700, -22.3100]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '440 kV CA circuito duplo (C1 312,0 km e C2 312,0 km, cod: SPJUP-4BAU-1 e SPJUP-4BAU-2). Escoa a geração da UHE Engenheiro Souza Dias / Jupiá (1.551 MW) na foz do Rio Tietê.',
      substations: ['SE Jupiá (SP)', 'SE Bauru (SP)']
    }
  },
  {
    id: 'linha-porto-primavera-assis',
    name: 'Tronco Porto Primavera ➔ Taquaruçu ➔ Assis (440 kV)',
    voltageKV: 440,
    type: 'CA',
    lengthKm: 286.6,
    from: 'SE Porto Primavera (Rosana - SP)',
    to: 'SE Assis (SP)',
    concessionaire: 'ISA Energia Brasil (ISA CTEEP) / Taesa',
    coordinates: [
      [-52.9500, -22.4800],
      [-50.4100, -22.6600],
      [-49.9800, -22.8900],
      [-46.9500, -22.4300]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '440 kV CA conectando a UHE Porto Primavera (1.540 MW) e UHE Taquaruçu à SE Assis. Composta por LT 440 kV P. Primavera / Taquaruçu C1 (113,2 km, cod: SPPPR-4TAQ-1) e LT 440 kV Taquaruçu / Assis C1 (173,35 km, cod: SPTAQ-4ASS-1).',
      substations: ['SE Porto Primavera (SP)', 'SE Taquaruçu (SP)', 'SE Assis (SP)']
    }
  },
  {
    id: 'linha-sao-joao-piaui-milagres',
    name: 'Interligação 500 kV Piauí ➔ Ceará (São João do Piauí ➔ Milagres)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 400,
    from: 'SE São João do Piauí (PI)',
    to: 'SE Milagres (CE)',
    concessionaire: 'Iracema Transmissora (Taesa)',
    coordinates: [
      [-42.2500, -8.3600],
      [-41.4600, -7.0700],
      [-38.9400, -7.3100]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA com 400,0 km de extensão (cod: PISJI-5MLG-1CE). Corredor fundamental para transferir os excedentes eólicos e solares do sul do Piauí diretamente ao nó estratégico de Milagres.',
      substations: ['SE São João do Piauí (PI)', 'SE Milagres (CE)']
    }
  },
  {
    id: 'linha-gilbues-sao-joao-piaui',
    name: 'Coletora Solar 500 kV Gilbués ➔ São João do Piauí',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 413,
    from: 'SE Gilbués II (PI)',
    to: 'SE São João do Piauí (PI)',
    concessionaire: 'SJTE – São João Transmissora de Energia',
    coordinates: [
      [-45.3400, -9.8300],
      [-44.3000, -10.0300],
      [-42.2500, -8.3600]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA com 413,0 km de extensão (cod: PIGBD-5SJI-1). Drena a geração centralizada do polo solar fotovoltaico de São Gonçalo do Gurguéia e complexos adjacentes.',
      substations: ['SE Gilbués II (PI)', 'SE São João do Piauí (PI)']
    }
  },
  {
    id: 'linha-barreiras-rio-das-eguas',
    name: 'Tronco 500 kV Oeste Baiano (Barreiras II ➔ Rio das Éguas)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 239.3,
    from: 'SE Barreiras II (BA)',
    to: 'SE Rio das Éguas (Correntina - BA)',
    concessionaire: 'PTE – Paranaíba Transmissora de Energia / Barreiras Transmissora',
    coordinates: [
      [-44.9900, -12.1500],
      [-44.6400, -13.4000]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA em circuito duplo (C1 239,27 km e C2 251,0 km, cod: BABRD-5RDE-1 e BABRD-5RDE-2). Artéria da interligação do MATOPIBA com os troncos de escoamento para o Sudeste.',
      substations: ['SE Barreiras II (BA)', 'SE Rio das Éguas (BA)']
    }
  },
  {
    id: 'linha-pocoes-padre-paraiso-gov-valadares',
    name: 'Interligação 500 kV NE–SE (Poções III ➔ Padre Paraíso 2 ➔ Gov. Valadares 6)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 537,
    from: 'SE Poções III (BA)',
    to: 'SE Governador Valadares 6 (MG)',
    concessionaire: 'Paraíso TPE / IE Aimorés / IE Paraguaçu',
    coordinates: [
      [-40.3700, -14.5300],
      [-41.4800, -17.0700],
      [-41.9400, -18.8500]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA estruturante da Fronteira NE-SECO. Composta por LT 500 kV Pe. Paraíso 2 / Poções III (334,0 km, cod: MGPPA25POD-1BA) e LT 500 kV G. Valadares 6 / Pe. Paraíso 2 (203,0 km, cod: MGGVA65PPA21).',
      substations: ['SE Poções III (BA)', 'SE Pe. Paraíso 2 (MG)', 'SE Governador Valadares 6 (MG)']
    }
  },
  {
    id: 'linha-gov-valadares-mutum-rio',
    name: 'Corredor Leste 500 kV (Gov. Valadares 6 ➔ Mutum ➔ Terminal Rio)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 428.4,
    from: 'SE Governador Valadares 6 (MG)',
    to: 'SE Terminal Rio (Paracambi - RJ)',
    concessionaire: 'TCC Caminho do Café / SPE Linha Verde / MGE Transmissão',
    coordinates: [
      [-41.9400, -18.8500],
      [-41.4400, -20.0300],
      [-41.3300, -21.7500],
      [-43.7100, -22.6100]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA integrando o leste de Minas ao Rio de Janeiro. Segmentos: LT 500 kV G. Valadares 6 / Mutum (156,0 km, cod: MGGVA65MTUM1), LT 500 kV Mutum / Rio Novo Sul (132,0 km, cod: MGMTUM5SRNS1ES) e conexões ao anel metropolitano fluminense.',
      substations: ['SE Governador Valadares 6 (MG)', 'SE Mutum (MG)', 'SE Terminal Rio (RJ)']
    }
  },
  {
    id: 'linha-xingo-paulo-afonso-camacari',
    name: 'Tronco São Francisco 500 kV (Xingó ➔ Camaçari II)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 351,
    from: 'SE Usina Xingó (AL/SE)',
    to: 'SE Camaçari II (BA)',
    concessionaire: 'Pedras Transmissora (Taesa)',
    coordinates: [
      [-37.8700, -9.6200],
      [-38.2200, -9.3800],
      [-39.3000, -12.6200],
      [-38.3200, -12.7000]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA circuito duplo (C1 351,0 km e C2 351,0 km, cod: SEXNG-5CMD-1BA e SEXNG-5CMD-2BA). Escoa a geração da UHE Xingó (3.162 MW) e Complexo Paulo Afonso (4.279 MW) para o Polo Petroquímico de Camaçari e Salvador.',
      substations: ['SE Usina Xingó (AL/SE)', 'SE Camaçari II (BA)']
    }
  },
  {
    id: 'linha-campos-novos-curitiba-525',
    name: 'Tronco Sul 525 kV (Campos Novos ➔ Areia ➔ Curitiba Leste)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 411.5,
    from: 'SE Campos Novos (SC)',
    to: 'SE Curitiba Leste (PR)',
    concessionaire: 'Axia Sul (Eletrosul) / Copel GeT',
    coordinates: [
      [-51.3500, -27.3800],
      [-51.6200, -26.0100],
      [-49.1200, -25.4300]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA eixo dorsal do subsistema Sul. Composta por LT 525 kV Areia / C. Novos (176,3 km, cod: PRARE-5CNO-1SC) e LT 525 kV Areia / Curitiba C1 (235,2 km, cod: PRARE-5CBA-1).',
      substations: ['SE Campos Novos (SC)', 'SE Areia (PR)', 'SE Curitiba Leste (PR)']
    }
  },
  {
    id: 'linha-ita-caxias-gravatai-525',
    name: 'Tronco Gaúcho 525 kV (Itá ➔ Caxias ➔ Gravataí)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 333.8,
    from: 'SE Itá (SC)',
    to: 'SE Gravataí (RS)',
    concessionaire: 'Axia Sul (Eletrosul)',
    coordinates: [
      [-52.3200, -27.2800],
      [-51.1800, -29.1600],
      [-51.2800, -29.8600],
      [-50.9900, -29.9400]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA transportando energia da UHE Itá (1.450 MW) e UHE Machadinho para a Grande Porto Alegre. Segmentos: LT 525 kV Caxias / Itá C1 (255,0 km, cod: RSCAX-5YTA-1SC) e LT 525 kV Caxias / Gravataí C1 (78,8 km, cod: RSCAX-5GRA-1).',
      substations: ['SE Itá (SC)', 'SE Caxias (RS)', 'SE Gravataí (RS)']
    }
  },
  {
    id: 'linha-serra-da-mesa-samambaia',
    name: 'Tronco Central 500 kV (Serra da Mesa ➔ Samambaia / Brasília)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 249,
    from: 'SE Serra da Mesa (Minaçu - GO)',
    to: 'SE Samambaia (DF)',
    concessionaire: 'Axia Energia (Furnas) / Taesa',
    coordinates: [
      [-48.3100, -13.8300],
      [-49.1400, -14.5200],
      [-48.0800, -15.8700]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA em três circuitos (C1 249,0 km, C2 248,5 km, C3 248,0 km, cod: GOUSSM5STSB1DF). Abastece o Distrito Federal a partir da UHE Serra da Mesa (1.275 MW) e ancora o entroncamento Norte-Sul.',
      substations: ['SE Serra da Mesa (GO)', 'SE Samambaia (DF)']
    }
  },
  {
    id: 'linha-itumbiara-emborcacao-ribeirao-preto',
    name: 'Tronco 500 kV Paranaíba (Itumbiara ➔ Emborcação ➔ Ribeirão Preto)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 330.6,
    from: 'SE Itumbiara (GO/MG)',
    to: 'SE Ribeirão Preto (SP)',
    concessionaire: 'Cemig GT / RPTE / Axia Energia',
    coordinates: [
      [-49.2000, -18.4100],
      [-47.9800, -18.4400],
      [-47.4000, -20.5300],
      [-47.8100, -21.1700]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA conectando as usinas estruturantes do Rio Paranaíba (UHE Itumbiara 2.082 MW e UHE Emborcação 1.192 MW) ao anel do nordeste paulista. LT 500 kV Emborcação / Itumbiara (134,56 km, cod: MGEMBO5USIM1).',
      substations: ['SE Itumbiara (GO/MG)', 'SE Emborcação (MG)', 'SE Ribeirão Preto (SP)']
    }
  },
  {
    id: 'linha-angra-rio',
    name: 'Tronco Nuclear de Angra (Angra ➔ Nova Iguaçu / Terminal Rio)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 138.6,
    from: 'SE Angra (Angra dos Reis - RJ)',
    to: 'SE Terminal Rio (Paracambi - RJ)',
    concessionaire: 'Axia Energia (Furnas) / XRTE',
    coordinates: [
      [-44.4500, -23.0100],
      [-44.2000, -22.9500],
      [-43.7100, -22.6100]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA escoando a potência de 1.990 MW da Central Nuclear Almirante Álvaro Alberto (Angra 1 e 2). Composta por LT 500 kV Angra Fur / Nova Iguaçu C1 (108,6 km, cod: RJSTAN5STNV1) e LT 500 kV Terminal Rio / Nova Iguaçu (30,0 km, cod: RJTRIO5NVI-1).',
      substations: ['SE Angra (RJ)', 'SE Nova Iguaçu (RJ)', 'SE Terminal Rio (RJ)']
    }
  },
  {
    id: 'linha-furnas-adrianopolis',
    name: 'Eixo Histórico 345 kV UHE Furnas ➔ Itutinga ➔ Adrianópolis',
    voltageKV: 345,
    type: 'CA',
    lengthKm: 397,
    from: 'SE Furnas (São José da Barra - MG)',
    to: 'SE Adrianópolis (Nova Iguaçu - RJ)',
    concessionaire: 'Axia Energia (Furnas)',
    coordinates: [
      [-46.3200, -20.6700],
      [-44.6600, -21.3000],
      [-43.4800, -22.6800]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '345 kV CA — corredor pioneiro de transmissão de Furnas no Brasil. Segmentos: LT 345 kV Furnas / Itutinga C1 (198,0 km, cod: MGUSFU3STIT1) e LT 345 kV Adrianópolis / Itutinga C1 (199,0 km, cod: RJSTAD3STIT1MG).',
      substations: ['SE Furnas (MG)', 'SE Itutinga (MG)', 'SE Adrianópolis (RJ)']
    }
  },
  {
    id: 'linha-sao-simao-marimbondo-ribeirao',
    name: 'Tronco 500 kV São Simão ➔ Marimbondo ➔ Ribeirão Preto',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 412,
    from: 'SE São Simão (GO/MG)',
    to: 'SE Ribeirão Preto (SP)',
    concessionaire: 'RPTE – Ribeirão Preto Transmissora de Energia',
    coordinates: [
      [-50.5100, -18.9900],
      [-49.2000, -20.3100],
      [-47.8100, -21.1700]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA integrando a UHE São Simão (1.710 MW) e UHE Marimbondo (1.440 MW). Segmentos: LT 500 kV Marimbondo / São Simão-SE C1 (216,0 km, cod: MGUSMR5SSSE1) e LT 500 kV Marimbondo / Ribeirão Preto C1 (196,0 km, cod: MGUSMR5RPR-1SP).',
      substations: ['SE São Simão (GO)', 'SE Marimbondo (MG)', 'SE Ribeirão Preto (SP)']
    }
  },
  {
    id: 'linha-costa-branca-rn',
    name: 'Tronco Eólico Costa Branca 500 kV (Açu III ➔ João Câmara III ➔ Ceará-Mirim)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 190,
    from: 'SE Açu III (Açu - RN)',
    to: 'SE Ceará-Mirim 2 (Natal - RN)',
    concessionaire: 'Argo VI / Axia Nordeste (Chesf)',
    coordinates: [
      [-36.9100, -5.5800],
      [-35.8200, -5.5300],
      [-35.4200, -5.6300]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA espinha dorsal dos parques eólicos do litoral potiguar. Composta por LT 500 kV Açu III / J. Câmara III (126,0 km, cod: RNACT-5JCT-1) e LT 500 kV Ceará-Mirim 2 / J. Câmara III (64,0 km, cod: RNCMM-5JCT-1).',
      substations: ['SE Açu III (RN)', 'SE João Câmara III (RN)', 'SE Ceará-Mirim 2 (RN)']
    }
  },
  {
    id: 'linha-milagres-banabuiu-fortaleza',
    name: 'Tronco 500 kV Ceará Central (Milagres ➔ Quixadá ➔ Fortaleza II)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 406.5,
    from: 'SE Milagres (CE)',
    to: 'SE Fortaleza II (CE)',
    concessionaire: 'Axia Nordeste (Chesf)',
    coordinates: [
      [-38.9400, -7.3100],
      [-38.9200, -5.3100],
      [-38.6200, -3.9800]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA principal via de suprimento da Grande Fortaleza a partir do nó de Milagres. Segmentos: LT 500 kV Milagres / Quixadá (268,7 km, cod: CEV3-5QXA-1) e LT 500 kV Quixadá / Fortaleza II (137,8 km, cod: CEQXA-5FZD-1).',
      substations: ['SE Milagres (CE)', 'SE Quixadá (CE)', 'SE Fortaleza II (CE)']
    }
  },
  {
    id: 'linha-sobral-pecem',
    name: 'Tronco 500 kV Sobral III ➔ Pecém II (Porto do Pecém)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 174.8,
    from: 'SE Sobral III (Sobral - CE)',
    to: 'SE Pecém II (São Gonçalo do Amarante - CE)',
    concessionaire: 'STN – Sistema de Transmissão do Nordeste / Axia Nordeste',
    coordinates: [
      [-40.3500, -3.6800],
      [-38.8600, -3.5500]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA em circuito duplo (C V6 174,8 km STN e C V7 174,8 km Axia Nordeste, cod: CEPCE-5SBT-2 e CEPCE-5SBT-1). Conecta o Porto do Pecém e termelétricas associadas ao SIN.',
      substations: ['SE Sobral III (CE)', 'SE Pecém II (CE)']
    }
  },
  {
    id: 'linha-claudia-paranatinga',
    name: 'Tronco 500 kV Teles Pires / Sinop (Cláudia ➔ Paranatinga)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 350,
    from: 'SE Cláudia (Cláudia - MT)',
    to: 'SE Paranatinga (Paranatinga - MT)',
    concessionaire: 'Matrinchã Transmissora (State Grid Brasil) / PRTE',
    coordinates: [
      [-54.8800, -11.5000],
      [-54.0500, -14.4300]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA em circuito triplo (C1 350,0 km, C2 350,0 km, C3 350,0 km, cod: MTCLD-5PRG-1, MTCLD-5PRG-2, MTCLD-5PRG-3). Escoa a geração das UHEs Sinop (401 MW), Colíder (300 MW) e Teles Pires.',
      substations: ['SE Cláudia (MT)', 'SE Paranatinga (MT)']
    }
  },
  {
    id: 'linha-rio-verde-itumbiara',
    name: 'Tronco 500 kV Agro Centro-Oeste (Rio Verde Norte ➔ Itumbiara)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 202,
    from: 'SE Rio Verde Norte (GO)',
    to: 'SE Itumbiara (GO/MG)',
    concessionaire: 'ITE – Itumbiara Transmissora de Energia',
    coordinates: [
      [-50.9200, -17.7900],
      [-51.7200, -17.8800],
      [-49.2000, -18.4100]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA com 202,0 km de extensão (cod: GOID--5USIM1MG). Escoa a energia da região produtora do agronegócio goiano diretamente para o barramento de 500 kV da UHE Itumbiara.',
      substations: ['SE Rio Verde Norte (GO)', 'SE Itumbiara (GO/MG)']
    }
  },
  {
    id: 'linha-cuiaba-campo-grande',
    name: 'Interligação 230 kV Mato Grosso ➔ Mato Grosso do Sul (Cuiabá ➔ Rondonópolis ➔ Chapadão ➔ Campo Grande)',
    voltageKV: 230,
    type: 'CA',
    lengthKm: 466.6,
    from: 'SE Cuiabá (Cuiabá - MT)',
    to: 'SE Campo Grande 2 (Campo Grande - MS)',
    concessionaire: 'AETE / Brilhante Transmissora',
    coordinates: [
      [-56.0900, -15.6000],
      [-54.6300, -16.4700],
      [-54.7500, -18.5000],
      [-54.6200, -20.4500]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '230 kV CA integrando as malhas regionais de MT e MS. Segmentos: LT 230 kV SE Cuiabá / Rondonópolis C1 (171,0 km, cod: MTCB--2RP--1) e LT 230 kV Campo Grande 2 / Chapadão C1 (295,6 km, cod: MSCG22CPD-1).',
      substations: ['SE Cuiabá (MT)', 'SE Rondonópolis (MT)', 'SE Chapadão (MS)', 'SE Campo Grande 2 (MS)']
    }
  },
  {
    id: 'linha-salto-caxias-foz',
    name: 'Tronco Sul 525 kV (Salto Caxias ➔ Cascavel Oeste ➔ Foz do Iguaçu)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 178,
    from: 'SE Salto Caxias (Capitão Leônidas Marques - PR)',
    to: 'SE Foz do Iguaçu 60 Hz (PR)',
    concessionaire: 'Copel GeT',
    coordinates: [
      [-53.5300, -25.5400],
      [-53.4500, -24.9500],
      [-54.5889, -25.4083]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA integrando a UHE Salto Caxias / Gov. José Richa (1.240 MW) ao anel do oeste paranaense. Composta por LT 525 kV Salto Caxias / Cascavel Oeste (63,0 km, cod: PRSCX-5CVO-1) e LT 525 kV Cascavel Oeste / Foz do Iguaçu 60Hz (115,0 km, cod: PRCVO-5STF61).',
      substations: ['SE Salto Caxias (PR)', 'SE Cascavel Oeste (PR)', 'SE Foz do Iguaçu 60Hz (PR)']
    }
  },
  {
    id: 'linha-segredo-curitiba',
    name: 'Tronco Sul 525 kV (Gov. Ney Braga / Segredo ➔ Areia ➔ Curitiba)',
    voltageKV: 525,
    type: 'CA',
    lengthKm: 291.9,
    from: 'SE Segredo (Mangueirinha - PR)',
    to: 'SE Curitiba (PR)',
    concessionaire: 'Axia Sul (Eletrosul) / Copel GeT',
    coordinates: [
      [-52.1100, -25.7900],
      [-49.5200, -25.3500],
      [-49.2800, -25.3500]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '525 kV CA escoando a UHE Segredo / Gov. Ney Braga (1.260 MW) no Rio Iguaçu para Curitiba. Composta por LT 525 kV Areia / Segredo (56,7 km, cod: PRARE-5SGD-1-------1) e LT 525 kV Areia / Curitiba C1 (235,2 km, cod: PRARE-5CBA-1).',
      substations: ['SE Segredo (PR)', 'SE Areia (PR)', 'SE Curitiba (PR)']
    }
  },
  {
    id: 'linha-candiota-povo-novo',
    name: 'Tronco Térmico Gaúcho 230 kV (Candiota / Presidente Médici ➔ Pelotas 3 ➔ Quinta / Povo Novo)',
    voltageKV: 230,
    type: 'CA',
    lengthKm: 178.9,
    from: 'SE Presidente Médici / Candiota (Candiota - RS)',
    to: 'SE Povo Novo / Quinta (Rio Grande - RS)',
    concessionaire: 'CPFL Transmissão (CPFL T)',
    coordinates: [
      [-53.6900, -31.5500],
      [-53.6700, -31.5600],
      [-52.3400, -31.7600],
      [-52.2500, -31.9900]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '230 kV CA conectando o polo termelétrico a carvão de Candiota ao porto de Rio Grande. Composta por LT 230 kV Presidente Médici / Pelotas 3 C1 (135,0 km, cod: RSPME-2PEL31) e LT 230 kV Pelotas 3 / Quinta C1 (43,86 km, cod: RSPEL32QUI-1).',
      substations: ['SE Presidente Médici (RS)', 'SE Pelotas 3 (RS)', 'SE Quinta / Povo Novo (RS)']
    }
  },
  {
    id: 'linha-sol-do-sertao-morro-chapeu',
    name: 'Tronco Solar/Eólico 500 kV Sertão Baiano (Sol do Sertão ➔ Gentio do Ouro II ➔ Ourolândia II)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 283,
    from: 'SE Sol do Sertão (Oliveira dos Brejinhos - BA)',
    to: 'SE Ourolândia II (Ourolândia - BA)',
    concessionaire: 'ETB – Enel Transmissora Brasil / Argo VII',
    coordinates: [
      [-42.5000, -11.4300],
      [-41.0800, -11.0500],
      [-41.1500, -11.5500]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA coletando a produção do Complexo Solar Sol do Sertão (475 MW) e eólicas regionais. Composta por LT 500 kV Sol do Sertão / Gentio do Ouro II (126,0 km, cod: BASDS-5GOR-1) e LT 500 kV Gentio do Ouro II / Ourolândia II (157,0 km, cod: BAGOR-5OUR-1).',
      substations: ['SE Sol do Sertão (BA)', 'SE Gentio do Ouro II (BA)', 'SE Ourolândia II (BA)']
    }
  },
  {
    id: 'linha-mesquita-neves-bh',
    name: 'Anel Metropolitano 500 kV Minas Gerais (Neves 1 ➔ Mesquita)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 172.5,
    from: 'SE Neves 1 (Ribeirão das Neves - MG)',
    to: 'SE Mesquita (Santana do Paraíso - MG)',
    concessionaire: 'IE Minas Gerais / Cemig GT',
    coordinates: [
      [-42.5300, -19.4600],
      [-43.9500, -19.7600],
      [-43.5000, -20.3800]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA circuito duplo (C1 172,5 km e C2 172,4 km, cod: MGMESQ5NEVE2 e MGMESQ5NEVE1). Interliga o anel da Grande Belo Horizonte ao polo siderúrgico do Vale do Aço (Usiminas).',
      substations: ['SE Neves 1 (MG)', 'SE Mesquita (MG)']
    }
  },
  {
    id: 'linha-araraquara-campinas-taubate',
    name: 'Tronco 500 kV Interior ➔ Vale do Paraíba (Araraquara 2 ➔ Taubaté)',
    voltageKV: 500,
    type: 'CA',
    lengthKm: 334.3,
    from: 'SE Araraquara 2 (Araraquara - SP)',
    to: 'SE Taubaté (Taubaté - SP)',
    concessionaire: 'Copel GeT',
    coordinates: [
      [-48.1800, -21.7900],
      [-47.0600, -22.9000],
      [-45.5500, -23.0200]
    ],
    sources: [
      {
        label: 'ONS — Cadastro de Linhas de Transmissão da Rede Básica (dataset oficial)',
        url: 'https://dados.ons.org.br/dataset/linha-transmissao',
        accessedAt: '2026-09-25'
      },
      {
        label: 'ONS — LINHA_TRANSMISSAO.csv (registro primário)',
        url: 'https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv',
        accessedAt: '2026-09-25'
      }
    ],
    technicalDetails: {
      converterTechnology: '500 kV CA com 334,32 km de extensão (cod: SPARA25TAU-1). Transfere fluxos do polo de conversão de Araraquara diretamente ao Vale do Paraíba sem sobrecarregar o anel metropolitano da capital.',
      substations: ['SE Araraquara 2 (SP)', 'SE Taubaté (SP)']
    }
  }
];
