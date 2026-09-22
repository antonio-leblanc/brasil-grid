# TODO — Brasil Grid

> Lista de próximos passos. Cada item é escrito pra ser pego de forma independente, por qualquer agente/dev sem contexto prévio — leia o item inteiro (e os arquivos citados) antes de começar.

## Dados

- [x] **Malha Integrada de Linhas de Transmissão:** 15→30→52 linhas tronco (+22 novos corredores estratégicos reais ONS/ANEEL conectando 100% das 72 usinas estruturantes a corredores de escoamento e fechando os anéis elétricos regionais).
- [x] **Censo Tier 2 de Usinas Estruturantes do SIN:** 26→72 usinas cobrindo todo o parque gerador de grande porte (>85% da matriz brasileira em 39 hidrelétricas, 10 complexos eólicos, 9 parques solares, 13 térmicas/biomassa e central nuclear).

## Code health (detalhe completo em `docs/code-health.md`)

- [x] **Transparência de telemetria:** Renomeado `liveGridTelemetry` para `referenceGridSnapshot` em `src/data/gridData.ts` e estampados selos de referência técnica na UI (`ConsoleHeader` e `ConsoleBottomBar`), com transparência formalizada no README.
- [x] Trocar os markers de usina por camada GeoJSON nativa do MapLibre (`circle`/`symbol`) processada diretamente pela GPU via WebGL, com setFilter instantâneo e tooltips dinâmicos.
- [x] **CI Automatizado & Deploy GitHub Pages (GitHub Actions):** Workflow `.github/workflows/ci.yml` com `npm run lint` + `npm run build` e pipeline de publicação no GitHub Pages via `actions/deploy-pages` com `base` configurada em `vite.config.ts`.
- [x] Refletir aba ativa, usina/linha selecionada e filtros na URL com sincronização bidirecional, histórico do navegador (`popstate`), câmera `flyTo` automática e botão "Compartilhar" no inspetor.
- [x] **Componente `FilterButton` e utilitário `cn`:** Extraído componente reutilizável em `src/components/Console/FilterButton.tsx` combinando `clsx` e `tailwind-merge` para eliminar repetição de classes Tailwind.
- [x] **Code-Splitting no Vite (`React.lazy`):** Abas analíticas (`ValueChainSection`, `AcrAclComparison`, `MagnitudeRuler`) isoladas sob demanda em chunks dinâmicos com `<Suspense>`, otimizando o carregamento inicial.
- [x] **Revisão de acessibilidade:** `aria-label` e titles semânticos adicionados em todos os botões de ação e filtros.

## Roadmap de Funcionalidades & Dados

- [x] **Efeito visual de fluxo de potência nas linhas:** Linhas pulsadas/tracejadas animadas em WebGL (30 FPS line-dasharray) indicando visualmente o fluxo de potência entre polos geradores e subsistemas, com toggle na UI.
- [x] **Polígonos dos 4 Subsistemas do SIN:** Camada vetorial nativa com as fronteiras elétricas (Norte, Nordeste, Sul, Sudeste/Centro-Oeste) simplificadas (Douglas-Peucker) com preenchimento sutil, bordas tracejadas, tooltips no hover e toggle na interface.
- [ ] **Integração com Dados Abertos do ONS:** Conectar dados de despacho/curva de carga em tempo real com fallback automático para o `referenceGridSnapshot`.
- [ ] **Calculadora / Simulador de Economia no Mercado Livre (ACL):** Simulador prático onde o usuário simula sua conta cativa vs livre com estimativa de economia e TUSD Fio B.

## Concluído recentemente (referência)

- [x] **Fluxo de Potência Animado & Polígonos de Subsistemas:** Renderização nativa WebGL das fronteiras do SIN e animação do sentido da corrente elétrica nos linhões tronco.
- [x] **UI Lean & Minimalista (Header & Footer):** Header despoluído (marca + botão MENU direto), telemetria vital concentrada no footer com barra segmentada da matriz por fonte geradora.
- [x] **Modo Fullscreen / Foco para o painel de abas:** Expansão em tela cheia com layout de leitura centralizado (`max-w-5xl`) e toggle Maximizar/Restaurar com atalho `Esc` para abas analíticas.
- [x] Camada GeoJSON nativa WebGL no MapLibre (GPU) com filtros instantâneos sem overhead no DOM
- [x] Deep Linking completo e sincronização de estado na URL (?plant, ?line, ?tab, ?type, ?v) + botão Compartilhar
- [x] Censo Tier 2 completo do SIN: 72 usinas estratégicas (hidro, solar, eólica, térmica, nuclear) e 30 linhas tronco de transmissão
- [x] Expansão massiva de dado: 26→38 usinas (+12) e 15→30 linhas tronco (+15) integrando malha nacional e todos os subsistemas
- [x] Bug: linhas de transmissão não renderizavam — 404 no worker do `maplibre-gl` por causa do pre-bundling do Vite (`4230d53`)
- [x] Emojis trocados por ícones `lucide-react` para consistência visual (`bda8cd2`)
- [x] Expansão de dado: 11→26 usinas, 7→15 linhas (`939acb4`)
- [x] Código morto removido (`Header.tsx`/`Footer.tsx`), `any` tipado em `GridMap.tsx`, README sincronizado com o basemap real (`1400f7d`)
