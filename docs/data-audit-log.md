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
| **2026-09-24** | Usinas Hidrelétricas — Lote 1: Top 16 (`powerPlantsData.ts`) | [ANEEL — Dados Abertos SIGA](https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel) & [ONS](https://dados.ons.org.br/dataset/capacidade-geracao) | 16 maiores UHEs (>65 GW): Itaipu, Belo Monte, Tucuruí, Paulo Afonso, Jirau, Santo Antônio, Ilha Solteira, Xingó, Itumbiara, Teles Pires, São Simão, Foz do Areia, Jupiá, Porto Primavera, Luiz Gonzaga/Itaparica, Marimbondo | ✅ Aprovado (dívida quitada em 2026-09-25 com links diretos do dataset SIGA e ONS) | `8e7cf83` / `271896e` |
| **2026-09-25** | Linhas Tronco Tier 3 — 36 LTs auditadas (`transmissionLinesData.ts`) | [ONS — Cadastro de Linhas de Transmissão da Rede Básica](https://dados.ons.org.br/dataset/linha-transmissao) ([`LINHA_TRANSMISSAO.csv`](https://ons-aws-prod-opendata.s3.amazonaws.com/dataset/linha_transmissao/LINHA_TRANSMISSAO.csv)) | 36 linhas tronco: conferência e retificação de comprimentos reais em km (eliminando estimativas arredondadas), níveis nominais de tensão (retificada Furnas–Adrianópolis para 345 kV e Araraquara–Taubaté para 500 kV), códigos de equipamento ONS, concessionárias oficiais e subestações terminais | ✅ Aprovado (100% conferido com dataset primário oficial do ONS) | `d5ac39a` / `271896e` |
| **2026-09-25** | Linhas Tronco Tier 1 e 2 — Expurgo Wikipedia (`transmissionLinesData.ts`) | [ONS](https://dados.ons.org.br/dataset/linha-transmissao), [EPE](https://www.epe.gov.br/) & [ANEEL](https://antigo.aneel.gov.br/editais-de-transmissao) | 9 circuitos tronco (Bipolos Belo Monte, Madeira, Itaipu HVDC e 765 kV, Tucuruí-Manaus, Norte-Sul, Graça Aranha-Silvânia, Porto de Sergipe-Jardim): remoção de 10 links da Wikipedia e substituição por cadastros da Rede Básica ONS e estudos da EPE | ✅ Aprovado (0 links secundários restantes na transmissão) | `HEAD` |
| **2026-09-25** | Usinas Hidrelétricas — Lote 2: 23 UHEs (`powerPlantsData.ts`) | [ANEEL — Dados Abertos SIGA](https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel) & [ONS](https://dados.ons.org.br/dataset/capacidade-geracao) | 23 UHEs auditadas: Itá, Salto Santiago, Água Vermelha, Furnas, Serra da Mesa, Segredo, Salto Caxias, Emborcação, Machadinho, Estreito, Salto Osório, Sobradinho, Lajeado, Campos Novos, Três Irmãos, São Manoel, Barra Grande, Cachoeira Dourada, Capivara, Peixe Angical, Três Marias, Balbina, Samuel com CEG canônico e potência fiscalizada conferidos | ✅ Aprovado (100% verificado contra CSV oficial SIGA) | `HEAD` |
| **2026-09-25** | Usinas Térmicas, Nuclear, Eólicas e Solares — Lote 3: 33 usinas (`powerPlantsData.ts`) | [ANEEL — Dados Abertos SIGA](https://dadosabertos.aneel.gov.br/dataset/siga-sistema-de-informacoes-de-geracao-da-aneel), [Eletronuclear](https://www.eletronuclear.gov.br/) & [ONS](https://dados.ons.org.br/dataset/capacidade-geracao) | 33 usinas auditadas: Central Nuclear Angra 1 e 2, 13 térmicas (Porto de Sergipe, GNA I, Parnaíba, Norte Fluminense, Jorge Lacerda, Mauá 3, Termomacaé, Baixada Fluminense, Cuiabá, Santa Cruz, Termopernambuco, Candiota III, São Martinho), 10 eólicas (Alto Sertão, Lagoa dos Ventos, Rio do Vento, Osório, Chafariz, Morro do Chapéu, Serra do Mel, Santa Vitória, Ventos do Araripe, Coxilha Negra), 9 solares (Janaúba, Pirapora, Ituverava, Futura, São Gonçalo, Mendubim, Sol do Sertão, Lar do Sol, Arinos) com CEG e outorgas ANEEL conferidos | ✅ Aprovado (100% verificado contra CSV oficial SIGA) | `HEAD` |

---

## ⏳ Fila de Auditoria Pendente

Toda a base cadastral existente (72 usinas geradoras e 52 linhas de transmissão tronco) foi **100% auditada com fontes primárias oficiais e links profundos**. Não restam entidades sem fontes ou com fontes genéricas.



