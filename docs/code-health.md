# 🩺 Code Health — Brasil Grid

> **Revisão:** 2026-09-24 · **Estágio:** MVP funcional (≈32 commits, 3 dias de desenvolvimento)
>
> **Tese:** produto e UX acima da média para um MVP; a base de engenharia (tipos, testes, bundle) é frágil; e o simulador tem erros de física que comprometem a proposta de "laboratório de alta fidelidade". Para um projeto educacional, física errada custa mais caro que qualquer dívida técnica.

---

## ✅ O que está bem resolvido

- **Nicho real e escopo protegido.** Não existe ferramenta aberta e interativa que explique inércia, ERAC, curva do pato e intercâmbios do SIN. O `AGENTS.md` define explicitamente os anti-padrões (SaaS comercial, CRUD de usinas, dashboard inchado).
- **Stack adequada ao problema.** SPA estática (Vite + React 19 + TS), zero backend, deploy no GitHub Pages. Poucas dependências em runtime; gráficos em SVG/Canvas nativos, sem biblioteca de charting.
- **MapLibre GL em vez de Mapbox.** Sem vendor lock-in e sem token pago. Usinas renderizadas como camada GeoJSON nativa (`circle`/`symbol`) com `setFilter`, sem markers no DOM.
- **Motor físico como função pura.** `stepSimulation(state, dt) → state` ([gridPhysics.ts](../src/services/gridPhysics.ts)) é o desenho certo: testável, portátil para Web Worker, desacoplado do React.
- **Telemetria resiliente e honesta.** Cadeia cache (TTL 15 min) → API ONS ao vivo → cache vencido → snapshot sintético, com selo `REF` quando o dado não é real.
- **Estado na URL.** `?plant`, `?line`, `?tab`, `?v`, `?type`, `?sim`, `?interchange` + `popstate`: simulações e ativos compartilháveis por link.
- **Code-splitting das modais pesadas** (`React.lazy` + `Suspense`) e **CI** com `oxlint` + `tsc -b && vite build` + deploy automatizado.
- **Organização por domínio** (`Map/`, `Simulator/`, `Interchange/`, `Telemetry/`, `Dossiers/`…), legível e navegável.

### Resolvido desde a revisão anterior

Boilerplate removido (`Header`/`Footer`), `liveGridTelemetry` → `referenceGridSnapshot`, README alinhado com ESRI, `any` eliminado do `GridMap`, helper `cn()` + `FilterButton`, `aria-label` nos controles, e a telemetria real do ONS (antigo "próximo passo de maior impacto") já integrada.

---

## ✅ P0 — Fidelidade física do simulador (resolvido em 2026-09-24)

Referência: [gridPhysics.ts](../src/services/gridPhysics.ts) · coberto por [gridPhysics.test.ts](../src/services/gridPhysics.test.ts) (17 testes, Vitest, rodando na CI).

