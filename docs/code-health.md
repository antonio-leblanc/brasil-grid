# Code Health — Brasil Grid

> **Revisão:** 2026-09-25 · commit de referência `d5ac39a`
>
> **Tese:** o motor físico e a stack estão sólidos. O risco principal está nos **dados**: parte do cadastro cumpre a forma da rastreabilidade (`sources` + `accessedAt`) sem o conteúdo, porque as fontes apontam para home pages. Para um laboratório educacional, dado com cara de oficial e sem lastro custa mais caro que qualquer dívida técnica.
>
> Itens acionáveis estão em [`TODO.md`](../TODO.md). Este documento é o diagnóstico.

## Métricas

| Indicador | Valor |
|---|---|
| Testes (Vitest) | 24 passando: física (17), fuso BRT (3), proveniência (4) |
| Lint (oxlint) / `strict: true` | 0 avisos / 0 erros |
| Bundle principal | 1,56 MB (439 kB gzip); modais pesadas em chunks lazy |
| Dependências de runtime | 7 |
| Usinas com `sources` | 16/72 |
| Entidades com fonte = home page | 52 (16 usinas + 36 linhas), catalogadas em `ROOT_URL_DEBT` |

## Pontos fortes

- **Motor físico puro e testado** ([gridPhysics.ts](../src/services/gridPhysics.ts)): passo fixo de 10 ms com acumulador, `E_k = Σ H·P_síncrona`, amortecimento dentro do termo 1/2H, ERAC com os ajustes uniformizados do ONS (58,5 / 58,2 / 57,9 / 57,7 / 57,5 Hz; 5 a 9% por estágio), curva P(f) dos inversores acima de 60,2 Hz.
- **Dossiês com proveniência real** ([sinDossiersData.ts](../src/data/sinDossiersData.ts)): links para documentos específicos (RAP de 15/08/2023, apresentação do ERAC, RT do GT Curtailment). É o padrão que o resto do cadastro deve seguir.
- **Stack enxuta:** SPA estática, MapLibre sem token, camadas GeoJSON na GPU, gráficos em SVG/Canvas nativo, estado na URL, CI com lint + testes + build + deploy.
- **Escopo protegido:** o `AGENTS.md` rejeita SaaS comercial, CRUD de usinas e dashboard inchado; o comparativo ACR/ACL já foi removido.
- **Telemetria com selo honesto:** cadeia cache → API ONS → cache vencido → snapshot, com selo `REF` quando o dado não é real.

## Diagnóstico

### P0 — Proveniência dos dados

**Fontes genéricas.** O commit `d5ac39a` adicionou 36 linhas de transmissão (16 → 52) com fontes do tipo `https://www.furnas.com.br/`, `https://www.ons.org.br/` e rótulos que soam como documento oficial mas não levam a nenhum ("ONS — Submódulo 23.3: Acoplamento Xingu–Tucuruí", "ONS — Relatório de Análise do Apagão" como fonte de uma LT). Os comprimentos são quase todos múltiplos de 10 km, sinal típico de valor estimado. O [data-audit-log.md](data-audit-log.md) registra essas entradas como "✅ Aprovado" com commit `HEAD`.

As 16 UHEs do Lote 1 têm CEG, mas a fonte é `https://siga.aneel.gov.br/` (raiz), que não permite conferir o número.

**Trava mecânica:** [sources.test.ts](../src/data/sources.test.ts) varre todos os datasets e falha se:
- uma URL não for `https` válida;
- `accessedAt` não estiver em ISO `YYYY-MM-DD`;
- uma entidade **nova** citar a raiz de um domínio;
- uma entidade da `ROOT_URL_DEBT` for corrigida sem sair da lista (a dívida só encolhe).

**Cobertura incompleta:** 56/72 usinas não têm `sources` (o campo é opcional em `PowerPlantFeature`).

### P1 — A interface afirma o que o código não faz

