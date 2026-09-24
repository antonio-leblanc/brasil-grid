# ⚡ Brasil Grid (`brasil-grid`)
## Especificação Técnica, Arquitetura & Motivação do Projeto

> **Autor:** Antonio Leblanc  
> **Licença:** MIT (Open Source)  
> **Status:** Em desenvolvimento ativo  

---

## 🧭 1. A Motivação & A Gênese do Projeto

O **Brasil Grid** nasce de uma curiosidade intelectual e fascínio técnico de longa data pelo **Setor Elétrico Brasileiro (SEB)** e pela física do **Sistema Interligado Nacional (SIN)**. 

O Brasil opera uma das matrizes elétricas mais limpas, continentais e complexas do planeta:
* Cerca de **85%** da capacidade instalada centralizada é renovável (84,6% em jan/2026, ANEEL/SIGA).
* Uma Rede Básica de transmissão com mais de **175 mil km** de linhas (EPE, Anuário 2025, ano-base 2024) interligando do Amapá ao Rio Grande do Sul.
* Despacho hidrotérmico centralizado pelo **ONS**, com base em custos marginais de operação calculados pela cadeia NEWAVE/DECOMP/DESSEM, e intercâmbios de milhares de megawatts entre subsistemas distantes.
* Uma transição regulatória histórica: a abertura gradual do **Ambiente de Contratação Livre (ACL)**, que começou nos grandes consumidores e desde jan/2024 é acessível a todo o Grupo A (Portaria MME nº 50/2022; abaixo de 500 kW, via comercializador varejista).

### Por que construir esta ferramenta?
A maioria das informações geoespaciais e regulatórias do setor vive trancada em relatórios em PDF de centenas de páginas da EPE/ONS ou em portais estatais jurássicos e pesados (como o SIGEL da ANEEL).

O objetivo do **Brasil Grid** é preencher essa lacuna:
1. **Console Operacional Intuitivo:** Trazer a experiência de visualização geoespacial com desempenho de 60 FPS (WebGL) e estética de sala de controle (SCADA).
2. **Pedagogia Técnica:** Tornar acessíveis os modelos mentais de potência versus energia (de Watts a Terawatts-hora) e desmistificar a jornada física do elétron da turbina ao disjuntor.
3. **Engenharia de Borda & Mercado:** Mapear a interseção entre o fio físico regulado e a nova camada de software, telemetria de medição inteligente (*smart meters*) e inteligência de dados no mercado livre.

---

