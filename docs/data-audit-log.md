# 📋 Registro de Auditoria & Proveniência de Dados (Anti-Alucinação)

> **Objetivo:** Garantir a rastreabilidade absoluta de cada número, potência, coordenada e limite físico exibido no `brasil-grid`.
> **Regra de Ouro:** Nenhum dado estático entra no repositório sem fonte primária oficial, data de extração (`accessedAt`) e veredito documentado. Elimina a necessidade de re-auditar dados no futuro e blinda o projeto contra alucinações ("AI slop").

---

## 🏛️ Fontes Primárias Oficiais Autorizadas

1. **ANEEL — SIGA (Sistema de Informações de Geração da ANEEL):** Capacidade outorgada e fiscalizada (MW), coordenadas, número de unidades geradoras e razão social do concessionário.
2. **ONS — Dados Abertos & Relatórios Oficiais (RAP / REA / PAR):** Carga horária, intercâmbios, limites dinâmicos por fronteira e análises de perturbação.
3. **CCEE — Regras e Limites de Comercialização:** Limites de PLD (piso e teto), preços horários e liquidação financeira.
4. **EPE — Anuário Estatístico & Balanço Energético Nacional (BEN):** Consumo agregado, matriz energética, perdas de transmissão e distribuição.

---

## 📜 Histórico de Auditorias Realizadas

| Data (`accessedAt`) | Dataset / Entidade | Fonte Primária | Parâmetros Verificados | Veredito | Auditor / Commit |
|---|---|---|---|---|---|
| **2026-09-24** | Dossiê Apagão 15/08/2023 (`sinDossiersData.ts`) | [ONS — RAP do Apagão de 15/08/2023](https://www.ons.org.br/AcervoDigitalDocumentosEPublicacoes/Apresenta%C3%A7%C3%A3o%20ERAC%2015-08-2023.pdf) | Carga cortada (~23.368 MW / ≈32%), causa primária (controle de tensão de IBRs), refutação de inércia | ✅ Aprovado (retificada fake news de ~19 GW e falsa tese de inércia) | `562a346` |
| **2026-09-24** | Limites Regulatórios PLD (`sinDossiersData.ts`) | [CCEE / ANEEL — Preços e Limites PLD 2026](https://www.ccee.org.br/mercado/precos/historico-de-precos) | PLD Máximo Estrutural (R$ 697,41/MWh), PLD Mínimo (R$ 61,07/MWh) | ✅ Aprovado (valores de 2026 validados) | `562a346` |
| **2026-09-24** | Cadeia de Valor & Escalas (`energyChainData.ts`, `scaleData.ts`) | [EPE — Anuário Estatístico da Energia Elétrica 2025](https://www.epe.gov.br/) & Procel | Consumo nacional (≈530 TWh), perdas de rede (≈16%), geração per capita e emissões (≈0,08 tCO2/MWh) | ✅ Aprovado (alinhado com publicações oficiais) | `562a346` |
| **2026-09-24** | Linhas Tronco (`transmissionLinesData.ts`) | ONS, ANEEL, Concessionárias (XRTE, BMTE, Axia, Taesa) | 16 linhas verificadas, coordenadas dos terminais, tensão nominal (kV) e tecnologia (CC vs CA) | ✅ Aprovado (expurgados 36 corredores fictícios) | `562a346` |

---

## ⏳ Fila de Auditoria Pendente (Próxima Sessão)

### 1. Usinas Estratégicas (`src/data/powerPlantsData.ts` — 72 usinas)
- **Fonte Obrigatória:** Portal SIGA da ANEEL ([siga.aneel.gov.br](https://siga.aneel.gov.br/))
- **Checklist:**
  - [ ] Capacidade fiscalizada / outorgada em MW (usar capacidade fiscalizada como padrão).
  - [ ] Coordenadas [longitude, latitude] verificadas no SIGEL/SIGA (evitar pontos em cidades vizinhas).
  - [ ] Concessionária / Titularidade atualizada (atualizar cisões e privatizações, ex.: Eletrobras → Axia).
  - [ ] Ano de comissionamento e bacia hidrográfica / região.
  - [ ] Adição do atributo `sources: [{ label: 'ANEEL SIGA - CEG ...', url: '...', accessedAt: 'YYYY-MM-DD' }]`.

### 2. Intercâmbios Regionais & Gargalos (`src/data/interchangeData.ts`)
- **Fonte Obrigatória:** ONS — Procedimentos de Rede (Submódulo 23.3) & Relatórios de Planejamento da Operação.
- **Checklist:**
  - [ ] Nomenclatura operativa padronizada (FNESE, FNEN, FSECO, RSUL).
  - [ ] Limites sazonais e operativos nominais em MW.
  - [ ] Snapshot histórico de demanda: recorde do SIN em 106.532 MW (26/02/2025).
  - [ ] Adição de `sources` com `accessedAt`.
