# TODO — Brasil Grid

> Só pendências. Histórico fica no git; diagnóstico em [`docs/code-health.md`](docs/code-health.md).
> Cada item é independente: leia o item inteiro e os arquivos citados antes de começar. Itens de feature exigem plano aprovado (`AGENTS.md` §5.1).

## P0 — Proveniência dos dados

- [ ] **Corrigir o veredito no [`docs/data-audit-log.md`](docs/data-audit-log.md).**
  - As duas entradas "Linhas Tronco Tier 3" e a entrada "Usinas Hidrelétricas — Lote 1" passam de "✅ Aprovado" para "⚠️ Fonte genérica (home page)".
  - Trocar `HEAD` pelo hash real (`d5ac39a` nas linhas; conferir o das usinas com `git log -S`).
  - Regra daqui em diante: o audit-log nunca registra `HEAD`, só o hash.

- [ ] **Selo "não verificada" para as entidades da `ROOT_URL_DEBT`** (decisão: não remover as linhas).
  - Adicionar `verification: 'verified' | 'unverified'` em `TransmissionLineFeature` e `PowerPlantFeature` ([`gridData.ts`](src/data/gridData.ts)).
  - Exibir no [`NodeInspector`](src/components/Inspector/NodeInspector.tsx) um selo discreto (âmbar, monoespaçado), no mesmo espírito do `REF` da telemetria.
  - Fazer o [`sources.test.ts`](src/data/sources.test.ts) exigir `unverified` para toda entidade da `ROOT_URL_DEBT`.

- [ ] **Quitar a `ROOT_URL_DEBT` das 36 linhas Tier 3** ([`transmissionLinesData.ts`](src/data/transmissionLinesData.ts)).
  - Fonte de conferência: cadastro de linhas do ONS ([dados.ons.org.br/dataset/linha-transmissao](https://dados.ons.org.br/dataset/linha-transmissao)), que traz tensão, extensão e subestações terminais. Complementar com o SIGEL e os PAR/PEL do ONS (link para o PDF, não para a home).
  - Para cada linha: conferir `voltageKV`, `lengthKm` e as SEs terminais; trocar as fontes por links profundos; mudar para `verified`; remover o id da `ROOT_URL_DEBT`.
  - Suspeita forte nos comprimentos: quase todos são múltiplos de 10 km.
  - A linha que não for encontrada no cadastro fica `unverified` e é anotada no audit-log.

- [ ] **Quitar a `ROOT_URL_DEBT` das 16 UHEs do Lote 1** ([`powerPlantsData.ts`](src/data/powerPlantsData.ts)).
  - As usinas já têm CEG. Trocar `https://siga.aneel.gov.br/` pelo dataset do SIGA nos dados abertos da ANEEL (link direto para o dataset) e manter o CEG como chave de conferência.

- [ ] **Auditoria dos Lotes 2 e 3 de usinas** (56 usinas sem `sources`).
  - Checklists no [`data-audit-log.md`](docs/data-audit-log.md): Lote 2 (23 UHEs), Lote 3 (33 térmicas, nuclear, eólicas, solares).
  - Ao terminar, tornar `sources` obrigatório em `PowerPlantFeature`, para o TypeScript travar novas usinas sem fonte.

- [ ] **Trocar fontes secundárias por primárias** onde houver Wikipedia ou imprensa como única fonte (`grep -ri wikipedia src/data`).

- [ ] **Registrar a regra do link profundo no [`AGENTS.md`](AGENTS.md) §5.4:** "fonte = documento, ficha ou dataset específico; home page é rejeitada pelo `sources.test.ts`".

## P1 — Honestidade da interface

- [ ] **Camada "Fluxo".** Hoje `lines-flow` em [`GridMap.tsx`](src/components/Map/GridMap.tsx) é um tracejado estático, e o sentido sairia da ordem das coordenadas.
  - Recomendado: remover a camada, o toggle e o item "Fluxo Ativo" da legenda até existir dado real.
  - Versão futura: sentido e intensidade derivados do intercâmbio verificado do ONS, animados via `line-dasharray` só nos corredores de fronteira.

- [ ] **Filtro de tecnologia no lugar do "±800 kV".** Trocar por "CC" (`type === 'CC'`), que inclui os bipolos de ±600 kV (Itaipu, Madeira) hoje escondidos.
  - Extrair um único predicado (ex.: `src/data/gridFilters.ts`) usado pelo [`ConsoleSidebar`](src/components/Console/ConsoleSidebar.tsx) e pela expressão do MapLibre, com teste.
  - Manter compatibilidade do parâmetro `?v=` na URL ([`App.tsx`](src/App.tsx)).

- [ ] **Legenda sob demanda.** Substituir a legenda fixa do canto inferior esquerdo ([`App.tsx`](src/App.tsx)) por um botão "?" que abre a legenda completa, incluindo 440 kV, 230 kV, térmica e nuclear.

## P1 — Densidade visual (informação sob demanda)

Critério: um elemento só fica permanente na tela se responde a uma pergunta física que o usuário já fez.

- [ ] **Hover só com o nome** do ativo; a ficha fica no inspetor, aberto no clique ([`GridMap.tsx`](src/components/Map/GridMap.tsx)).
- [ ] **Reduzir as camadas de linha** de 3 para 2: `lines-main` + destaque da selecionada. O glow sai.
- [ ] **Enxugar o [`InterchangeModal`](src/components/Interchange/InterchangeModal.tsx):** visão inicial com carregamento (%) e margem por fronteira; gráfico 24h e dossiê atrás de clique.
- [ ] **Enxugar o Modo Guia** ([`SinDossiersSection`](src/components/Dossiers/SinDossiersSection.tsx), [`ValueChainSection`](src/components/EnergyChain/ValueChainSection.tsx)): parágrafo vira métrica monoespaçada ou linha com termo em negrito (`AGENTS.md` §5.5).

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
