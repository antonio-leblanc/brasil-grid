import type { LineText } from './assets';

export const TRANSMISSION_LINES_EN: Record<string, LineText> = {
  'linha-belo-monte-rio': {
    name: 'Belo Monte Bipole 2 (Xingu ➔ Terminal Rio)',
    converterTechnology: 'UHVDC ±800 kV LCC, 4,000 MW — second Belo Monte export bipole, commissioned in August 2019'
  },
  'linha-belo-monte-estreito': {
    name: 'Belo Monte Bipole 1 (Xingu ➔ Estreito)',
    converterTechnology: 'UHVDC ±800 kV LCC, 4,000 MW — first Belo Monte bipole, in commercial operation since December 2017'
  },
  'linha-madeira-sp': {
    name: 'Madeira Bipoles 1 and 2 (Porto Velho ➔ Araraquara 2)',
    concessionaire: 'IE Madeira (ISA Energia Brasil) — bipole 1 / NBTE (Evoltz) — bipole 2 line',
    converterTechnology: 'HVDC ±600 kV LCC, 2 bipoles of 3,150 MW. Bipole 1 line (IE Madeira): 2,385 km and 4,919 towers; bipole 2 line (NBTE): 2,411 km. In Porto Velho, 2 back-to-back converters total 800 MW for the local 230 kV system'
  },
  'linha-itaipu-sp': {
    name: 'Itaipu 765 kV trunk (Foz do Iguaçu ➔ Ivaiporã ➔ Itaberá ➔ Tijuco Preto)',
    converterTechnology: '765 kV AC on 3 circuits — carries the 60 Hz generation of the Brazilian side of Itaipu; at Ivaiporã, the 765/500 kV transformation couples the trunk to the South subsystem'
  },
  'linha-interligacao-ne-se': {
    name: 'Southeast–Northeast interconnection (Serra da Mesa ➔ Bom Jesus da Lapa II ➔ Sapeaçu)',
    converterTechnology: '500 kV AC — closed the North–Northeast–Southeast transmission ring; at Bom Jesus da Lapa II, the 500/230 kV transformation couples the regional Bahia grid'
  },
  'linha-tucurui-manaus': {
    name: 'Tucuruí trunk line (Tucuruí ➔ Jurupari ➔ Oriximiná ➔ Manaus, with a branch to Macapá)',
    concessionaire: 'LXTE and LMTE (Energisa) / MTE (Evoltz)',
    converterTechnology: 'Double-circuit 500 kV (Macapá branch at 230 kV). Sections: Tucuruí–Xingu–Jurupari (LXTE, 527 km), Oriximiná–Jurupari–Macapá (LMTE, 713 km), Oriximiná–Silves–Lechuga (MTE, 558 km). Amazon River crossing at Almeirim (PA) with towers of about 295 m'
  },
  'linha-norte-nordeste': {
    name: 'North–Northeast interconnection (Sobradinho ➔ Imperatriz)',
    converterTechnology: '500 kV AC — Chesf extra-high-voltage line, commissioned in 1981 and complemented by Eletronorte lines, which enabled exchange between the North and Northeast subsystems'
  },
  'linha-manaus-boavista': {
    name: 'Manaus ➔ Boa Vista trunk line (Transnorte)',
    converterTechnology: 'Double-circuit 500 kV — energized in September 2025, it ended the electrical isolation of Roraima, the last state outside the SIN'
  },
  'linha-acre-rondonia': {
    name: 'Acre–Rondônia interconnection, 3rd circuit (Porto Velho ➔ Abunã ➔ Rio Branco)',
    converterTechnology: '230 kV AC — third supply circuit to Acre, commissioned in March 2025: Porto Velho–Abunã (188 km) and Abunã–Rio Branco I (305 km)'
  },
  'linha-brasil-argentina': {
    name: 'Brazil–Argentina interconnection (Garabi converter station ➔ Santo Ângelo ➔ Itá)',
    from: 'Garabi converter station (Garruchos - RS)',
    concessionaire: 'Taesa (since 2023; formerly Enel Cien)',
    converterTechnology: 'Garabi I and II 50/60 Hz back-to-back converters (4 × 550 MW = 2,200 MW) in Garruchos; 743 km of 525 kV TLs across the two circuits to Itá, sectionalized at Santo Ângelo'
  },
  'bipolo-itaipu-ibiuna': {
    name: 'Itaipu HVDC bipoles (Foz do Iguaçu ➔ Ibiúna)',
    from: 'Foz do Iguaçu converter station (Foz do Iguaçu - PR)',
    to: 'Ibiúna converter station (Ibiúna - SP)',
    converterTechnology: 'HVDC ±600 kV LCC, 2 bipoles of 3,150 MW on lines of 807 and 818 km — rectifies the 50 Hz from the Paraguayan-side units of Itaipu and delivers 60 Hz at Ibiúna (345 and 500 kV)'
  },
  'linha-norte-sul-500': {
    name: 'North–South interconnection, circuit 1 (Imperatriz ➔ Serra da Mesa ➔ Samambaia)',
    converterTechnology: '500 kV AC — first circuit of the North–South interconnection, in operation since March 1999; it joined the North/Northeast and South/Southeast/Center-West systems'
  },
  'linha-telespires-seco': {
    name: 'Teles Pires trunk line (Paranaíta ➔ Cláudia ➔ Paranatinga ➔ Ribeirãozinho)',
    converterTechnology: '500 kV AC — carries the Teles Pires River hydro plants to the SIN, crossing Mato Grosso'
  },
  'linha-gracaaranha-silvania': {
    name: 'Graça Aranha ➔ Silvânia bipole (under construction)',
    converterTechnology: 'UHVDC ±800 kV LCC, 5,000 MW — Lot 1 of Transmission Auction 2/2023 (December 2023), to carry wind and solar surpluses from the Northeast to the Center-West/Southeast; expected to enter operation from 2029'
  },
  'linha-porto-sergipe-jardim': {
    name: '500 kV TL UTE Porto de Sergipe I ➔ Jardim',
    converterTechnology: "500 kV AC on two independent circuits — connects the ~1.5 GW natural gas thermal plant (Eneva, ex-Celse) to Chesf's SE Jardim"
  },
  'linha-extremo-sul-gaucho': {
    name: 'Rio Grande do Sul southern coast trunk (Nova Santa Rita ➔ Povo Novo ➔ Marmeleiro ➔ Santa Vitória do Palmar)',
    concessionaire: 'CGT Eletrosul (Axia Energia) — former TSLE assets',
    converterTechnology: '525 kV AC — Nova Santa Rita–Povo Novo (281 km), Povo Novo–Marmeleiro (154 km, with 15 km inside the Taim Ecological Station) and Marmeleiro–Santa Vitória do Palmar (52 km); carries wind generation from the far south of Rio Grande do Sul'
  },
  'linha-jurupari-macapa': {
    name: 'Jurupari ➔ Laranjal do Jari ➔ Macapá trunk (Amazon crossing)',
    converterTechnology: 'Double-circuit 230 kV AC, crossing the Amazon and Jari rivers on guyed towers. Made up of 230 kV TL Jurupari / Laranjal (105.0 km, code: PAJRP-2LAL-1AP) and 230 kV TL Laranjal / Macapá (244.0 km, code: APLAL-2MCP-1).'
  },
  'linha-tucurui-vila-do-conde': {
    name: 'Tucuruí ➔ Vila do Conde trunk (Barcarena)',
    converterTechnology: '500 kV AC on three circuits (C1 328.7 km Axia Norte, C2 323.95 km ETEP, C3 324.0 km VCTE). Carries energy from UHE Tucuruí to the energy-intensive aluminum hub of Barcarena and Greater Belém.'
  },
  'linha-tucurui-maraba-imperatriz': {
    name: 'Tucuruí ➔ Marabá ➔ Imperatriz trunk (N–NE interconnection)',
    converterTechnology: '500 kV AC linking North and Northeast. Segments: 500 kV TL Marabá / Tucuruí C1 (223.3 km, code: PAMB--5TC--1) and 500 kV TL Imperatriz / Marabá C1 (182.2 km, code: MAIZ--5MB--1PA).'
  },
  'linha-xingu-tucurui': {
    name: '500 kV Xingu ➔ Tucuruí coupling trunk',
    converterTechnology: 'Double-circuit 500 kV AC (265.0 km each, code: PATC--5XIN-1 and PATC--5XIN-2). Backbone coupling the Belo Monte (Xingu River) and Tucuruí (Tocantins River) hydro plants.'
  },
  'linha-itaipu-ivaipora-765': {
    name: 'Itaipu 765 kV trunk — Section 1 (Foz do Iguaçu ➔ Ivaiporã)',
    converterTechnology: "Triple-circuit 765 kV AC (C1 322.0 km, C2 323.0 km, C3 339.0 km, code: PRSTIV7STF61). Brazil's highest AC voltage level, carrying the output of Itaipu Binacional's 60 Hz generators."
  },
  'linha-ivaipora-itabera-765': {
    name: 'Itaipu 765 kV trunk — Section 2 (Ivaiporã ➔ Itaberá)',
    converterTechnology: 'Triple-circuit 765 kV AC (C1 265.0 km, C2 264.0 km, C3 272.0 km, code: SPSTIA7STIV1PR). Crosses the PR/SP border carrying power from the Itaipu corridor to the São Paulo load ring.'
  },
  'linha-itabera-tijuco-preto-765': {
    name: 'Itaipu 765 kV trunk — Section 3 (Itaberá ➔ Tijuco Preto)',
    converterTechnology: 'Triple-circuit 765 kV AC (C1 305.0 km, C2 304.0 km, C3 312.0 km, code: SPSTIA7STTP1). Feeds the load center of Greater São Paulo and the Vale do Paraíba.'
  },
  'linha-ilha-solteira-araraquara': {
    name: 'São Paulo 440 kV trunk (Ilha Solteira ➔ Araraquara)',
    converterTechnology: 'Double-circuit 440 kV AC (C1 375.9 km and C2 375.9 km, code: SPILS-4ARA-1 and SPILS-4ARA-2). Backbone of the CESP system, carrying the output of UHE Ilha Solteira (3,444 MW).'
  },
  'linha-araraquara-bauru-embu-guacu': {
    name: 'São Paulo 440 kV ring (Araraquara ➔ Bauru ➔ Embu-Guaçu)',
    converterTechnology: '440 kV AC linking inland São Paulo to Greater São Paulo. Made up of 440 kV TL Bauru / Araraquara CTP (103.7 km, code: SPBAU-4ARA-1) and 440 kV TL Bauru / Embu-Guaçu C-1 (305.97 km, code: SPBAU-4EMG-1).'
  },
  'linha-jupia-bauru-440': {
    name: 'Paraná River 440 kV trunk (Jupiá ➔ Bauru)',
    converterTechnology: 'Double-circuit 440 kV AC (C1 312.0 km and C2 312.0 km, code: SPJUP-4BAU-1 and SPJUP-4BAU-2). Carries the output of UHE Engenheiro Souza Dias / Jupiá (1,551 MW) at the mouth of the Tietê River.'
  },
  'linha-porto-primavera-assis': {
    name: 'Porto Primavera ➔ Taquaruçu ➔ Assis trunk (440 kV)',
    converterTechnology: '440 kV AC connecting UHE Porto Primavera (1,540 MW) and UHE Taquaruçu to SE Assis. Made up of 440 kV TL P. Primavera / Taquaruçu C1 (113.2 km, code: SPPPR-4TAQ-1) and 440 kV TL Taquaruçu / Assis C1 (173.35 km, code: SPTAQ-4ASS-1).'
  },
  'linha-sao-joao-piaui-milagres': {
    name: '500 kV Piauí ➔ Ceará interconnection (São João do Piauí ➔ Milagres)',
    converterTechnology: '500 kV AC, 400.0 km long (code: PISJI-5MLG-1CE). Key corridor for transferring wind and solar surpluses from southern Piauí directly to the strategic Milagres node.'
  },
  'linha-gilbues-sao-joao-piaui': {
    name: '500 kV Gilbués ➔ São João do Piauí solar collector',
    converterTechnology: '500 kV AC, 413.0 km long (code: PIGBD-5SJI-1). Collects the centralized generation of the São Gonçalo do Gurguéia PV hub and adjacent complexes.'
  },
  'linha-barreiras-rio-das-eguas': {
    name: 'Western Bahia 500 kV trunk (Barreiras II ➔ Rio das Éguas)',
    converterTechnology: 'Double-circuit 500 kV AC (C1 239.27 km and C2 251.0 km, code: BABRD-5RDE-1 and BABRD-5RDE-2). Artery linking MATOPIBA to the export trunks toward the Southeast.'
  },
  'linha-pocoes-padre-paraiso-gov-valadares': {
    name: '500 kV NE–SE interconnection (Poções III ➔ Padre Paraíso 2 ➔ Gov. Valadares 6)',
    converterTechnology: 'Structural 500 kV AC on the NE-SECO interface. Made up of 500 kV TL Pe. Paraíso 2 / Poções III (334.0 km, code: MGPPA25POD-1BA) and 500 kV TL G. Valadares 6 / Pe. Paraíso 2 (203.0 km, code: MGGVA65PPA21).'
  },
  'linha-gov-valadares-mutum-rio': {
    name: 'East 500 kV corridor (Gov. Valadares 6 ➔ Mutum ➔ Terminal Rio)',
    converterTechnology: '500 kV AC linking eastern Minas Gerais to Rio de Janeiro. Segments: 500 kV TL G. Valadares 6 / Mutum (156.0 km, code: MGGVA65MTUM1), 500 kV TL Mutum / Rio Novo Sul (132.0 km, code: MGMTUM5SRNS1ES) and connections to the Rio de Janeiro metropolitan ring.'
  },
  'linha-xingo-paulo-afonso-camacari': {
    name: 'São Francisco 500 kV trunk (Xingó ➔ Camaçari II)',
    converterTechnology: 'Double-circuit 500 kV AC (C1 351.0 km and C2 351.0 km, code: SEXNG-5CMD-1BA and SEXNG-5CMD-2BA). Carries the output of UHE Xingó (3,162 MW) and the Paulo Afonso Complex (4,279 MW) to the Camaçari Petrochemical Complex and Salvador.'
  },
  'linha-campos-novos-curitiba-525': {
    name: 'South 525 kV trunk (Campos Novos ➔ Areia ➔ Curitiba Leste)',
    converterTechnology: '525 kV AC backbone of the South subsystem. Made up of 525 kV TL Areia / C. Novos (176.3 km, code: PRARE-5CNO-1SC) and 525 kV TL Areia / Curitiba C1 (235.2 km, code: PRARE-5CBA-1).'
  },
  'linha-ita-caxias-gravatai-525': {
    name: 'Rio Grande do Sul 525 kV trunk (Itá ➔ Caxias ➔ Gravataí)',
    converterTechnology: '525 kV AC carrying energy from UHE Itá (1,450 MW) and UHE Machadinho to Greater Porto Alegre. Segments: 525 kV TL Caxias / Itá C1 (255.0 km, code: RSCAX-5YTA-1SC) and 525 kV TL Caxias / Gravataí C1 (78.8 km, code: RSCAX-5GRA-1).'
  },
  'linha-serra-da-mesa-samambaia': {
    name: 'Central 500 kV trunk (Serra da Mesa ➔ Samambaia / Brasília)',
    converterTechnology: '500 kV AC on three circuits (C1 249.0 km, C2 248.5 km, C3 248.0 km, code: GOUSSM5STSB1DF). Supplies the Federal District from UHE Serra da Mesa (1,275 MW) and anchors the North-South junction.'
  },
  'linha-itumbiara-emborcacao-ribeirao-preto': {
    name: 'Paranaíba 500 kV trunk (Itumbiara ➔ Emborcação ➔ Ribeirão Preto)',
    converterTechnology: '500 kV AC connecting the main Paranaíba River plants (UHE Itumbiara 2,082 MW and UHE Emborcação 1,192 MW) to the northeastern São Paulo ring. 500 kV TL Emborcação / Itumbiara (134.56 km, code: MGEMBO5USIM1).'
  },
  'linha-angra-rio': {
    name: 'Angra nuclear trunk (Angra ➔ Nova Iguaçu / Terminal Rio)',
    converterTechnology: '500 kV AC carrying the 1,990 MW of the Almirante Álvaro Alberto Nuclear Plant (Angra 1 and 2). Made up of 500 kV TL Angra Fur / Nova Iguaçu C1 (108.6 km, code: RJSTAN5STNV1) and 500 kV TL Terminal Rio / Nova Iguaçu (30.0 km, code: RJTRIO5NVI-1).'
  },
  'linha-furnas-adrianopolis': {
    name: 'Historic 345 kV axis UHE Furnas ➔ Itutinga ➔ Adrianópolis',
    converterTechnology: "345 kV AC — Furnas's pioneering transmission corridor in Brazil. Segments: 345 kV TL Furnas / Itutinga C1 (198.0 km, code: MGUSFU3STIT1) and 345 kV TL Adrianópolis / Itutinga C1 (199.0 km, code: RJSTAD3STIT1MG)."
  },
  'linha-sao-simao-marimbondo-ribeirao': {
    name: '500 kV São Simão ➔ Marimbondo ➔ Ribeirão Preto trunk',
    converterTechnology: '500 kV AC integrating UHE São Simão (1,710 MW) and UHE Marimbondo (1,440 MW). Segments: 500 kV TL Marimbondo / São Simão-SE C1 (216.0 km, code: MGUSMR5SSSE1) and 500 kV TL Marimbondo / Ribeirão Preto C1 (196.0 km, code: MGUSMR5RPR-1SP).'
  },
  'linha-costa-branca-rn': {
    name: 'Costa Branca 500 kV wind trunk (Açu III ➔ João Câmara III ➔ Ceará-Mirim)',
    converterTechnology: '500 kV AC backbone of the wind farms on the Rio Grande do Norte coast. Made up of 500 kV TL Açu III / J. Câmara III (126.0 km, code: RNACT-5JCT-1) and 500 kV TL Ceará-Mirim 2 / J. Câmara III (64.0 km, code: RNCMM-5JCT-1).'
  },
  'linha-milagres-banabuiu-fortaleza': {
    name: 'Central Ceará 500 kV trunk (Milagres ➔ Quixadá ➔ Fortaleza II)',
    converterTechnology: '500 kV AC, the main supply route to Greater Fortaleza from the Milagres node. Segments: 500 kV TL Milagres / Quixadá (268.7 km, code: CEV3-5QXA-1) and 500 kV TL Quixadá / Fortaleza II (137.8 km, code: CEQXA-5FZD-1).'
  },
  'linha-sobral-pecem': {
    name: '500 kV Sobral III ➔ Pecém II trunk (Port of Pecém)',
    converterTechnology: 'Double-circuit 500 kV AC (C V6 174.8 km STN and C V7 174.8 km Axia Nordeste, code: CEPCE-5SBT-2 and CEPCE-5SBT-1). Connects the Port of Pecém and associated thermal plants to the SIN.'
  },
  'linha-claudia-paranatinga': {
    name: 'Teles Pires / Sinop 500 kV trunk (Cláudia ➔ Paranatinga)',
    converterTechnology: 'Triple-circuit 500 kV AC (C1 350.0 km, C2 350.0 km, C3 350.0 km, code: MTCLD-5PRG-1, MTCLD-5PRG-2, MTCLD-5PRG-3). Carries the output of the Sinop (401 MW), Colíder (300 MW) and Teles Pires UHEs.'
  },
  'linha-rio-verde-itumbiara': {
    name: 'Center-West agribusiness 500 kV trunk (Rio Verde Norte ➔ Itumbiara)',
    converterTechnology: '500 kV AC, 202.0 km long (code: GOID--5USIM1MG). Carries energy from the Goiás agribusiness region directly to the 500 kV bus of UHE Itumbiara.'
  },
  'linha-cuiaba-campo-grande': {
    name: '230 kV Mato Grosso ➔ Mato Grosso do Sul interconnection (Cuiabá ➔ Rondonópolis ➔ Chapadão ➔ Campo Grande)',
    converterTechnology: '230 kV AC linking the regional grids of MT and MS. Segments: 230 kV TL SE Cuiabá / Rondonópolis C1 (171.0 km, code: MTCB--2RP--1) and 230 kV TL Campo Grande 2 / Chapadão C1 (295.6 km, code: MSCG22CPD-1).'
  },
  'linha-salto-caxias-foz': {
    name: 'South 525 kV trunk (Salto Caxias ➔ Cascavel Oeste ➔ Foz do Iguaçu)',
    converterTechnology: '525 kV AC integrating UHE Salto Caxias / Gov. José Richa (1,240 MW) into the western Paraná ring. Made up of 525 kV TL Salto Caxias / Cascavel Oeste (63.0 km, code: PRSCX-5CVO-1) and 525 kV TL Cascavel Oeste / Foz do Iguaçu 60Hz (115.0 km, code: PRCVO-5STF61).'
  },
  'linha-segredo-curitiba': {
    name: 'South 525 kV trunk (Gov. Ney Braga / Segredo ➔ Areia ➔ Curitiba)',
    converterTechnology: '525 kV AC carrying the output of UHE Segredo / Gov. Ney Braga (1,260 MW) on the Iguaçu River to Curitiba. Made up of 525 kV TL Areia / Segredo (56.7 km, code: PRARE-5SGD-1-------1) and 525 kV TL Areia / Curitiba C1 (235.2 km, code: PRARE-5CBA-1).'
  },
  'linha-candiota-povo-novo': {
    name: 'Rio Grande do Sul 230 kV thermal trunk (Candiota / Presidente Médici ➔ Pelotas 3 ➔ Quinta / Povo Novo)',
    converterTechnology: '230 kV AC connecting the Candiota coal-fired thermal hub to the port of Rio Grande. Made up of 230 kV TL Presidente Médici / Pelotas 3 C1 (135.0 km, code: RSPME-2PEL31) and 230 kV TL Pelotas 3 / Quinta C1 (43.86 km, code: RSPEL32QUI-1).'
  },
  'linha-sol-do-sertao-morro-chapeu': {
    name: 'Bahia sertão 500 kV solar/wind trunk (Sol do Sertão ➔ Gentio do Ouro II ➔ Ourolândia II)',
    converterTechnology: '500 kV AC collecting the output of the Sol do Sertão Solar Complex (475 MW) and regional wind farms. Made up of 500 kV TL Sol do Sertão / Gentio do Ouro II (126.0 km, code: BASDS-5GOR-1) and 500 kV TL Gentio do Ouro II / Ourolândia II (157.0 km, code: BAGOR-5OUR-1).'
  },
  'linha-mesquita-neves-bh': {
    name: 'Minas Gerais 500 kV metropolitan ring (Neves 1 ➔ Mesquita)',
    converterTechnology: 'Double-circuit 500 kV AC (C1 172.5 km and C2 172.4 km, code: MGMESQ5NEVE2 and MGMESQ5NEVE1). Links the Greater Belo Horizonte ring to the Vale do Aço steel hub (Usiminas).'
  },
  'linha-araraquara-campinas-taubate': {
    name: 'Inland São Paulo ➔ Vale do Paraíba 500 kV trunk (Araraquara 2 ➔ Taubaté)',
    converterTechnology: '500 kV AC, 334.32 km long (code: SPARA25TAU-1). Transfers flows from the Araraquara converter hub directly to the Vale do Paraíba without overloading the metropolitan ring of the state capital.'
  }
};
