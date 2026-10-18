# brasil-grid

Laboratório aberto pra entender o Sistema Interligado Nacional (SIN) e o setor elétrico brasileiro com dados públicos do ONS, da EPE, da CCEE e da ANEEL: onde estão as linhas e as usinas, como a frequência reage quando uma usina cai e por que o preço da energia passou a depender da hora do dia.

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

## O que tem no app

São duas abas: **Mapa** e **Sistema**.

### Mapa

A malha de transmissão e os grandes polos de geração do SIN, sobre MapLibre GL.

- **Transmissão:** os bipolos de ±800 kV de Belo Monte (Xingu–Estreito e Xingu–Terminal Rio, ~2.540 km), os de ±600 kV do Madeira e de Itaipu, a malha tronco de 500–765 kV e linhas regionais de 230–440 kV selecionadas.
- **Geração:** Itaipu (14 GW), Belo Monte (11,2 GW), Tucuruí (8,5 GW), Angra 1 e 2 (2,0 GW), complexos eólicos e solares. O tamanho do ponto acompanha a capacidade instalada.
- Filtro por tensão e por fonte, contorno dos 4 subsistemas do ONS e ficha de cada usina e linha com a fonte do dado.

### Sistema

| Grupo | Seção | O que mostra |
|---|---|---|
| Operação | Intercâmbios | Fluxo entre subsistemas contra o limite de cada interface, e o gargalo por trás de cada uma |
| Operação | Simulador 60 Hz | Equação de swing agregada, regulação primária, ERAC e curva P(f) dos inversores, sobre um dia verificado do SIN com a MMGD separada da solar centralizada |
| Mercado | Preço | CMO do Sudeste a partir dos dados do ONS: a curva do pato (CMO das 18h ÷ meio-dia, ~2× em 2024 e ~7× em 2026), EAR × CMO e custo de modulação |
| Referência | Cadeia de valor do SEB | Geração, transmissão, distribuição e comercialização: como cada elo é remunerado e quem são os grandes grupos |
| Referência | Dossiês do SIN | A perturbação de 15/08/2023 e a formação do CMO/PLD por NEWAVE, DECOMP e DESSEM |
| Referência | Régua de grandezas | Potência × energia, do chuveiro (~5,5 kW) ao recorde de demanda do SIN (106.532 MW, 26/02/2025) |

## O que é dado real e o que é ilustrativo

- **Real, ao vivo:** a carga do SIN no header vem da API de Dados Abertos do ONS (Carga Verificada), com cache. Se a API cair, usa um snapshot de referência.
- **Real, exportado:** o dia verificado do simulador (`scripts/export-simulator-day.mjs`, Balanço de Energia do ONS) e as séries da seção Preço (`pipeline/`, CMO, EAR e curva de carga do ONS).
- **Snapshot de referência:** frequência, intercâmbios e mix de geração do console.
- **Modelo didático:** o simulador é de barra única, com parâmetros ilustrativos.

Usinas, linhas e limites têm fonte primária no código (`sources`) e no registro de proveniência em [`docs/data-audit-log.md`](./docs/data-audit-log.md). Visão e arquitetura em [`docs/spec.md`](./docs/spec.md).

## Rodar localmente

```bash
git clone https://github.com/antonio-leblanc/brasil-grid.git
cd brasil-grid
npm install
npm run dev     # servidor de desenvolvimento
npm test        # testes (vitest)
npm run build   # build de produção
```

Pra atualizar os dados da seção Preço, ver [`pipeline/README.md`](./pipeline/README.md) (Python com `uv`).

## Stack

React 19, TypeScript, Vite e Tailwind CSS v4. Mapa em MapLibre GL com basemap Esri World Dark Gray Canvas (sem token, com atribuição Esri). Gráficos em SVG nativo, sem biblioteca de chart. Sem backend: dados estáticos mais a API aberta do ONS.

## Fontes

- [ONS](https://dados.ons.org.br): dados abertos de carga, CMO, EAR e balanço de energia
- [CCEE](https://www.ccee.org.br): regras de comercialização e PLD
- [ANEEL](https://www.gov.br/aneel): SIGEL, cadastro georreferenciado de usinas e linhas
- [EPE](https://www.epe.gov.br): Balanço Energético Nacional

## Licença

MIT. Feito por [Antonio Leblanc](https://github.com/antonio-leblanc).
