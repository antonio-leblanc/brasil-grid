# TODO — Brasil Grid

> Só pendências. Histórico fica no git; diagnóstico em [`docs/code-health.md`](docs/code-health.md).
> Cada item é independente: leia o item inteiro e os arquivos citados antes de começar. Itens de feature exigem plano aprovado (`AGENTS.md` §5.1).

## P0 — Proveniência dos dados

- [x] **Corrigir o veredito no [`docs/data-audit-log.md`](docs/data-audit-log.md).**
  - Entrada do "Lote 1 de usinas" retificada para "⚠️ Fonte genérica (home page)".
  - Troca de `HEAD` pelo hash real dos commits (`8e7cf83` nas usinas, `d5ac39a` nas linhas).
  - Regra mantida: o audit-log nunca registra `HEAD`, só o hash.

- [x] **Quitar a `ROOT_URL_DEBT` das 36 linhas Tier 3** ([`transmissionLinesData.ts`](src/data/transmissionLinesData.ts)).
  - Base oficial auditada: cadastro da Rede Básica do ONS ([`LINHA_TRANSMISSAO.csv`](https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv)).
  - As 36 linhas tiveram `voltageKV`, `lengthKm`, `nom_agenteproprietario` e códigos de equipamento ONS retificados com links profundos.
  - As 36 entidades foram removidas de `ROOT_URL_DEBT` em [`sources.test.ts`](src/data/sources.test.ts) (dívida reduzida de 52 para 16).

- [x] **Selo "não verificada" para as entidades restantes da `ROOT_URL_DEBT`** (16 UHEs do Lote 1).
  - Adicionado `verification?: 'verified' | 'unverified'` em `PowerPlantFeature` e `TransmissionLineFeature` ([`gridData.ts`](src/data/gridData.ts)).
  - Exibido no [`NodeInspector`](src/components/Inspector/NodeInspector.tsx) selo discreto (âmbar, monoespaçado `[NÃO AUDITADA]`).
  - Implementada validação no [`sources.test.ts`](src/data/sources.test.ts).

- [x] **Quitar a `ROOT_URL_DEBT` das 16 UHEs do Lote 1** ([`powerPlantsData.ts`](src/data/powerPlantsData.ts)).
  - As 16 usinas foram atualizadas com o link direto do dataset SIGA nos dados abertos da ANEEL e cadastro ONS, com CEG mantido como identificador canônico.
  - `ROOT_URL_DEBT` esvaziada em [`sources.test.ts`](src/data/sources.test.ts) (dívida reduzida a 0).

- [x] **Auditoria dos Lotes 2 e 3 de usinas** (56 usinas auditadas).
  - 23 UHEs do Lote 2 e 33 usinas do Lote 3 (nuclear, térmicas, eólicas, solares, biomassa) auditadas contra o CSV oficial da ANEEL (`siga-empreendimentos-geracao.csv`) e registradas no [`data-audit-log.md`](docs/data-audit-log.md).
  - Atributo `sources: SourceRef[]` tornado obrigatório em `PowerPlantFeature` ([`gridData.ts`](src/data/gridData.ts)).

- [x] **Trocar fontes secundárias por primárias** onde houver Wikipedia ou imprensa como única fonte.
  - Expurgados todos os 10 links da Wikipedia em [`transmissionLinesData.ts`](src/data/transmissionLinesData.ts) (Bipolos Belo Monte, Madeira, Itaipu HVDC/765 kV, Linhão de Tucuruí, Norte-Sul, Graça Aranha–Silvânia, Porto de Sergipe–Jardim) e substituídos por cadastros ONS/EPE/ANEEL.

- [x] **Registrar a regra do link profundo no [`AGENTS.md`](AGENTS.md) §5.4:** "fonte = documento, ficha ou dataset específico; home page é rejeitada pelo `sources.test.ts`".

## P1 — Honestidade da interface

