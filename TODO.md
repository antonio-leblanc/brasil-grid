# TODO — Brasil Grid

> Lista de próximos passos. Cada item é escrito pra ser pego de forma independente, por qualquer agente/dev sem contexto prévio — leia o item inteiro (e os arquivos citados) antes de começar.

## Dados

- [x] **Malha Integrada de Linhas de Transmissão:** 15→30→52 linhas tronco (+22 novos corredores estratégicos reais ONS/ANEEL conectando 100% das 72 usinas estruturantes a corredores de escoamento e fechando os anéis elétricos regionais).
- [x] **Censo Tier 2 de Usinas Estruturantes do SIN:** 26→72 usinas cobrindo todo o parque gerador de grande porte (>85% da matriz brasileira em 39 hidrelétricas, 10 complexos eólicos, 9 parques solares, 13 térmicas/biomassa e central nuclear).

## Code health (detalhe completo em `docs/code-health.md`)

- [x] **Transparência de telemetria:** Renomeado `liveGridTelemetry` para `referenceGridSnapshot` em `src/data/gridData.ts` e estampados selos de referência técnica na UI (`ConsoleHeader` e `ConsoleBottomBar`), com transparência formalizada no README.
- [x] Trocar os markers de usina por camada GeoJSON nativa do MapLibre (`circle`/`symbol`) processada diretamente pela GPU via WebGL, com setFilter instantâneo e tooltips dinâmicos.
- [x] **CI Automatizado & Deploy GitHub Pages (GitHub Actions):** Repositório tornado público, GitHub Pages ativado com Source GitHub Actions e deploy contínuo em produção no domínio customizado `https://antonioleblanc.com/brasil-grid/` (`.github/workflows/ci.yml` + `vite.config.ts`).
- [x] **Fix do Web Worker do MapLibre em Produção:** Corrigido 404 de `maplibre-gl-worker.mjs` no bundle de produção usando `import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'` e `setWorkerUrl(workerUrl)`, garantindo o empacotamento do worker isolado (~508 kB) e o carregamento 100% via GPU de usinas, linhas e subsistemas.
- [x] Refletir aba ativa, usina/linha selecionada e filtros na URL com sincronização bidirecional, histórico do navegador (`popstate`), câmera `flyTo` automática e botão "Compartilhar" no inspetor.
- [x] **Componente `FilterButton` e utilitário `cn`:** Extraído componente reutilizável em `src/components/Console/FilterButton.tsx` combinando `clsx` e `tailwind-merge` para eliminar repetição de classes Tailwind.
- [x] **Code-Splitting no Vite (`React.lazy`):** Abas analíticas (`ValueChainSection`, `AcrAclComparison`, `MagnitudeRuler`) isoladas sob demanda em chunks dinâmicos com `<Suspense>`, otimizando o carregamento inicial.
- [x] **Revisão de acessibilidade:** `aria-label` e titles semânticos adicionados em todos os botões de ação e filtros.

## Roadmap de Funcionalidades & Dados

- [x] **[PRIORIDADE 1] Integração com Dados Abertos do ONS (Dividida em 3 Fases):**
  - **Endpoints homologados:** `https://apicarga.ons.org.br/prd/cargaverificada` e `cargaprogramada` (48 medições semi-horárias/dia, CORS aberto `*`, subsistemas `SECO`, `S`, `NE`, `N` e estados).
  - **Métricas:** Carga global (`val_cargaglobal`), carga supervisionada SCADA (`val_cargasupervisionada`) e geração solar distribuída (`val_cargammgd`).
  - [x] **Fase 1 — Serviço & Cache Resiliente (`src/services/onsApi.ts`):** Serviço TypeScript com tipagem completa, consulta paralela aos 4 subsistemas com agregação do SIN, cache em `localStorage` (TTL 15 min), fallback automático para `referenceGridSnapshot` e hook React `useOnsTelemetry()`.
  - [x] **Fase 2 — Conexão com a UI:** Substituição da telemetria estática por dados vivos no `ConsoleHeader` e `ConsoleBottomBar`, badge dinâmico `LIVE (ONS API)` vs `REF (Snapshot)` com data/hora da medição, e tooltips dos subsistemas no mapa exibindo carga real em MW.
  - [x] **Fase 3 — Modal / Painel da Curva de Carga 24h (Curva do Pato):** Gráfico interativo em SVG puro (sem libs pesadas) com as 48 leituras diárias, seletor de subsistemas (SIN, SE/CO, Sul, NE, Norte), marcadores de pico/vale e camada visual da penetração solar MMGD (`LoadCurveModal.tsx`).