| Onde | Problema |
|---|---|
| [GridMap.tsx](../src/components/Map/GridMap.tsx) camada `lines-flow` + legenda "Fluxo Ativo" | Tracejado estático, sem animação. O sentido sairia da ordem das coordenadas, não da física (a Norte–Sul inverte sazonalmente) |
| [ConsoleSidebar.tsx](../src/components/Console/ConsoleSidebar.tsx) filtro "±800 kV" | Filtra `voltageKV === 800` e esconde os bipolos de ±600 kV (Itaipu, Madeira). O critério físico é `type === 'CC'` |
| Filtro de tensão | Predicado duplicado entre sidebar e mapa (duas fontes da verdade) |
| Legenda flutuante ([App.tsx](../src/App.tsx)) | Omite 440 kV, 230 kV, térmica e nuclear; ocupa o mapa permanentemente |

### P1 — Densidade visual (diretriz: informação sob demanda)

Critério: um elemento só fica permanente na tela se responde a uma pergunta física que o usuário já fez. O resto aparece no clique.

- Hover (popup) e clique (inspetor) mostram a mesma ficha em duas camadas.
- Cada linha é desenhada em 3 camadas (`lines-glow`, `lines-main`, `lines-flow`).
- [InterchangeModal.tsx](../src/components/Interchange/InterchangeModal.tsx) concentra tacômetros, balanço, gráfico 24h e dossiê na mesma tela (827 linhas).
- Modo Guia (dossiês, cadeia de valor) ainda tem parágrafos longos.

### P2 — Robustez

- **Erro da telemetria invisível:** `fetchOnsTelemetry` nunca lança exceção, então o `error` do `useOnsTelemetry` nunca é populado e o motivo do fallback não aparece na UI.
- **Dependência de CORS** da `apicarga.ons.org.br`: se os cabeçalhos mudarem, o site exibe snapshot para sempre sem alarme.
- **Simulador re-renderiza a cada frame:** [DispatchSimulatorModal.tsx](../src/components/Simulator/DispatchSimulatorModal.tsx) chama `setSimState` a cada `requestAnimationFrame` e copia o array de histórico a cada ponto. A física já é desacoplada (passo fixo); falta desacoplar a UI.

### P3 — DX e arquitetura

- [subsystemsGeoData.ts](../src/data/subsystemsGeoData.ts): 18 mil linhas de GeoJSON num módulo TS, dentro do bundle principal; pesa no Language Server e nas buscas.
- `GridMap.tsx` (730 linhas) mistura inicialização, 10 camadas, handlers e sincronização de filtros.
- `liveGridTelemetry` em [gridData.ts](../src/data/gridData.ts) é alias morto (sem uso).
- Tiles ESRI: gratuitos, com termos de uso e limites.
- **Documentação como changelog:** o `TODO.md` antigo descrevia estado já corrigido (ERAC em 59,5 Hz, custos R$/h no simulador) e contradizia este documento e o audit-log. Regra adotada: `TODO.md` só com pendências, histórico no git.

## Referência: modelo físico do simulador

**Equação:** `df/dt = f0·(P_ger − P_carga·(1 + D·Δf/f0)) / (2·E_k)`, com `E_k = Σ H·P_síncrona` (MW·s).

**Comportamento de controle (cenário livre, 80 GW):**
- perda de 2,8 GW → nadir ≈ 58,9 Hz, sem ERAC, regime ≈ 59,83 Hz com regulação primária;
- perda de 6,3 GW (porte de um bipolo de Itaipu) → dispara o estágio 1 do ERAC;
- alta renovável (H ≈ 1 s), perda de 2,8 GW → RoCoF ≈ −1,4 Hz/s, cerca de 4× o caso base.

**Simplificações conscientes:** barramento único; sem temporização dos relés do ERAC; regulador por estatismo limitado por rampa (sem efeito de coluna d'água). Em 15/08/2023 o SE/CO ainda usava os ajustes antigos do ERAC (7% por estágio); o simulador usa os novos.

## Decisões em aberto

- **Modelo do simulador:** barramento único (atual) vs 4 subsistemas com limites de intercâmbio. O segundo é necessário para reproduzir o 15/08/2023 (abertura da interligação N/NE → SE).
- **Fonte primária da telemetria:** fetch no cliente (atual) vs snapshot gerado por Action agendada.
- **Linhas sem fonte específica:** manter com selo "não verificada" na UI (decisão atual: não remover) vs remover ao fim do prazo de auditoria.
- **Basemap:** ESRI vs PMTiles próprio no GitHub Pages.
