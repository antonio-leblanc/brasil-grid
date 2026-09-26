# Code Health — Brasil Grid

> **Revisão:** 2026-09-25 · commit de referência `d5ac39a`
>
> **Tese:** o motor físico e a stack estão sólidos. O risco principal está nos **dados**: parte do cadastro cumpre a forma da rastreabilidade (`sources` + `accessedAt`) sem o conteúdo, porque as fontes apontam para home pages. Para um laboratório educacional, dado com cara de oficial e sem lastro custa mais caro que qualquer dívida técnica.
>
> Itens acionáveis estão em [`TODO.md`](../TODO.md). Este documento é o diagnóstico.

## Métricas

| Indicador | Valor |
|---|---|
| Testes (Vitest) | 34 passando: física (17), fuso BRT (3), proveniência (6), filtros de rede (8) |
| Lint (oxlint) / `strict: true` | 0 avisos / 0 erros |
| Bundle principal | 1,58 MB (441 kB gzip); modais pesadas em chunks lazy |
| Dependências de runtime | 7 |
| Usinas com `sources` | 72/72 (100% auditadas com dados abertos da ANEEL e ONS) |
| Entidades com fonte = home page | 0 (dívida quitada em 100%) |
| Linhas com Wikipedia | 0 (100% primárias ONS/EPE/ANEEL) |

## Pontos fortes

- **Motor físico puro e testado** ([gridPhysics.ts](../src/services/gridPhysics.ts)): passo fixo de 10 ms com acumulador, `E_k = Σ H·P_síncrona`, amortecimento dentro do termo 1/2H, ERAC com os ajustes uniformizados do ONS (58,5 / 58,2 / 57,9 / 57,7 / 57,5 Hz; 5 a 9% por estágio), curva P(f) dos inversores acima de 60,2 Hz.
- **Dossiês com proveniência real** ([sinDossiersData.ts](../src/data/sinDossiersData.ts)): links para documentos específicos (RAP de 15/08/2023, apresentação do ERAC, RT do GT Curtailment). É o padrão que o resto do cadastro deve seguir.
- **Stack enxuta:** SPA estática, MapLibre sem token, camadas GeoJSON na GPU, gráficos em SVG/Canvas nativo, estado na URL, CI com lint + testes + build + deploy.
- **Escopo protegido:** o `AGENTS.md` rejeita SaaS comercial, CRUD de usinas e dashboard inchado; o comparativo ACR/ACL já foi removido.
- **Telemetria com selo honesto:** cadeia cache → API ONS → cache vencido → snapshot, com selo `REF` quando o dado não é real.

## Diagnóstico

### P0 — Proveniência dos dados (Resolvido)

Todas as 72 usinas geradoras cadastradas no SIN e todas as 52 linhas de transmissão principais possuem proveniência oficial auditada via datasets abertos da ANEEL (SIGA) e do ONS (Rede Básica). A dívida `ROOT_URL_DEBT` foi reduzida a zero e todos os 10 links da Wikipedia foram expurgados em favor de fontes primárias.

### P1 — Honestidade da interface & Densidade visual (Resolvido)

Todos os débitos de honestidade e densidade visual foram sanados:
1. **Camada fictícia removida:** `lines-flow` e toggle `showPowerFlow` expurgados do mapa e legenda.
2. **Filtro de tecnologia "CC":** `type === 'CC'` cobre agora bipolos de ±600 kV (Itaipu, Madeira) e ±800 kV (Belo Monte). Predicado e expressão MapLibre unificados em [`gridFilters.ts`](../src/data/gridFilters.ts) com 8 testes unitários. Parâmetro `?v=800` preservado para retrocompatibilidade.
3. **Legenda sob demanda:** substituída por popover acionado por botão flutuante `?` com convenções completas (CC, 765/500/440/230 kV, UHE, UFV, EOL, UTN, UTE).
4. **Hover cirúrgico:** tooltips do mapa exibem apenas o nome do ativo; especificação técnica reservada ao [`NodeInspector`](../src/components/Inspector/NodeInspector.tsx).
5. **Redução de camadas de linha:** de 3 para 2 (`lines-main` + `lines-selected`), sem glow cosmético.
6. **Intercâmbios simplificados:** visão inicial do [`InterchangeModal`](../src/components/Interchange/InterchangeModal.tsx) focada em carregamento (%) e margem operativa (GW), com curva 24h e dossiê sob demanda.
7. **Modo Guia enxuto:** [`SinDossiersSection`](../src/components/Dossiers/SinDossiersSection.tsx) e [`ValueChainSection`](../src/components/EnergyChain/ValueChainSection.tsx) padronizados em tipografia técnica SCADA (`font-mono text-xs`), métricas em destaque e termos-chave em negrito.

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
