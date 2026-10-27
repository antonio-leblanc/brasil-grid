import type { PlantText } from './assets';

export const POWER_PLANTS_EN: Record<string, PlantText> = {
  itaipu: {
    riverOrRegion: 'Paraná River (Foz do Iguaçu)',
    operator: 'Itaipu Binacional (Brazil / Paraguay)',
    description: "The world's second-largest plant by historical generation. Binational, with 20 Francis units of 700 MW: 10 at 60 Hz (Brazilian side, 7,000 MW licensed by ANEEL) and 10 at 50 Hz (Paraguayan side). Paraguayan energy not consumed in Paraguay is ceded to Brazil and reaches the SIN through the ±600 kV bipoles to Ibiúna, which is why the map point shows the 14,000 MW of the whole plant.",
    turbinesOrUnits: '20 x 700 MW (Francis) — 10 at 50 Hz and 10 at 60 Hz',
    flowOrEfficiency: 'Rated flow: 14,000 m³/s',
    gridConnectionVoltage: '500 kV (AC) & ±600 kV (DC)'
  },
  'belo-monte': {
    riverOrRegion: 'Xingu River (Altamira/Vitória do Xingu)',
    description: 'Largest fully Brazilian hydro plant. Highly seasonal run-of-river plant, split between the Belo Monte site (11,000 MW) and the Pimental spillway (233.1 MW), with power exported over ±800 kV UHVDC.',
    turbinesOrUnits: '18 x 611.11 MW (Belo Monte Francis) + 6 x 38.85 MW + 3 x 2.14 MW (Pimental bulb)',
    flowOrEfficiency: 'Rated net head: ~89 meters',
    gridConnectionVoltage: '±800 kV UHVDC (Bipoles 1 and 2)'
  },
  tucurui: {
    riverOrRegion: 'Tocantins River (Tucuruí)',
    description: 'Industrial anchor of the eastern Amazon. Critical supply for the energy-intensive aluminum complexes and interconnection with the Northeast and Southeast subsystems.',
    turbinesOrUnits: '24 generating units: 12 x 350 MW (Phase I) + 11 x 370 MW + 1 x 370 MW + 2 x 15 MW aux (Phase II)',
    flowOrEfficiency: 'Maximum spillway flow: 110,000 m³/s'
  },
  jirau: {
    riverOrRegion: 'Madeira River (Porto Velho)',
    description: 'Engineering complex on the Madeira River equipped with high-efficiency bulb turbines for low heads.',
    turbinesOrUnits: '50 bulb turbines of 75 MW',
    flowOrEfficiency: 'Rated net head: 15.2 meters',
    gridConnectionVoltage: '500 kV ➔ Porto Velho Collector converter station ±600 kV'
  },
  'santo-antonio': {
    riverOrRegion: 'Madeira River (Porto Velho)',
    description: 'Runs as run-of-river together with Jirau. Its energy travels over the Madeira Bipole to the Araraquara substation (SP).',
    turbinesOrUnits: '50 bulb turbines (44 x 71.6 MW + 6 x 69.59 MW)',
    flowOrEfficiency: 'Rated flow: 24,000 m³/s',
    gridConnectionVoltage: '500 kV ➔ Porto Velho Collector converter station ±600 kV'
  },
  'xingó': {
    riverOrRegion: 'São Francisco River (Canindé/Piranhas)',
    description: "Key plant for the Northeast's electric power security on the lower São Francisco, with its spillway set into the canyon.",
    flowOrEfficiency: 'Rated head: 118 meters'
  },
  'paulo-afonso': {
    name: 'Paulo Afonso Complex (I-IV + Apolônio Sales)',
    riverOrRegion: 'São Francisco River (Paulo Afonso)',
    description: 'Historic complex that pioneered electrification in the Northeast. Made up of four plants in Paulo Afonso (I: 180 MW, II: 443 MW, III: 794.2 MW, IV: 2,462.4 MW) and the Apolônio Sales / Moxotó plant (400 MW).',
    turbinesOrUnits: '23 generating units in total across the 5 powerhouses'
  },
  'angra-nuclear': {
    name: 'Almirante Álvaro Alberto Nuclear Plant (Angra 1 and 2)',
    riverOrRegion: 'Itaorna Beach (Angra dos Reis)',
    description: 'Baseload thermal generation with zero direct carbon emissions. Provides inertia and voltage support for the Greater Rio load center.',
    turbinesOrUnits: 'Angra 1 (640 MW - Westinghouse PWR) + Angra 2 (1,350 MW - Siemens PWR)'
  },
  'eolica-alto-sertao': {
    name: 'Alto Sertão Wind Complex (I, II and III)',
    description: 'Pioneering high-density wind cluster in the Bahia highlands, integrating 52 wind farms of Alto Sertão I (294.4 MW — Brasil Ventos/Axia), Alto Sertão II (386.1 MW — Auren) and Alto Sertão III (374.7 MW — Renova).',
    turbinesOrUnits: '52 wind farms with GE / Alstom wind turbines'
  },
  'solar-janauba': {
    name: 'Janaúba Solar Complex',
    riverOrRegion: 'Janaúba (northern Minas Gerais)',
    description: 'One of the largest solar PV complexes in the southern hemisphere, made up of 20 PV plants (UFVs) of 50 MW AC licensed (1,000 MW AC / 1.2 GWp DC in Phase 1, expanded to 1.6 GWp with the Irapuru cluster).',
    turbinesOrUnits: '20 UFVs of 50 MW AC (2.2 million bifacial modules on trackers)'
  },
  'termica-porto-sergipe': {
    description: 'Largest natural gas thermal plant in Latin America (1,593.2 MW licensed / 1,515.6 MW inspected). Runs in combined cycle (3 gas turbines + 1 steam) integrated with an offshore LNG regasification terminal.'
  },
  'ilha-solteira': {
    riverOrRegion: 'Paraná River (Ilha Solteira)',
    description: 'One of the largest fully Brazilian plants in the country; it runs in cascade with Três Irmãos and Jupiá, carrying a large share of the load in inland São Paulo and Mato Grosso do Sul.'
  },
  sobradinho: {
    riverOrRegion: 'São Francisco River (Sobradinho)',
    description: 'Multi-year reservoir that regulates the flow of the whole lower São Francisco, enabling Paulo Afonso and Xingó downstream — a key piece of water and energy security for the semi-arid Northeast.',
    turbinesOrUnits: '6 Kaplan units'
  },
  'serra-da-mesa': {
    riverOrRegion: 'Tocantins River (Minaçu)',
    description: "The country's largest artificial reservoir by volume; it works as a long-term hydro battery for the Southeast/Center-West subsystem in dry years.",
    turbinesOrUnits: '3 Francis units'
  },
  'foz-do-areia': {
    riverOrRegion: 'Iguaçu River (Pinhão/Bituruna)',
    description: 'Head of the Iguaçu cascade, with one of the highest dams in South America — anchor of supply for the Paraná state system.'
  },
  ita: {
    riverOrRegion: 'Uruguay River (Itá/Aratiba)',
    description: 'Main plant of the Uruguay basin on the SC/RS border, with a significant role in energy exchange between the southern states.',
    turbinesOrUnits: '5 Francis units'
  },
  furnas: {
    riverOrRegion: 'Grande River (São José da Barra)',
    description: 'One of the pioneering plants of the national interconnection — it gave its name to the state company Furnas — and remains central to supply in the Southeast.',
    turbinesOrUnits: '8 Francis units'
  },
  marimbondo: {
    riverOrRegion: 'Grande River (Fronteira/Icém)',
    description: 'Strategic part of the Grande River cascade on the MG/SP border, reinforcing the export corridor between the Triângulo Mineiro and inland São Paulo with 8 Francis turbines of 180 MW.'
  },
  'salto-caxias': {
    riverOrRegion: 'Iguaçu River (Nova Prata do Iguaçu)',
    description: 'Last large plant in the Iguaçu cascade before the border with Argentina, near the Iguaçu Falls region.',
    turbinesOrUnits: '4 Francis units'
  },
  'sao-simao': {
    riverOrRegion: 'Paranaíba River (MG/GO border)',
    description: 'One of the largest plants entirely on Brazilian territory in the Paranaíba basin, anchoring supply for the Triângulo Mineiro and Goiás. Concession auctioned to and operated by SPIC Brasil.'
  },
  'lagoa-dos-ventos': {
    name: 'Lagoa dos Ventos Wind Complex (Phases I and II)',
    description: 'One of the largest wind complexes in Latin America, made up in Phases I and II of 21 Ventos de Santa Ângela wind farms (716.6 MW licensed, expanded in Phase III by another 396 MW).'
  },
  'rio-do-vento': {
    name: 'Rio do Vento Wind Complex',
    description: 'One of the largest wind clusters in the world (1,038.2 MW in 16 wind farms: Ventos de Santa Martina, Ventos de São Januário 23 and Ventos de Santa Leia), using the trade winds of inland Rio Grande do Norte.'
  },
  osorio: {
    name: 'Osório Wind Complex',
    riverOrRegion: 'Osório (North Coast)',
    description: 'Pioneering milestone of commercial wind power in Brazil: opened in 2006 with 150 MW (Osório, Sangradouro and Índios) and later expanded to 9 wind farms and 317.9 MW licensed.'
  },
  pirapora: {
    name: 'Pirapora Solar Complex',
    description: "One of the country's first large utility-scale PV complexes, made up of 11 PV plants (UFVs) (Pirapora 2 to 7, 9 and 10 + Vazante 1 to 3), totaling 329 MW licensed (321 MW AC / ~400 MWp DC)."
  },
  ituverava: {
    name: 'Ituverava Photovoltaic Complex',
    description: 'Pioneering large-scale solar plant in western Bahia, made up of 7 UFVs (Ituverava 1 to 7) totaling 196 MW AC licensed (254 MWp DC installed).'
  },
  'norte-fluminense': {
    description: 'Combined-cycle natural gas thermal plant (826.8 MW licensed / 869 MW inspected) in Macaé, essential for supplying the Rio de Janeiro metropolitan area.'
  },
  'teles-pires': {
    riverOrRegion: 'Teles Pires River (Paranaíta / Apiacás)',
    description: 'Large run-of-river scheme on the Teles Pires River, carrying energy generated in the southern Amazon to the Center-West and Southeast.'
  },
  'porto-primavera': {
    riverOrRegion: 'Paraná River (Rosana / Batayporã)',
    description: 'Has the most extensive earth-dam reservoir in Brazil and the largest river navigation lock on the Tietê-Paraná Waterway.'
  },
  'salto-santiago': {
    riverOrRegion: 'Iguaçu River (Saudade do Iguaçu)',
    description: 'Second-largest plant on the Iguaçu River by capacity, key for power support and frequency control for the South and Southeast subsystems.'
  },
  machadinho: {
    riverOrRegion: 'Pelotas River (Machadinho / Piratuba)',
    description: 'Roller-compacted concrete plant on the Rio Grande do Sul–Santa Catarina border, part of the hydro cascade of the Uruguay River basin.'
  },
  estreito: {
    riverOrRegion: 'Tocantins River (Estreito / Aguiarnópolis)',
    description: 'Run-of-river scheme on the middle Tocantins with high-flow bulb turbines, supplying the mining industry and the regional interconnection.',
    turbinesOrUnits: '8 x 135.9 MW (Bulb/Kaplan)'
  },
  emborcacao: {
    riverOrRegion: 'Paranaíba River (Araguari / Catalão)',
    description: 'Major headwater plant on the Paranaíba River with a large storage reservoir providing multi-year regulation for the SIN.'
  },
  'solar-futura': {
    name: 'Futura I Solar Complex',
    description: 'One of the largest PV complexes in the Americas, made up of 22 UFVs (Futura 1 to 22) totaling 692.4 MW AC licensed (852 MWp DC) with about 1.4 million bifacial modules in Juazeiro.'
  },
  'solar-sao-goncalo': {
    name: 'São Gonçalo Solar Complex',
    description: 'Large solar installation in the semi-arid region of Piauí made up of 18 UFVs in operation (790.4 MW AC licensed / 864 MWp DC), a pioneer of large-scale use of bifacial modules in Brazil.'
  },
  'eolica-chafariz': {
    name: 'Chafariz Wind Complex',
    description: 'High-yield wind cluster in the Paraíba sertão made up of 15 wind farms (Chafariz 1 to 7, Canoas 2 to 4, Ventos de Arapuá 1 to 3 and Lagoa 3 and 4 — 471.2 MW) and 136 wind turbines, connected to SE Santa Luzia II (500 kV).'
  },
  'eolica-morro-do-chapeu': {
    name: 'Morro do Chapéu Sul Wind Complex (I and II)',
    description: 'Located on the high ridges of the Chapada Diamantina in Bahia, it brings together 15 wind farms of Morro do Chapéu Sul I (172.0 MW) and Morro do Chapéu Sul II (352.8 MW), totaling 524.8 MW.'
  },
  'termica-gna-1': {
    riverOrRegion: 'Port of Açu (São João da Barra)',
    description: "Brazil's second-largest natural gas thermal plant. Runs in combined cycle on LNG received at the FSRU of the Açu port terminal.",
    turbinesOrUnits: '3 gas turbines + 1 steam turbine (Siemens)'
  },
  'termica-parnaiba': {
    name: 'Parnaíba Thermal Complex (Gas-to-Wire)',
    riverOrRegion: 'Santo Antônio dos Lopes (Parnaíba Basin)',
    description: "Latin America's pioneering integrated Reservoir-to-Wire (R2W) complex: 6 natural gas plants in operation (Maranhão III, IV and V, Nova Venécia 2, Parnaíba IV and Parnaíba V — 1,886.1 MW licensed) supplied by the onshore fields of the Parnaíba Basin.",
    turbinesOrUnits: 'Natural gas simple and combined cycles (6 plants in operation)'
  },
  'uhe-itumbiara': {
    riverOrRegion: 'Paranaíba River (Itumbiara / Araporã)',
    description: 'Largest hydro plant in the Furnas system by installed capacity and one of the largest earth/rockfill dams in the world, key to regulating the Paranaíba.'
  },
  'uhe-jupia': {
    riverOrRegion: 'Paraná River (Castilho / Três Lagoas)',
    description: 'Located on the Paraná River just downstream of the mouth of the Tietê River, it operates together with Ilha Solteira in the historic Urubupungá Complex.'
  },
  'uhe-itaparica': {
    riverOrRegion: 'São Francisco River (Petrolândia)',
    description: "Chesf's central scheme on the sub-middle São Francisco, whose reservoir regulates the flows that continue on to the Paulo Afonso and Xingó complex.",
    turbinesOrUnits: '6 x 246.6 MW (Francis)'
  },
  'uhe-agua-vermelha': {
    riverOrRegion: 'Grande River (Ouroeste / Iturama)',
    description: 'Largest plant in the Grande River basin, located near its confluence with the Paranaíba River that forms the Paraná River.'
  },
  'uhe-segredo': {
    riverOrRegion: 'Iguaçu River (Mangueirinha / Reserva do Iguaçu)',
    description: 'Large plant on the middle Iguaçu River with a 145-meter-high concrete-face rockfill dam.'
  },
  'uhe-salto-osorio': {
    riverOrRegion: "Iguaçu River (São Jorge d'Oeste / Quedas do Iguaçu)",
    description: 'Strategic intermediate link in the Iguaçu cascade, located downstream of Salto Santiago and upstream of Salto Caxias.',
    turbinesOrUnits: '6 Francis units'
  },
  'uhe-lajeado': {
    riverOrRegion: 'Tocantins River (Miracema do Tocantins / Lajeado)',
    description: 'Main scheme on the Tocantins River near the state capital Palmas, with high-flow Kaplan turbines and a waterway bypass channel.'
  },
  'uhe-campos-novos': {
    riverOrRegion: 'Canoas River (Campos Novos / Celso Ramos)',
    description: 'Has one of the highest concrete-face rockfill dams in the world (202 meters high), located in the Uruguay River basin.'
  },
  'uhe-tres-irmaos': {
    riverOrRegion: 'Tietê River (Pereira Barreto / Andradina)',
    description: 'Last and largest plant in the Tietê River cascade before it flows into the Paraná River, linked by a navigable canal to the Ilha Solteira reservoir.'
  },
  'uhe-sao-manoel': {
    riverOrRegion: 'Teles Pires River (Paranaíta / Jacareacanga)',
    description: 'Located downstream of UHE Teles Pires on the Mato Grosso–Pará border, it runs as run-of-river connected to the 500 kV transmission system.'
  },
  'uhe-barra-grande': {
    riverOrRegion: 'Pelotas River (Anita Garibaldi / Pinhal da Serra)',
    description: '185-meter-high dam at the head of the Pelotas/Uruguay River, delivering power directly into the 525 kV grid of the South subsystem.'
  },
  'uhe-cachoeira-dourada': {
    riverOrRegion: 'Paranaíba River (Cachoeira Dourada)',
    description: 'Historic plant originally designed to enable the construction of Brasília and its pioneering power supply in the 1950s.',
    turbinesOrUnits: '10 generating units (Kaplan)'
  },
  'uhe-capivara': {
    riverOrRegion: 'Paranapanema River (Taciba / Primeiro de Maio)',
    description: 'Largest hydro plant on the Paranapanema River by rated installed capacity, with a large storage and flood-attenuation reservoir.',
    turbinesOrUnits: '4 Francis units'
  },
  'uhe-peixe-angical': {
    riverOrRegion: 'Tocantins River (Peixe / São Salvador)',
    description: 'Run-of-river scheme on the upper/middle Tocantins, with Kaplan turbines operating under low heads and high seasonal flows.',
    turbinesOrUnits: '3 Kaplan units'
  },
  'uhe-tres-marias': {
    riverOrRegion: 'São Francisco River (Três Marias)',
    description: 'The historic headwater reservoir of the São Francisco River, key to the multi-year regulation of the basin and to keeping the river perennial down to the Northeast.'
  },
  'uhe-balbina': {
    riverOrRegion: 'Uatumã River (Presidente Figueiredo)',
    description: "Built in the 1980s to supply Manaus in the middle of the Amazon rainforest. Has one of the country's largest reservoir surface areas per installed MW."
  },
  'uhe-samuel': {
    riverOrRegion: 'Jamari River (Candeias do Jamari)',
    description: "Rondônia's first large hydro plant, key to building the regional grid before the arrival of the large Madeira River plants.",
    turbinesOrUnits: '5 Kaplan units'
  },
  'eolica-serra-do-mel': {
    name: 'Serra do Mel Wind Complex (Serra Branca Cluster)',
    description: 'One of the largest integrated wind clusters in the world, in the municipality of Serra do Mel (33 wind farms: Vamcruz, Serra Pará, Vila Acre/RN/PI/SE and VSM 1 to 4 — 1,047.7 MW licensed), benefiting from steady trade winds.'
  },
  'eolica-santa-vitoria': {
    name: 'Chuí / Campos Neutrais Wind Complex',
    description: "Brazil's southernmost wind cluster, on the southern border of Rio Grande do Sul by Lagoa Mirim, made up of 28 wind farms in the Geribatu (258 MW), Chuí (161.9 MW) and Hermenegildo (162.9 MW) sub-complexes, totaling 582.8 MW."
  },
  'eolica-ventos-araripe': {
    name: 'Ventos do Araripe III Wind Complex',
    operator: 'Auren Energia (developed by Casa dos Ventos)',
    description: 'Installed on top of the Chapada do Araripe (900 m altitude) on the PI/PE border, it brings together 14 wind farms (Ventos de Santo Estevão, Santo Augusto, Santo Onofre IV and São Virgílio) totaling 357.9 MW licensed.'
  },
  'eolica-coxilha-negra': {
    name: 'Coxilha Negra Wind Complex',
    riverOrRegion: 'Santana do Livramento (western border)',
    description: 'Strategic wind cluster in the pampas on the Brazil–Uruguay border, made up of the Coxilha Negra 2 (100.8 MW), Coxilha Negra 3 (105.0 MW) and Coxilha Negra 4 (96.6 MW) wind farms, totaling 302.4 MW and 72 wind turbines.'
  },
  'solar-mendubim': {
    name: 'Mendubim Solar Complex',
    description: 'Large PV plant in the Açu hub made up of 13 UFVs (Mendubim I to XIII) totaling 452.6 MW AC licensed (531 MWp DC), aimed at industrial self-supply (autoprodução) and the free market (ACL).'
  },
  'solar-sol-do-sertao': {
    name: 'Sol do Sertão Solar Complex',
    description: 'Large PV project in western Bahia made up of 8 UFVs (415.0 MW AC licensed / 474 MWp DC), connected to SE Bom Jesus da Lapa II.'
  },
  'solar-lar-do-sol': {
    name: 'Lar do Sol Solar Complex',
    description: 'Expansion of the Middle São Francisco solar hub in Pirapora, made up of 10 UFVs (Lar do Sol 1 to 10) of 49.5 MW AC each, totaling 495 MW AC licensed (~598 MWp DC) for industrial self-supply (autoprodução).'
  },
  'solar-arinos': {
    name: 'Arinos Solar Complex',
    riverOrRegion: 'Arinos (northwestern MG)',
    description: 'PV plant in northwestern Minas Gerais made up of 7 UFVs (Arinos 3, 5 to 7 and 18 to 20) of 48.12 MW AC each, totaling 336.8 MW AC licensed (~421 MWp DC) dedicated to steelmaking self-supply (autoprodução) and the free market (ACL).'
  },
  'termica-termomacao': {
    description: "One of the country's largest open-cycle natural gas thermal plants (900 MW licensed / 922.6 MW inspected in 20 aeroderivative turbines), offering fast start and peak support to the Southeast.",
    turbinesOrUnits: '20 GE LM6000 aeroderivative turbine-generators (simple cycle)'
  },
  'termica-jorge-lacerda': {
    name: 'Jorge Lacerda Thermal Complex',
    description: "Latin America's largest coal-fired thermal complex, made up of the Jorge Lacerda I and II (190 MW currently licensed), III (220 MW) and IV (330 MW) plants, totaling 740 MW currently licensed (857 MW historical installed).",
    turbinesOrUnits: 'Steam units (UTLA, UTLB and UTLC)'
  },
  'termica-maua-3': {
    riverOrRegion: 'Manaus (Industrial District)',
    description: "Manaus's main baseload thermal plant, fueled by natural gas from the Urucu-Coari-Manaus pipeline in the heart of the Amazon.",
    turbinesOrUnits: 'Combined cycle (2 gas turbines + 1 steam)'
  },
  'termica-baixada-fluminense': {
    description: 'Located at the logistics node of the Rio de Janeiro Metropolitan Arc, it generates in combined cycle from natural gas delivered by the Gasduc pipeline.',
    turbinesOrUnits: '1 gas turbine + 1 steam turbine'
  },
  'termica-cuiaba': {
    description: 'Connected to the Bolivia–Mato Grosso lateral gas pipeline, crucial for electrical stability and voltage control in the Center-West.',
    turbinesOrUnits: 'Natural gas combined cycle'
  },
  'termica-santa-cruz': {
    riverOrRegion: 'Rio de Janeiro (West Zone / Santa Cruz)',
    description: 'Historic thermal plant on Sepetiba Bay, upgraded to natural gas combined cycle for security of supply to the city of Rio.',
    turbinesOrUnits: 'Modern gas combined cycle'
  },
  'termica-termopernambuco': {
    riverOrRegion: 'Suape Industrial and Port Complex (Ipojuca)',
    description: "Located in the Suape Complex, it generates electricity in natural gas combined cycle (550 MW licensed / 532.9 MW inspected) to supply the coast and industrial hub of Pernambuco.",
    turbinesOrUnits: '2 gas turbines + 1 steam (GE / Alstom)'
  },
  'termica-candiota-3': {
    name: 'UTE Candiota III (Phase C)',
    description: "Located on the country's largest open-pit coal deposit, designed for baseload supply at the southern edge of the SIN.",
    turbinesOrUnits: '1 steam turbine-generator (pulverized coal)'
  },
  'biomassa-sao-martinho': {
    name: 'UTE São Martinho (Biomass)',
    description: 'Sugarcane bagasse cogeneration at the Pradópolis mill: it burns the crushing residue and exports the surplus to the grid during the harvest, which coincides with the dry season for the reservoirs.',
    turbinesOrUnits: 'High-pressure boilers and steam turbine-generators'
  }
};
