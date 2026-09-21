# ⚡ Brasil Grid (`brasil-grid`)
## Especificação Técnica, Arquitetura & Motivação do Projeto

> **Autor:** Antonio Leblanc  
> **Licença:** MIT (Open Source)  
> **Status:** Em desenvolvimento ativo  

---

## 🧭 1. A Motivação & A Gênese do Projeto

O **Brasil Grid** nasce de uma curiosidade intelectual e fascínio técnico de longa data pelo **Setor Elétrico Brasileiro (SEB)** e pela física do **Sistema Interligado Nacional (SIN)**. 

O Brasil opera uma das matrizes elétricas mais limpas, continentais e complexas do planeta:
* Mais de **84%** da capacidade instalada é renovável.
* Uma malha de transmissão com mais de **185 mil km** de circuitos interligando do Amapá ao Rio Grande do Sul.
* Despacho hidrotermelétrico centralizado em tempo real pelo **ONS**, com fluxos massivos de milhares de megawatts escoando entre bacias hidrográficas distantes.
* Uma transição regulatória histórica: a abertura gradual do **Mercado Livre de Energia (ACL)**, que começou nas grandes indústrias, atingiu todo o Grupo A (média/alta tensão) em 2024 e se prepara para o mercado residencial.

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
  * **±800 kV UHVDC:** Os linhões de corrente contínua de Belo Monte (Xingu-Rio e Xingu-Estreito, ~2.500 km cada).
  * **500 kV / 765 kV CA:** A malha tronco que conecta os 4 subsistemas (Norte, Nordeste, Sudeste/Centro-Oeste e Sul).
* **Grandes Polos Geradores:** Itaipu Binacional (14 GW), Belo Monte (11.2 GW), Tucuruí (8.3 GW), CNAAA Angra Nuclear (1.9 GW), polos eólicos do semiárido e grandes parques solares de MG/BA.
* **Coordenação ONS:** Representação dos intercâmbios médios de potência entre subsistemas e parâmetros nominais de frequência da rede (60.00 Hz).

### Pilar 2: Cadeia de Valor do Setor Elétrico (SEB)
Decomposição dos quatro elos fundamentais com seus modelos de negócio e agentes reguladores:
1. **Geração:** Despacho hidrotermelétrico, sazonalidade de reservatórios e expansão solar/eólica.
2. **Transmissão:** Linhas de alta tensão remuneradas por disponibilidade (RAP — Receita Anual Permitida) sob contratos ANEEL de 30 anos.
3. **Distribuição:** Monopólios geográficos locais de média e baixa tensão remunerados por tarifas de uso da rede (TUSD).
4. **Comercialização:** Compra e venda de energia como ativo financeiro e contratos bilaterais no atacado/varejo.

### Pilar 3: Estrutura de Mercado (ACR vs. ACL)
* **ACR (Mercado Cativo):** Tarifa tabelada anual fixada pela ANEEL, com bandeiras tarifárias e monopólio da distribuidora local.
* **ACL (Mercado Livre):** Negociação bilateral livre, liquidação e registro pela **CCEE (Câmara de Comercialização de Energia Elétrica)**, permitindo economia média de 15% a 35%.
* **A Revolução da Telemetria:** Como o hardware de IoT na borda (*smart meters*) e a telemetria em tempo real substituem a leitura manual mensal de relógios analógicos, viabilizando o monitoramento contínuo de curva de carga e desagregação de consumo.

### Pilar 4: Ordens de Grandeza & Modelos Mentais
* **A Diferença Fundamental:**
  * **Potência (kW, MW, GW):** Taxa instantânea de fluxo elétrico (vazão do cano / velocímetro).
  * **Energia (kWh, MWh, GWh, TWh):** Volume total acumulado no tempo (água no reservatório / odômetro).
* **Escala Comparativa:**
  * **Watts (W):** Lâmpadas LED (~10W) e eletrônicos (~65W).
  * **Quilowatts (kW):** Chuveiro elétrico no inverno (~5.5 a 7.5 kW) e conta residencial típica (~200 kWh/mês).
  * **Megawatts (MW):** Supermercados (~1 MW), shopping centers (~5 MW) e usinas solares de geração distribuída.
  * **Gigawatts (GW):** Usinas estratégicas (Itaipu 14 GW, Belo Monte 11.2 GW) e pico histórico de demanda do Brasil (~105 GW).
  * **Terawatts-hora (TWh):** Consumo anual de eletricidade do país (~540 TWh/ano).

---

## 🛠️ 3. Arquitetura de Software & Escolhas Técnicas

1. **100% Open Source & Zero Custos de API:**
   * Rejeição deliberada de serviços com limites pagos ou chaves de API proprietárias (como Mapbox).
   * Engine de renderização: **MapLibre GL JS** (fork livre mantido pela Linux Foundation).
   * Basemap: **ESRI Dark Gray Canvas** (livre de marcas d'água e tokens de autenticação).
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
