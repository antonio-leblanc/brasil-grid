# TODO — Brasil Grid

> Lista de próximos passos. Cada item é escrito pra ser pego de forma independente, por qualquer agente/dev sem contexto prévio — leia o item inteiro (e os arquivos citados) antes de começar.

## Dados

- [x] **Mais linhas de transmissão.** 15→30 linhas tronco (+15 novos corredores estratégicos incluindo Bipolo Itaipu HVDC 600kV, Tronco Norte-Sul 500kV, Teles Pires, escoamento de renováveis NE/BA/RN/PB, corredores do Sul 525kV, Trans-Cerrado e Linhão UHVDC 800kV Graça Aranha-Silvânia).
- [x] **Censo Tier 2 de Usinas Estruturantes do SIN.** 26→72 usinas cobrindo todo o parque gerador de grande porte (>85% da matriz brasileira em 39 hidrelétricas, 10 complexos eólicos, 9 parques solares, 13 térmicas/biomassa e central nuclear).

## Code health (detalhe completo em `docs/code-health.md`)

- [ ] Renomear `liveGridTelemetry` (`src/data/gridData.ts`) — hoje o nome sugere dado em tempo real, mas é estático/hardcoded. Renomear para algo como `referenceGridSnapshot` e deixar isso explícito na UI (ex.: label "dado de referência, não live").
- [ ] Trocar os markers de usina, hoje criados via `el.innerHTML = ...` manual em `src/components/Map/GridMap.tsx`, por um layer GeoJSON nativo do MapLibre (`circle`/`symbol`). Não escala bem se a lista de usinas crescer muito além do que é hoje.
- [ ] Adicionar CI básico (GitHub Actions): `npm run build` (inclui `tsc -b`) + `npm run lint` a cada push/PR na `main`.
- [ ] Refletir aba ativa e usina/linha selecionada na URL (`useSearchParams`, sem precisar de `react-router` inteiro) pra permitir compartilhar link direto pra um ativo específico.
- [ ] Extrair um componente `FilterButton` reutilizável em `ConsoleSidebar.tsx` pra reduzir a repetição de classes Tailwind condicionais (o `clsx` já está instalado como dependência mas não é usado em nenhum lugar do código ainda).
- [ ] Revisão de acessibilidade: `aria-label` nos botões só-de-ícone, navegação por teclado nos markers do mapa.

## Sem pressa / quando fizer sentido

- [ ] Deploy no GitHub Pages (projeto é SPA estática, `npm run build` já gera o `dist/` pronto — só falta configurar `base` no `vite.config.ts` + workflow ou pacote `gh-pages`).
- [ ] Integração com dado real (ONS/ANEEL/SIGEL) no lugar do estático — decisão consciente de adiar por enquanto, não fazer sem alinhar antes.

## Concluído recentemente (referência)

- [x] Censo Tier 2 completo do SIN: 72 usinas estratégicas (hidro, solar, eólica, térmica, nuclear) e 30 linhas tronco de transmissão
- [x] Expansão massiva de dado: 26→38 usinas (+12) e 15→30 linhas tronco (+15) integrando malha nacional e todos os subsistemas
- [x] Bug: linhas de transmissão não renderizavam — 404 no worker do `maplibre-gl` por causa do pre-bundling do Vite (`4230d53`)
- [x] Emojis trocados por ícones `lucide-react` para consistência visual (`bda8cd2`)
- [x] Expansão de dado: 11→26 usinas, 7→15 linhas (`939acb4`)
- [x] Código morto removido (`Header.tsx`/`Footer.tsx`), `any` tipado em `GridMap.tsx`, README sincronizado com o basemap real (`1400f7d`)