## 🏛️ 2. Os 4 Pilares Conceituais

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BRASIL-GRID ARCHITECTURE                        │
├───────────────────┬───────────────────┬────────────────┬───────────────┤
│ 1. TOPOLOGIA SIN  │ 2. CADEIA DO SEB  │ 3. MERCADO ACL │ 4. GRANDEZAS  │
│    (MapLibre WebGL│    (Geração ➔     │    (Regulação, │    (Potência  │
│     Linhões/Usinas│     Transmissão ➔ │     CCEE e     │     vs Energia│
│     e Subsistemas)│     Distribuição) │     Telemetria)│     W a TWh)  │
└───────────────────┴───────────────────┴────────────────┴───────────────┘
```

### Pilar 1: Topologia do SIN (Sistema Interligado Nacional)
* **Alta Tensão:** Visualização dos grandes troncos de escoamento:
  * **±800 kV UHVDC:** Os bipolos de corrente contínua de Belo Monte (Xingu–Estreito e Xingu–Terminal Rio, mais de 2.000 km cada; Xingu–Terminal Rio ~2.540 km).
  * **±600 kV HVDC:** Bipolos do Madeira e de Itaipu.
  * **500 kV / 525 kV / 765 kV CA:** A malha tronco que conecta os 4 subsistemas (Norte, Nordeste, Sudeste/Centro-Oeste e Sul).
* **Grandes Polos Geradores:** Itaipu Binacional (14 GW), Belo Monte (11,2 GW), Tucuruí (8,4 GW), CNAAA Angra 1 + 2 (2,0 GW), polos eólicos do semiárido e grandes parques solares de MG/BA.
* **Coordenação ONS:** Representação dos intercâmbios médios de potência entre subsistemas e parâmetros nominais de frequência da rede (60.00 Hz).

### Pilar 2: Cadeia de Valor do Setor Elétrico (SEB)
Decomposição dos quatro elos fundamentais com seus modelos de negócio e agentes reguladores:
1. **Geração:** Despacho hidrotermelétrico, sazonalidade de reservatórios e expansão solar/eólica.
2. **Transmissão:** Linhas de alta tensão remuneradas por disponibilidade (RAP — Receita Anual Permitida) sob contratos ANEEL de 30 anos.
3. **Distribuição:** Monopólios geográficos locais de média e baixa tensão remunerados por tarifas de uso da rede (TUSD).
4. **Comercialização:** Compra e venda de energia como ativo financeiro e contratos bilaterais no atacado/varejo.

### Pilar 3: Estrutura de Mercado (ACR vs. ACL)
* **ACR (Mercado Cativo):** Tarifa tabelada anual fixada pela ANEEL, com bandeiras tarifárias e monopólio da distribuidora local.
* **ACL (Mercado Livre):** Contratos bilaterais livremente negociados, registrados na **CCEE (Câmara de Comercialização de Energia Elétrica)**, com diferenças entre contratado e verificado liquidadas ao PLD no Mercado de Curto Prazo.
* **A Revolução da Telemetria:** Como o hardware de IoT na borda (*smart meters*) e a telemetria em tempo real substituem a leitura manual mensal de relógios analógicos, viabilizando o monitoramento contínuo de curva de carga e desagregação de consumo.

### Pilar 4: Ordens de Grandeza & Modelos Mentais
* **A Diferença Fundamental:**
  * **Potência (kW, MW, GW):** Taxa instantânea de fluxo elétrico (vazão do cano / velocímetro).
  * **Energia (kWh, MWh, GWh, TWh):** Volume total acumulado no tempo (água no reservatório / odômetro).
* **Escala Comparativa:**
  * **Watts (W):** Lâmpadas LED (~10W) e eletrônicos (~65W).
  * **Quilowatts (kW):** Chuveiro elétrico no inverno (~4,5 a 5,5 kW, Procel) e consumo residencial médio (~177 kWh/mês por unidade, EPE 2024).
  * **Megawatts (MW):** Supermercados (~1 MW), shopping centers (~5 MW) e usinas solares de geração distribuída.
  * **Gigawatts (GW):** Usinas estratégicas (Itaipu 14 GW, Belo Monte 11,2 GW) e recorde de demanda instantânea do SIN (106.532 MW, 26/02/2025).
  * **Terawatts-hora (TWh):** Consumo anual de eletricidade do país (~567 TWh/ano, EPE 2025).

---

## 🛠️ 3. Arquitetura de Software & Escolhas Técnicas

1. **100% Open Source & Zero Custos de API:**
   * Rejeição deliberada de serviços com limites pagos ou chaves de API proprietárias (como Mapbox).
   * Engine de renderização: **MapLibre GL JS** (fork open source do Mapbox GL JS v1, mantido pela comunidade MapLibre).
   * Basemap: **Esri World Dark Gray Canvas** (sem token de autenticação; exige atribuição Esri).
2. **Estética de Console de Operações (SCADA / Cockpit):**
   * Interface em tela cheia (*full-viewport*) inspirada em softwares de controle de missão (Electricity Maps, NASA C2, ONS COS).
   * Tipografia técnica (`JetBrains Mono`) para telemetria, potências e códigos de concessionária.
   * Drawer retrátil com vidros escuros foscos (*glassmorphism*) para consultas aprofundadas sem perder o contexto geográfico.
3. **Custo de Infraestrutura R$ 0,00 Perpétuo:**
   * Arquitetura SPA (Single Page Application) estática via **Vite + React + TypeScript + Tailwind CSS**.
   * Dados geoespaciais embutidos e otimizados via GeoJSON, sem dependência de banco de dados PostGIS ou servidor de aplicação backend para a visualização inicial.

---

## 📚 4. Fontes Oficiais de Dados

* **ONS (Operador Nacional do Sistema Elétrico):** [ons.org.br](https://www.ons.org.br) — Dados Abertos e Boletins Diários de Operação (BDO).
* **CCEE (Câmara de Comercialização de Energia Elétrica):** [ccee.org.br](https://www.ccee.org.br) — Regras de Comercialização e Indicadores do Mercado Livre.
* **ANEEL (Agência Nacional de Energia Elétrica):** [gov.br/aneel](https://www.gov.br/aneel) — SIGEL (Sistema de Informações Georreferenciadas do Setor Elétrico) e Banco de Informações de Geração (BIG).
* **EPE (Empresa de Pesquisa Energética):** [epe.gov.br](https://www.epe.gov.br) — Balanço Energético Nacional (BEN).

---
*Especificação mantida no repositório brasil-grid por Antonio Leblanc.*
