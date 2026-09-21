# ⚡ Brasil Grid (`brasil-grid`)
> **Explorador Visual, Topológico e Regulatório do Sistema Interligado Nacional (SIN) & Setor Elétrico Brasileiro (SEB)**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-6.10-blue?style=flat-square&logo=maplibre)](https://maplibre.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

---

## 🧭 Visão Geral

O **Brasil Grid** é uma aplicação web interativa em **Dark Mode (estética SCADA / Sala de Controle ONS)** projetada para desmistificar a engenharia de alta tensão, a geografia das renováveis e as transformações de mercado do setor elétrico no Brasil.

Construído 100% sobre tecnologias de código aberto (sem dependência de tokens proprietários como Mapbox), o projeto conecta **geoprocessamento em tempo real**, **modelos mentais físicos de energia** e **análise regulatória do Mercado Livre (ACL)** em uma interface ultra-rápida.

---

## 🏛️ Os 4 Pilares da Aplicação

### 1. 🗺️ Mapa Topológico do SIN (MapLibre GL + WebGL)
* **Motor:** MapLibre GL JS acelerado por GPU com basemap *ESRI Dark Gray Canvas* baseado em dados OpenStreetMap.
* **Malha de Transmissão:**
  * **±800 kV UHVDC (Corrente Contínua):** Os superlinhões de Belo Monte (Xingu ➔ Rio de Janeiro e Xingu ➔ Estreito) com ~2.500 km de extensão.
  * **500 kV / 765 kV (Malha Tronco CA):** A espinha dorsal interligando Norte, Nordeste, Sudeste/Centro-Oeste e Sul.
  * **230 kV:** Linhas regionais de escoamento.
* **Polos de Geração:** Itaipu (14 GW), Belo Monte (11.2 GW), Tucuruí (8.3 GW), Angra (1.9 GW), complexos eólicos e fazendas solares fotovoltaicas com auras pulsantes proporcionais à capacidade nominal.
* **Controles Interativos:** Filtros dinâmicos por nível de tensão e fonte de energia, tooltips com dados de concessionária/rio, e câmeras cinematográficas pré-calibradas.

### 2. ⚡ A Cadeia de Valor (Geração ➔ Transmissão ➔ Distribuição ➔ Comercialização)
* Auditoria dos quatro elos do setor elétrico brasileiro.
* Análise comparativa de modelos de remuneração (Leilões ANEEL, RAP, TUSD e Contratos Bilaterais).
* Mapeamento dos grandes players nacionais (Eletrobras, Engie, Taesa, ISA CTEEP, Light, Enel, Equatorial, Comerc, Auren).

### 3. 📊 Estrutura de Mercado: ACR (Cativo) vs. ACL (Mercado Livre)
* Matriz interativa detalhando a abertura do mercado elétrico.
* Regulação da CCEE e cronograma de desregulamentação (migração integral do Grupo A em jan/2024 e o futuro Grupo B residencial).
* **Smart Metering & IoT na Borda:** Como os medidores digitais e a telemetria em alta frequência transformam a gestão de faturas, a detecção de anomalias e a curva de carga no ACL.

### 4. 📐 Régua de Grandezas: Desmistificando Watts (W a TWh)
* Esclarecimento conceitual entre **Potência** (kW, MW, GW — taxa instantânea) e **Energia** (kWh, MWh, GWh — volume acumulado no tempo).
* Comparador de escalas do dia a dia: do chuveiro elétrico (~5.5 kW) e conta residencial (~200 kWh/mês) ao pico do SIN brasileiro (~105 GW) e consumo anual do país (~540 TWh).

> Para a visão detalhada, motivação e arquitetura completa, consulte [`docs/spec.md`](./docs/spec.md).

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Função |
|---|---|---|
| **Engine Cartográfica** | `maplibre-gl` | Renderização vetorial e WebGL 60fps sem tokens pagos |
| **Tiles de Fundo** | `ESRI Basemaps` | Dark Gray Canvas tiles livres de alta performance |
| **Framework Web** | `React 19` + `Vite 8` + `TypeScript` | SPA estática com bundle ultracompacto |
| **Estilização** | `Tailwind CSS v4` | Design system SCADA com contraste de néons |
| **Ícones** | `lucide-react` | Iconografia vetorial limpa |
| **Dados** | GeoJSON Estático | Sem dependência de banco de dados ou backend |

---

## 🚀 Como Rodar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/antonio-leblanc/brasil-grid.git
cd brasil-grid

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev

# 4. Compilar para produção
npm run build
```

---

## 📚 Fontes de Dados & Referências Oficiais

* [ONS — Operador Nacional do Sistema Elétrico](https://www.ons.org.br) (Portal de Dados Abertos e Boletins Diários de Operação)
* [CCEE — Câmara de Comercialização de Energia Elétrica](https://www.ccee.org.br) (Regras de Comercialização e Dados do ACL)
* [ANEEL — Agência Nacional de Energia Elétrica](https://www.gov.br/aneel) (SIGEL — Sistema de Informações Georreferenciadas do Setor Elétrico)
* [EPE — Empresa de Pesquisa Energética](https://www.epe.gov.br) (Balanço Energético Nacional - BEN)

---

## 📄 Licença

Distribuído sob a licença **MIT**. Desenvolvido por [Antonio Leblanc](https://github.com/antonio-leblanc).