- [x] **[PRIORIDADE 3] Dossiês Interativos no Modo Guia (`src/components/Dossiers/SinDossiersSection.tsx`):**
  - **Expurgo do Anti-Pattern Comercial:** Removido o comparativo de varejo ACR/ACL (`AcrAclComparison.tsx` e `marketData.ts`) em conformidade estrita com o `AGENTS.md`.
  - **Anatomia do Apagão de 15 de Agosto de 2023:** Cronologia operativa de t=0s a t=17s, equação de oscilação ($df/dt$), subdesempenho de LVRT em IBRs, cisão em duas ilhas elétricas, atuação do ERAC nacional e recomposição flutuante.
  - **O Custo Futuro da Água & Formação do Preço (PLD):** Decomposição da cadeia hierárquica NEWAVE, DECOMP e DESSEM, valoração estocástica da água (CMO), risco hidrológico (GSF) e separação física (ONS) vs contábil (CCEE).
  - **Curtailment & A Curva do Pato:** Análise da perda de 15 GW em rampa de 90 min ao entardecer, corte de renováveis por restrição de transmissão no Nordeste e papel de BESS/compensadores síncronos.
- [x] **[PRIORIDADE 2] Simulador Interativo de Despacho & Estabilidade 60 Hz ("Mini-ONS"):**
  - **Motor Matemático & Dinâmica do SIN (`src/services/gridPhysics.ts`):** Balanço de potência ativa regido pela Equação de Swing com amortecimento de carga ($df/dt = \frac{f_0}{2 H_{eq}} \frac{\Delta P}{S_{base}} - D(f - f_0)$); inércia equivalente $H_{eq}$ dinâmica sensível à penetração de IBR (solar/eólica com $H=0$ vs hidro $H=4.2$s e térmica $H=4.8$s); governador primário com estatismo de 5% (droop); atuação automática do ERAC em 3 estágios (59.50 Hz, 59.30 Hz, 59.10 Hz) e proteções de sobrevelocidade / blackout.
  - **Tacômetro Analógico & Digital SCADA (`src/components/Simulator/FrequencyGauge.tsx`):** Instrumento vetorial em SVG nativo calibrado entre 58.0 Hz e 62.0 Hz, agulha dinâmica, zonas operativas coloridas, medição digital em milésimos de Hz, taxa de variação RoCoF ($Hz/s$) e índice de inércia síncrona.
  - **Osciloscópio Strip-Chart em Canvas 2D (`src/components/Simulator/FrequencyStripChart.tsx`):** Registrador gráfico contínuo a 60 FPS com trilhas sincronizadas de frequência $f(t)$ e balanço de potência ($P_{ger}$ vs $P_{carga}$), com zero dependências externas de gráficos.
  - **Mesa de Despacho Operativo (`src/components/Simulator/DispatchControlDesk.tsx`):** Sliders de setpoint com restrições físicas de usinas (rampa rápida para hidros, mínimo técnico e rampa lenta para térmicas, curtailment ativo para eólicas e solares, custo horário R$/h e emissões de CO₂).
  - **Sala de Controle SCADA & Cenários (`src/components/Simulator/DispatchSimulatorModal.tsx`):** Modal integrado com seletor de cenários (Curva do Pato às 17h30, Trip de Usina Estruturante N-2 de 2.800 MW, Meio-dia de Alta Penetração Renovável e Sandbox Livre), controle de relógio operativo (Pausa, 1x, 2x, 5x, 10x), feed de alertas SCADA, deep-linking via URL (`?sim=1`) e code-splitting sob demanda via `React.lazy` (~42 kB isolado).
- [ ] **[BACKLOG TÉCNICO] Ferramentas Avançadas do Mapa:**
  - Exportação GeoJSON / CSV dos dados vetoriais filtrados na tela (linhas e usinas estruturantes).
  - Visualização de limites de intercâmbio e gargalos de fluxo entre subsistemas (SE/CO ↔ NE ↔ S ↔ N).

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