- [x] **Camada "Fluxo".** Removida a camada `lines-flow` e o toggle `showPowerFlow` em [`GridMap.tsx`](src/components/Map/GridMap.tsx), [`ConsoleSidebar.tsx`](src/components/Console/ConsoleSidebar.tsx) e [`App.tsx`](src/App.tsx), eliminando animações fictícias sem telemetria real de linha.
- [x] **Filtro de tecnologia no lugar do "±800 kV".** Substituído por "CC (HVDC)" (`type === 'CC'`), revelando os bipolos de ±600 kV de Itaipu e Madeira.
  - Predicado TypeScript e expressão MapLibre unificados em [`gridFilters.ts`](src/data/gridFilters.ts) com suíte de testes em [`gridFilters.test.ts`](src/data/gridFilters.test.ts).
  - Compatibilidade legada preservada para `?v=800` via `normalizeLineFilter()` em [`App.tsx`](src/App.tsx).
- [x] **Legenda sob demanda.** Substituída a legenda fixa permanente por um botão flutuante `? / Legenda` em [`App.tsx`](src/App.tsx) que abre popover técnico completo (CC ±800/±600 kV, CA 765/500 kV, CA 440/230 kV, UHE, UFV, EOL, UTN, UTE e subsistemas).

## P1 — Densidade visual (informação sob demanda)

Critério: um elemento só fica permanente na tela se responde a uma pergunta física que o usuário já fez.

- [x] **Hover só com o nome** do ativo em [`GridMap.tsx`](src/components/Map/GridMap.tsx); a ficha técnica completa fica reservada ao clique via [`NodeInspector`](src/components/Inspector/NodeInspector.tsx).
- [x] **Reduzir as camadas de linha** de 3 para 2: `lines-main` + destaque de seleção `lines-selected`. Camadas cosméticas `lines-glow` e `lines-flow` expurgadas.
- [x] **Enxugar o [`InterchangeModal`](src/components/Interchange/InterchangeModal.tsx):** visão inicial com carregamento (%) e margem operativa livre destacados em primeiro plano; gráfico 24h e dossiê físico acessíveis sob demanda por clique.
- [x] **Enxugar o Modo Guia** ([`SinDossiersSection`](src/components/Dossiers/SinDossiersSection.tsx), [`ValueChainSection`](src/components/EnergyChain/ValueChainSection.tsx)): parágrafos narrativos prolixos convertidos em métricas monoespaçadas, sínteses operativas de alta densidade e termos-chave em negrito (`AGENTS.md` §5.5).

## P2 — Robustez

- [ ] **Expor o motivo do fallback da telemetria.** Fazer `fetchOnsTelemetry` ([`onsApi.ts`](src/services/onsApi.ts)) devolver `{ data, fallbackReason }` e mostrar o motivo no tooltip do selo `REF`.
- [ ] **Snapshot da ONS gerado na CI.** Criar uma GitHub Action agendada que baixa a carga verificada e publica um JSON estático no Pages. Ela vira a fonte secundária antes do snapshot sintético e elimina a dependência do CORS.
- [ ] **Desacoplar a UI do simulador da física** ([`DispatchSimulatorModal.tsx`](src/components/Simulator/DispatchSimulatorModal.tsx)).
  - Física em `stateRef` a cada frame; `setSimState` limitado a 10–15 Hz.
  - Histórico em ring buffer (ref), sem copiar o array a cada ponto.
  - O strip chart em Canvas lê direto do buffer.

## P3 — DX e arquitetura

- [ ] **Mover o GeoJSON dos subsistemas** de [`subsystemsGeoData.ts`](src/data/subsystemsGeoData.ts) para `public/geo/subsystems.geojson`, carregado via `fetch` (MapLibre aceita URL no `source.data`).
- [ ] **Quebrar o [`GridMap.tsx`](src/components/Map/GridMap.tsx)** em hooks por camada (`useSubsystemLayers`, `useLineLayers`, `usePlantLayers`) e um hook de popup.
- [ ] **Remover o alias morto** `liveGridTelemetry` de [`gridData.ts`](src/data/gridData.ts).
- [ ] **Avaliar PMTiles próprio** como alternativa aos tiles ESRI (termos de uso e limites).

## Dados — expansão (depois do P0)

- [ ] Linhas ainda não representadas: circuitos 2 e 3 da Norte–Sul, elos com o Uruguai (Rivera, Melo). Só entram com fonte profunda e `verified`.
- [ ] Exportação GeoJSON/CSV dos ativos filtrados na tela.
