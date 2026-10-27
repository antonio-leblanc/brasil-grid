# brasil-grid

**English** · [Português](./README.pt-BR.md)

An open lab for understanding Brazil's National Interconnected System (SIN) and its power sector, built on public data from ONS, EPE, CCEE and ANEEL: where the lines and plants are, how frequency responds when a plant trips, and why the price of energy now depends on the hour of the day.

**Live:** [antonioleblanc.com/brasil-grid](https://antonioleblanc.com/brasil-grid/)

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

## What's in the app

Two tabs: **Map** and **System**.

### Map

The SIN transmission backbone and its major generation hubs, on MapLibre GL.

- **Transmission:** the ±800 kV Belo Monte bipoles (Xingu–Estreito and Xingu–Terminal Rio, ~2,540 km), the ±600 kV Madeira and Itaipu links, the 500–765 kV trunk grid and selected 230–440 kV regional lines.
- **Generation:** Itaipu (14 GW), Belo Monte (11.2 GW), Tucuruí (8.5 GW), Angra 1 and 2 (2.0 GW), wind and solar complexes. Marker size follows installed capacity.
- Filters by voltage and by source, outlines of the 4 ONS subsystems, and a card for each plant and line with the source of its data.

### System

| Group | Section | What it shows |
|---|---|---|
| Operation | Interchanges | Flow between subsystems against each interface's limit, and the bottleneck behind each one |
| Operation | 60 Hz simulator | Aggregate swing equation, primary frequency response, under-frequency load shedding (ERAC) and the inverters' P(f) curve, over a verified SIN day with distributed solar (MMGD) separated from utility-scale solar |
| Market | Price | Southeast marginal cost of operation (CMO) from ONS data: the duck curve (6 pm CMO ÷ noon CMO, ~2× in 2024 and ~7× in 2026), stored energy (EAR) × CMO, and the cost of shaping |
| Reference | Power sector value chain | Generation, transmission, distribution and retail: how each link is paid and who the major groups are |
| Reference | SIN dossiers | The 15 Aug 2023 blackout, and how CMO and the spot price (PLD) are formed by NEWAVE, DECOMP and DESSEM |
| Reference | Scale of magnitudes | Power × energy, from an electric shower (~5.5 kW) to the SIN demand record (106,532 MW, 26 Feb 2025) |

## What's real data and what's illustrative

- **Real, live:** the SIN load in the header comes from the ONS Open Data API (Verified Load), cached. If the API is down, it falls back to a reference snapshot.
- **Real, exported:** the simulator's verified day (`scripts/export-simulator-day.mjs`, ONS Energy Balance) and the Price section series (`pipeline/`, ONS CMO, EAR and load curve).
- **Reference snapshot:** frequency, interchanges and generation mix in the console.
- **Teaching model:** the simulator is single-bus, with illustrative parameters.

Plants, lines and limits carry a primary source in the code (`sources`) and in the provenance log at [`docs/data-audit-log.md`](./docs/data-audit-log.md) (in Portuguese). Vision and architecture in [`docs/spec.md`](./docs/spec.md) (in Portuguese).

## Run locally

```bash
git clone https://github.com/antonio-leblanc/brasil-grid.git
cd brasil-grid
npm install
npm run dev     # dev server
npm test        # tests (vitest)
npm run build   # production build
```

To refresh the Price section data, see [`pipeline/README.md`](./pipeline/README.md) (Python with `uv`, in Portuguese).

## Stack

React 19, TypeScript, Vite and Tailwind CSS v4. Map on MapLibre GL with the Esri World Dark Gray Canvas basemap (no token, with Esri attribution). Charts in plain SVG, no charting library. No backend: static data plus the open ONS API.

## Sources

- [ONS](https://dados.ons.org.br): open data on load, CMO, EAR and energy balance
- [CCEE](https://www.ccee.org.br): market rules and spot price (PLD)
- [ANEEL](https://www.gov.br/aneel): SIGEL, georeferenced registry of plants and lines
- [EPE](https://www.epe.gov.br): National Energy Balance

## License

MIT. Made by [Antonio Leblanc](https://github.com/antonio-leblanc).
