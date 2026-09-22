# 🩺 Code Health — Brasil Grid

> Revisão pontual do estado do projeto no estágio de MVP: o que está bem resolvido, o que vale ajustar antes de crescer, e qual é o próximo passo de maior impacto.
>
> **Status:** projeto em estágio de MVP, funcional e com boa base. Nenhum item abaixo é bloqueante — são melhorias incrementais.

---

## ✅ O que está bem resolvido

- **Escopo coerente:** os 4 pilares (topologia, cadeia de valor, ACR/ACL, régua de grandezas) formam uma narrativa clara e o `docs/spec.md` documenta motivação e arquitetura — raro em projeto recém-criado.
- **Stack adequada ao problema:** Vite + React 19 + TypeScript para uma SPA client-side estática, sem necessidade de SSR/backend nesse estágio.
- **MapLibre GL em vez de Mapbox:** evita vendor lock-in e chave paga, é a ferramenta certa para mapa técnico/WebGL.
- **Zero backend / dados estáticos embutidos:** decisão correta para MVP — não construir infraestrutura antes de precisar dela.
- **Organização por domínio:** `Console/`, `Map/`, `Inspector/`, `Market/`, `EnergyChain/`, `Scales/` é uma estrutura legível e fácil de navegar.

---

## 🔧 Pontos de melhoria

### Prioridade alta (rápidos e com risco de confundir usuário/contribuidor)

1. **Código morto do template inicial**
   `src/components/Header.tsx` e `Footer.tsx` não são importados em lugar nenhum — o app real usa `ConsoleHeader`/`ConsoleBottomBar`. Sobraram do boilerplate. Remover.

2. **Nome enganoso em `src/data/gridData.ts`** — ✅ *Concluído*
   `liveGridTelemetry` renomeado para `referenceGridSnapshot` com tipagem explícita `GridSnapshot`, metadados de referência técnica e compatibilidade legada. A UI estampa o selo `Ref. Técnica` no ticker (`ConsoleHeader`) e `REF` nos intercâmbios/matriz (`ConsoleBottomBar`), com documentação sincronizada no README.

3. **Doc e código dessincronizados**
   O README descreve o basemap como "CARTO Dark Matter", mas `GridMap.tsx` usa tiles raster do **ESRI ArcGIS Online** (`World_Dark_Gray_Base`). Além de corrigir a doc, vale checar os termos de uso desse serviço gratuito da Esri — costuma ter limite de volume/uso comercial, o que é um risco real se o tráfego crescer.

### Prioridade média (qualidade e escalabilidade)

4. **Markers de usinas via `innerHTML` manual** — ✅ *Concluído*
   Migrado para camada nativa GeoJSON no MapLibre (`circle`/`symbol`) processada via WebGL/GPU com filtragem instantânea via `setFilter` e zero overhead no DOM.

5. **Sem testes e sem CI** — ✅ *Concluído*
   Workflow `.github/workflows/ci.yml` configurado com `oxlint` e `tsc -b && vite build`. Deploy contínuo e automatizado no GitHub Pages implementado via `actions/deploy-pages` com `base: /brasil-grid/` dinâmico em `vite.config.ts`.

6. **Estado não reflete na URL** — ✅ *Concluído*
   Sincronização bidirecional de URL implementada (`?plant`, `?line`, `?tab`, `?v`, `?type`), suporte a navegação por histórico (`popstate`), câmera `flyTo`/`fitBounds` e botão de cópia de link no inspetor.

### Prioridade baixa (polimento)

7. **`any` solto em `GridMap.tsx`** — ✅ *Concluído*
   Tipagem estrita com `FilterSpecification | null` nativo do `maplibre-gl`.

8. **Repetição de classes condicionais** — ✅ *Concluído*
   Criado o helper `cn()` (`clsx` + `tailwind-merge`) e o componente reutilizável `FilterButton.tsx`, simplificando a interface e eliminando duplicações em `ConsoleSidebar.tsx`.

9. **Acessibilidade & Code-Splitting** — ✅ *Concluído*
   Atributos `aria-label` e títulos semânticos adicionados a botões e controles. Code-splitting no Vite com `React.lazy` e `<Suspense>` para as abas analíticas, gerando chunks isolados e reduzindo o peso do first-load.

---

## 🚀 Próximo passo de maior impacto

O salto de valor real não é técnico, é de **dado**: hoje tudo é estático. ONS e ANEEL (SIGEL) têm portais de dados abertos de verdade — trocar ao menos a telemetria (frequência, carga, intercâmbio) por uma chamada real ao portal de dados abertos do ONS transformaria o projeto de "infográfico bonito" para "explorador de dado real", que é a proposta original do Brasil Grid. Não precisa de backend próprio — pode começar como fetch client-side com cache simples.
