# TODO — Brasil Grid

> Lista de próximos passos. Cada item é escrito pra ser pego de forma independente, por qualquer agente/dev sem contexto prévio — leia o item inteiro (e os arquivos citados) antes de começar.

## Dados

- [x] **Mais linhas de transmissão.** 15→30 linhas tronco (+15 novos corredores estratégicos incluindo Bipolo Itaipu HVDC 600kV, Tronco Norte-Sul 500kV, Teles Pires, escoamento de renováveis NE/BA/RN/PB, corredores do Sul 525kV, Trans-Cerrado e Linhão UHVDC 800kV Graça Aranha-Silvânia).
- [x] **Censo Tier 2 de Usinas Estruturantes do SIN.** 26→72 usinas cobrindo todo o parque gerador de grande porte (>85% da matriz brasileira em 39 hidrelétricas, 10 complexos eólicos, 9 parques solares, 13 térmicas/biomassa e central nuclear).

## Code health (detalhe completo em `docs/code-health.md`)

- [x] **Transparência de telemetria:** Renomeado `liveGridTelemetry` para `referenceGridSnapshot` em `src/data/gridData.ts` e estampados selos de referência técnica na UI (`ConsoleHeader` e `ConsoleBottomBar`), com transparência formalizada no README.
- [x] Trocar os markers de usina por camada GeoJSON nativa do MapLibre (`circle`/`symbol`) processada diretamente pela GPU via WebGL, com setFilter instantâneo e tooltips dinâmicos.
- [x] **CI Automatizado & Deploy GitHub Pages (GitHub Actions):** Workflow `.github/workflows/ci.yml` com `npm run lint` + `npm run build` e pipeline de publicação no GitHub Pages via `actions/deploy-pages` com `base` configurada em `vite.config.ts`.
- [x] Refletir aba ativa, usina/linha selecionada e filtros na URL com sincronização bidirecional, histórico do navegador (`popstate`), câmera `flyTo` automática e botão "Compartilhar" no inspetor.
- [ ] Extrair um componente `FilterButton` reutilizável em `ConsoleSidebar.tsx` pra reduzir a repetição de classes Tailwind condicionais (o `clsx` já está instalado como dependência mas não é usado em nenhum lugar do código ainda).
- [ ] Revisão de acessibilidade: `aria-label` nos botões só-de-ícone, navegação por teclado nos markers do mapa.

## Sem pressa / quando fizer sentido

- [x] Deploy no GitHub Pages (SPA estática com `vite.config.ts` adaptado para `base: /brasil-grid/` e workflow automatizado no GitHub Actions).
- [ ] Integração com dado real (ONS/ANEEL/SIGEL) no lugar do estático — decisão consciente de adiar por enquanto, não fazer sem alinhar antes.

## Concluído recentemente (referência)

- [x] Camada GeoJSON nativa WebGL no MapLibre (GPU) com filtros instantâneos sem overhead no DOM
- [x] Deep Linking completo e sincronização de estado na URL (?plant, ?line, ?tab, ?type, ?v) + botão Compartilhar
- [x] Censo Tier 2 completo do SIN: 72 usinas estratégicas (hidro, solar, eólica, térmica, nuclear) e 30 linhas tronco de transmissão
- [x] Expansão massiva de dado: 26→38 usinas (+12) e 15→30 linhas tronco (+15) integrando malha nacional e todos os subsistemas
- [x] Bug: linhas de transmissão não renderizavam — 404 no worker do `maplibre-gl` por causa do pre-bundling do Vite (`4230d53`)
- [x] Emojis trocados por ícones `lucide-react` para consistência visual (`bda8cd2`)
- [x] Expansão de dado: 11→26 usinas, 7→15 linhas (`939acb4`)
- [x] Código morto removido (`Header.tsx`/`Footer.tsx`), `any` tipado em `GridMap.tsx`, README sincronizado com o basemap real (`1400f7d`)

