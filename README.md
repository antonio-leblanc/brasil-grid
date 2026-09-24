# ⚡ Brasil Grid (`brasil-grid`)
> **Laboratório Educativo Aberto & Simulador Interativo do Sistema Interligado Nacional (SIN) & Setor Elétrico Brasileiro (SEB)**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-6.10-blue?style=flat-square&logo=maplibre)](https://maplibre.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

---

## 🧭 Visão Geral & Propósito Educativo

O **Brasil Grid** é um **laboratório aberto de aprendizado e exploração técnica**, construído para decodificar a física, a operação e a regulação de um dos maiores sistemas elétricos interligados do mundo, de matriz predominantemente renovável.

Em vez de ferramentas comerciais ou relatórios estáticos em PDF de centenas de páginas (ONS, EPE, ANEEL), o projeto traduz a dinâmica do setor em uma interface interativa de alta performance com estética de sala de controle (SCADA):
* **Física da Rede & Estabilidade:** Entenda inércia mecânica, frequência (60 Hz), despacho hidrotérmico e contingências.
* **Gargalos & Geografia:** Visualize como blocos de vários gigawatts escoam entre subsistemas e por que ocorrem cortes de geração (*curtailment*).
* **Modelos Mentais:** Aprenda a diferença real entre potência e energia, e como a água armazenada nos reservatórios define o preço da eletricidade no Brasil.

---

## 🏛️ Os 4 Pilares da Aplicação

### 1. 🗺️ Mapa Topológico do SIN (MapLibre GL + WebGL)
* **Motor:** MapLibre GL JS acelerado por GPU com basemap *Esri World Dark Gray Canvas* (sem token de API; exige atribuição Esri).
* **Malha de Transmissão:**
  * **±800 kV UHVDC (Corrente Contínua):** Os bipolos de Belo Monte (Xingu ➔ Estreito/MG e Xingu ➔ Terminal Rio/RJ), com mais de 2.000 km cada (Xingu–Terminal Rio: ~2.540 km).
  * **±600 kV HVDC:** Bipolos do Madeira (Porto Velho ➔ Araraquara) e de Itaipu (Foz do Iguaçu ➔ Ibiúna).
  * **500 kV / 525 kV / 765 kV (Malha Tronco CA):** A espinha dorsal interligando Norte, Nordeste, Sudeste/Centro-Oeste e Sul.
  * **230 kV / 440 kV:** Linhas regionais selecionadas.
* **Polos de Geração:** Itaipu (14 GW), Belo Monte (11,2 GW), Tucuruí (8,4 GW), Angra 1 + 2 (2,0 GW), complexos eólicos e fazendas solares fotovoltaicas com auras pulsantes proporcionais à capacidade nominal.
* **Controles Interativos:** Filtros dinâmicos por nível de tensão e fonte de energia, tooltips com dados de concessionária/rio, e câmeras cinematográficas pré-calibradas.

### 2. ⚡ A Cadeia de Valor (Geração ➔ Transmissão ➔ Distribuição ➔ Comercialização)
* Auditoria dos quatro elos do setor elétrico brasileiro.
* Análise comparativa de modelos de remuneração (Leilões ANEEL, RAP, TUSD e Contratos Bilaterais).
* Mapeamento dos grandes players nacionais (Eletrobras, Engie, Taesa, ISA CTEEP, Light, Enel, Equatorial, Comerc, Auren).

### 3. 📚 Dossiês Técnicos do SIN
* Anatomia da perturbação de 15/08/2023 (abertura da LT 500 kV Quixadá–Fortaleza II, desempenho do controle de tensão de parques eólicos/solares abaixo do previsto nos modelos, separação do SIN e atuação do ERAC).
* O custo futuro da água e a formação de CMO/PLD pela cadeia de modelos NEWAVE, DECOMP e DESSEM.
* Complementados pelo **Simulador 60 Hz** (equação de swing agregada, regulação primária, ERAC e curva P(f) de IBRs), pela **Curva de Carga 24h** (Dados Abertos ONS) e pelo painel de **Intercâmbios Regionais**.

### 4. 📐 Régua de Grandezas: Desmistificando Watts (W a TWh)
* Esclarecimento conceitual entre **Potência** (kW, MW, GW — taxa instantânea) e **Energia** (kWh, MWh, GWh — volume acumulado no tempo).
* Comparador de escalas do dia a dia: do chuveiro elétrico (~5,5 kW) e consumo residencial médio (~177 kWh/mês por unidade, EPE 2024) ao recorde de demanda instantânea do SIN (106.532 MW, 26/02/2025) e ao consumo anual do país (~567 TWh, EPE 2025).

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

> ℹ️ **Transparência de Telemetria:** A curva de carga (carga global, supervisionada e MMGD) é lida da API de Dados Abertos do ONS (Carga Verificada, com cache e *fallback* para um snapshot sintético quando a API está indisponível). Frequência, intercâmbios e composição da matriz exibidos no console são **snapshots de referência** para fins educacionais, não telemetria em tempo real. O simulador 60 Hz é um modelo didático de barra única, com parâmetros ilustrativos.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Desenvolvido por [Antonio Leblanc](https://github.com/antonio-leblanc).