| # | Problema | Correção |
|---|----------|----------|
| 1 | ERAC em 59,5 / 59,3 / 59,1 Hz e colapso em 58,5 Hz | Tabela `ERAC_STAGES` com os ajustes uniformizados do ONS: 58,5 / 58,2 / 57,9 / 57,7 / 57,5 Hz, cortando 5 / 6 / 7 / 8 / 9% (35% no total). Fonte: [ONS — Análise do desempenho do ERAC, 15/08/2023](https://www.ons.org.br/AcervoDigitalDocumentosEPublicacoes/Apresenta%C3%A7%C3%A3o%20ERAC%2015-08-2023.pdf). Colapso didático em 56,5 Hz |
| 2 | Amortecimento fora do termo 1/2H | `df/dt = f0·(P_ger − P_carga·(1 + D·Δf/f0)) / (2·E_k)` |
| 3 | `toFixed(3)` no estado congelava desvios lentos | Estado em precisão total; arredondamento só na exibição |
| 4 | Passo variável, acoplado ao frame rate | `advanceSimulation`: passo fixo de 10 ms, acumulador e sub-passos; trajetória idêntica a 60 e 144 Hz |
| 5 | H_eq sobre base fixa de 100 GVA | Energia cinética `E_k = Σ H·P_síncrona` (MW·s); H_eq é exibido sobre a base de geração |
| 6 | Corte de 80% nos inversores sem reset | Curva P(f) contínua acima de 60,2 Hz (estatismo de 5%), que se libera sozinha quando a frequência volta |

**Bugs pré-existentes encontrados durante a correção:**
- `calculateLoadAtTime` estava invertida (o "pico das 19h30" era o vale). Substituída por um perfil horário interpolado, com pico às 19h.
- Os cenários começavam desbalanceados (potencial solar/eólico divergente da geração inicial): o "trip Itaipu" perdia 6 GW antes de qualquer evento e a "curva do pato" colapsava por sobrefrequência.
- O trip devolvia a potência sozinho, porque o setpoint continuava intacto e a usina voltava na rampa. Agora `applyGeneratorTrip` remove também a capacidade e a reserva das unidades.
- Havia uma condição de corrida entre os comandos do operador e o loop de física. O `stateRef` passou a ser a fonte da verdade (`updateSim`).

**Comportamento resultante (cenário livre, 80 GW):** a perda de 2,8 GW dá nadir ≈ 58,9 Hz, sem ERAC, e regime ≈ 59,83 Hz com a regulação primária. A perda de 6,3 GW (porte de um bipolo de Itaipu) dispara o estágio 1. No cenário de alta renovável (H ≈ 1 s), a mesma perda de 2,8 GW produz RoCoF ≈ −1,4 Hz/s, cerca de 4× maior.

**Simplificações conscientes:** barramento único, sem temporização dos relés do ERAC, e regulador de velocidade representado por estatismo limitado por rampa (sem o efeito de coluna d'água da turbina).

## 🔴 P0 — Auditoria factual dos dados (em andamento, 2026-09-24)

Cada entidade de dados ganhou `sources: SourceRef[]`, exibido na UI (`SourcesList`).

| Arquivo | Status |
|---------|--------|
| `sinDossiersData.ts` | ✅ Auditado. 15/08/2023 reescrito conforme o RAP final: ~23.368 MW interrompidos (≈32%); causa foi o desempenho do controle de tensão de eólicas e solares abaixo dos modelos, não a inércia; PLD 2026 corrigido |
| `energyChainData.ts`, `scaleData.ts` | ✅ Auditados (EPE Anuário 2026, Procel, ANEEL) |
| `transmissionLinesData.ts` | ✅ Auditado: 52 → 16 linhas. 36 corredores eram fictícios ou tinham tensão errada e foram removidos |
| Textos de UI, README, spec | ✅ Auditados. Atribuição Esri reativada; selo "MINI-ONS" → "LAB 60 HZ" |
| `interchangeData.ts`, `referenceGridSnapshot` | ✅ Auditado. 4 fronteiras com nomenclatura oficial ONS (FNESE, FNSE, FNEN, FSSE), fontes primárias com `accessedAt`, perfis horários rotulados como ilustrativos e recorde de demanda do SIN atualizado para 106.532 MW (26/02/2025) |
| `powerPlantsData.ts` (72 usinas) | ⏳ **Não auditado.** `sources` opcional até a conclusão |

**Pendências para retomar:**
- Usinas: capacidade, proprietário atual (Eletrobras → Axia Energia; vendas de ativos), coordenadas e unidades, com ANEEL SIGA como fonte primária.
- Linhas não representadas: circuitos 2 e 3 da Norte–Sul, Tucuruí–Imperatriz–Presidente Dutra, elos com o Uruguai (Rivera, Melo).
- Algumas linhas usam Wikipedia como uma das fontes; trocar por fonte primária quando possível.
- ERAC: no dia 15/08/2023, o SE/CO ainda usava os ajustes antigos (7% por estágio). O simulador usa os ajustes novos, uniformizados.

## 🟠 P1 — Rede de segurança de engenharia

7. ✅ **`strict: true` ligado** (zero erros).
8. ✅ **Cobertura de testes expandida.** O Vitest está configurado e roda na CI; cobre o motor físico ([`gridPhysics.test.ts`](../src/services/gridPhysics.test.ts) — 17 testes) e o cálculo de fuso de Brasília ([`onsApi.test.ts`](../src/services/onsApi.test.ts) — 3 testes).

## 🟠 P1 — Auditoria Cadastral & Operacional (Prioridade Máxima)

A credibilidade de um laboratório educacional do SIN depende da exatidão dos ativos e restrições elétricas. Performance de milissegundos é secundária diante de dados incorretos.

9. **Auditoria das 72 Usinas ([`powerPlantsData.ts`](../src/data/powerPlantsData.ts)):**
   - Validar capacidade outorgada/fiscalizada (MW) e coordenadas geográficas contra o SIGA (Sistema de Informações de Geração da ANEEL).
   - Atualizar razão social e controladores pós-privatização (ex.: Eletrobras → Axia Energia, vendas de SPEs).
   - Preencher `sources: SourceRef[]` para cada usina com `accessedAt: 'YYYY-MM-DD'` (eliminando o status opcional).
   - Registrar cada validação no log de proveniência ([`docs/data-audit-log.md`](data-audit-log.md)) para blindar o projeto contra re-auditorias e dados alucinados ("AI slop").

## 🟡 P2 — Camada ONS & Robustez

10. ✅ **Datas calculadas no fuso de Brasília (America/Sao_Paulo).** Função `getBrasiliaDateStr` implementada no [`onsApi.ts`](../src/services/onsApi.ts), blindando a aplicação contra a virada de dia às 21h BRT e coberta por testes unitários.
11. **Estado de erro nunca é preenchido.** `fetchOnsTelemetry` nunca lança exceção (sempre devolve o fallback), então o `error` do hook nunca é populado. Expor o motivo do fallback na UI.
12. **Dependência de CORS da `apicarga.ons.org.br`.** Se os cabeçalhos mudarem, o site passa a exibir dado sintético para sempre, sem alarme. Considerar um snapshot gerado na CI (GitHub Action agendada → JSON estático) como fonte primária ou secundária.
13. **Re-render a 60 Hz no simulador.** O loop do simulador chama `setSimState` a cada quadro, o que re-renderiza a modal inteira. Desacoplar a física (passo fixo, ref ou Worker) da UI (atualização a 10–15 Hz).

## ⚪ P3 — Dívida de DX, Bundle e Arquitetura

14. **Bundle de ~1,5 MB (432 kB gzipped):**
    - O aviso do Vite (`> 500 kB`) é cosmético para o usuário final: 432 kB gzipped carrega em menos de 0,5s em qualquer banda larga ou 4G, e o `maplibre-gl` sozinho responde por boa parte disso.
    - Impacto real é na IDE: [`subsystemsGeoData.ts`](../src/data/subsystemsGeoData.ts) (18k linhas de GeoJSON estático em módulo TS) onera o Language Server e polui buscas globais de texto.
    - Resolução quando conveniente: extrair para `public/geo/subsystems.geojson` com `fetch` assíncrono.
15. **Componentes extensos:** [`GridMap.tsx`](../src/components/Map/GridMap.tsx) (≈950 linhas), [`InterchangeModal.tsx`](../src/components/Interchange/InterchangeModal.tsx) (≈830 linhas). Extrair hooks dedicados para camadas do mapa e controle de URL.
16. **Tiles da ESRI:** gratuitos, mas com termos de uso e limites. Alternativa futura: PMTiles próprio hospedado no GitHub Pages.

---

## 🚀 Sequência recomendada

| # | Item | Por quê primeiro |
|---|------|------------------|
| ~~1~~ | ~~P0 (1–6) + testes de física~~ | ✅ Concluído (equação de swing e ERAC alinhados) |
| ~~2~~ | ~~`strict: true` no TypeScript~~ | ✅ Concluído (zero erros) |
| ~~3~~ | ~~Dossiês, PLD 2026 e malha tronco (16 linhas)~~ | ✅ Concluído (fontes exibidas na UI) |
| 4 | **Auditoria das 72 usinas (SIGA/ANEEL)** | Elimina o risco de desinformação em ativos estratégicos |
| 5 | **Limites e códigos ONS de intercâmbio** | Dá precisão técnica à análise de gargalos e curtailment |
| 6 | Fuso horário de Brasília em `onsApi.ts` | Evita chaveamento anômalo de telemetria após as 21h |
| 7 | Otimização de DX / GeoJSON para `public/` | Reduz consumo de memória da IDE (não bloqueante) |

## ❓ Decisões em aberto

- **Nível de modelo do simulador:** barramento único agregado (atual) vs 4 subsistemas com limites de intercâmbio. Este segundo modelo é necessário para reproduzir o 15/08/2023 (abertura de interligação N/NE → SE).
- **Fonte primária da telemetria:** fetch no cliente (atual) vs snapshot gerado por Action agendada.
- **Basemap:** manter ESRI ou migrar para PMTiles próprio.
