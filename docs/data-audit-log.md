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
| **2026-09-24** | Usinas Hidrelétricas — Lote 1: Top 16 (`powerPlantsData.ts`) | [ANEEL — SIGA / SIGEL](https://siga.aneel.gov.br/) | 16 maiores UHEs (>65 GW): Itaipu, Belo Monte, Tucuruí, Paulo Afonso, Jirau, Santo Antônio, Ilha Solteira, Xingó, Itumbiara, Teles Pires, São Simão, Foz do Areia, Jupiá, Porto Primavera, Luiz Gonzaga/Itaparica, Marimbondo | ⚠️ Fonte genérica (home page — pendente link direto para dataset de geração da ANEEL) | `8e7cf83` |
| **2026-09-25** | Linhas Tronco Tier 3 — 36 LTs auditadas (`transmissionLinesData.ts`) | [ONS — Cadastro de Linhas de Transmissão da Rede Básica](https://dados.ons.org.br/dataset/linha-transmissao) ([`LINHA_TRANSMISSAO.csv`](https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv)) | 36 linhas tronco: conferência e retificação de comprimentos reais em km (eliminando estimativas arredondadas), níveis nominais de tensão (retificada Furnas–Adrianópolis para 345 kV e Araraquara–Taubaté para 500 kV), códigos de equipamento ONS, concessionárias oficiais e subestações terminais | ✅ Aprovado (100% conferido com dataset primário oficial do ONS) | `d5ac39a` / `271896e` |

---

## ⏳ Fila de Auditoria Pendente (Para o Próximo Agente)

### 📌 Lote 2: Restante das Usinas Hidrelétricas (23 UHEs — `powerPlantsData.ts`)
*Regra de Ouro:* Consultar CEG oficial no SIGA da ANEEL ([siga.aneel.gov.br](https://siga.aneel.gov.br/)), validar capacidade fiscalizada (MW), coordenadas, UGs, operador atualizado e preencher `sources: SourceRef[]` com `accessedAt: '2026-09-24'`.

| # | ID no Código | Nome da Usina | Potência Atual | Subsistema / UF | Rio / Bacia | Notas para Auditoria |
|---|---|---|---|---|---|---|
| 17 | `ita` | UHE Itá | 1.450 MW | S (SC) | Rio Uruguai | Consórcio Itá (Engie Brasil) |
| 18 | `salto-santiago` | UHE Salto Santiago | 1.420 MW | S (PR) | Rio Iguaçu | Engie Brasil |
| 19 | `uhe-agua-vermelha` | UHE Água Vermelha | 1.396 MW | SE/CO (SP/MG) | Rio Grande | Auren Energia |
| 20 | `furnas` | UHE Furnas | 1.312 MW | SE/CO (MG) | Rio Grande | Axia Energia (Furnas) |
| 21 | `serra-da-mesa` | UHE Serra da Mesa | 1.275 MW | SE/CO (GO) | Rio Tocantins | Axia Energia / CPFL |
| 22 | `uhe-segredo` | UHE Gov. Ney Braga (Segredo) | 1.260 MW | S (PR) | Rio Iguaçu | Copel GeT |
| 23 | `salto-caxias` | UHE Salto Caxias (Gov. José Richa) | 1.240 MW | S (PR) | Rio Iguaçu | Copel GeT |
| 24 | `emborcacao` | UHE Emborcação | 1.192 MW | SE/CO (MG/GO) | Rio Paranaíba | Cemig GT |
| 25 | `machadinho` | UHE Machadinho | 1.140 MW | S (RS/SC) | Rio Pelotas/Uruguai | Consórcio Machadinho (Engie) |
| 26 | `estreito` | UHE Estreito | 1.087 MW | N (MA/TO) | Rio Tocantins | CESTE (Engie / Vale / Alcoa) |
| 27 | `uhe-salto-osorio` | UHE Salto Osório | 1.078 MW | S (PR) | Rio Iguaçu | Engie Brasil |
| 28 | `sobradinho` | UHE Sobradinho | 1.050 MW | NE (BA) | Rio São Francisco | Axia Energia (Chesf) |
| 29 | `uhe-lajeado` | UHE Luís Eduardo Magalhães (Lajeado) | 902 MW | N (TO) | Rio Tocantins | Investco (EDP / CPFL / CELESC) |
| 30 | `uhe-campos-novos` | UHE Campos Novos | 880 MW | S (SC) | Rio Canoas | Enercan (CPFL / Celesc) |
| 31 | `uhe-tres-irmaos` | UHE Três Irmãos | 807 MW | SE/CO (SP) | Rio Tietê | Tiete Energia / Terna |
| 32 | `uhe-sao-manoel` | UHE São Manoel | 700 MW | N (MT/PA) | Rio Teles Pires | EESM (EDP / Axia / CTG) |
| 33 | `uhe-barra-grande` | UHE Barra Grande | 690 MW | S (RS/SC) | Rio Pelotas | BAESA (CPFL / Alcoa) |
| 34 | `uhe-cachoeira-dourada` | UHE Cachoeira Dourada | 658 MW | SE/CO (GO/MG) | Rio Paranaíba | Enel Green Power |
| 35 | `uhe-capivara` | UHE Capivara | 619 MW | SE/CO (SP/PR) | Rio Paranapanema | CTG Brasil |
| 36 | `uhe-peixe-angical` | UHE Peixe Angical | 452 MW | N (TO) | Rio Tocantins | Enerpeixe (EDP Brasil) |
| 37 | `uhe-tres-marias` | UHE Três Marias | 396 MW | SE/CO (MG) | Rio São Francisco | Cemig GT |
| 38 | `uhe-balbina` | UHE Balbina | 250 MW | N (AM) | Rio Uatumã | Axia Energia (Eletronorte) |
| 39 | `uhe-samuel` | UHE Samuel | 242 MW | N (RO) | Rio Jamari | Axia Energia (Eletronorte) |

---

### 📌 Lote 3: Usinas Térmicas, Nucleares, Eólicas e Solares (33 Usinas)
- **Nuclear (1):** `angra-nuclear` (Central Nuclear Almirante Álvaro Alberto — Angra 1 e Angra 2: 1.990 MW, Eletronuclear).
- **Térmicas a Gás / Biomassa / Carvão:** Porto de Sergipe I, GNA I, Parnaíba, Norte Fluminense, Termopernambuco, Candiota III, etc.
- **Eólicas:** Alto Sertão, Lagoa dos Ventos, Chuí, Rio do Vento, etc.
- **Solares:** Janaúba, São Gonçalo, Futura, Pirapora, etc.


