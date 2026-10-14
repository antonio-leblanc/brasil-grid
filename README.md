# laboratório de energia

Laboratório pessoal para entender o mercado de energia elétrica brasileiro a partir de dados públicos: como chuva, reservatório e demanda viram preço, e o que esse preço faz com quem compra e vende energia.

## A cadeia que os gráficos seguem

1. **ENA** (energia natural afluente): quanta água chega às usinas, em % da média histórica.
2. **EAR** (energia armazenada): o "estoque" dos reservatórios. Quando ele cai, as térmicas são acionadas.
3. **CMO** (custo marginal de operação): quanto custa produzir o próximo MWh, calculado pelo ONS.
4. **PLD** (preço de liquidação das diferenças): o preço do mercado de curto prazo. Desde 2021 é horário, por submercado, calculado pelo DESSEM e limitado por piso e teto (teto horário de 2026: R$ 1.611/MWh).
5. **Contrato × PLD**: quem vendeu a preço fixo sem ter comprado a energia antes paga o PLD na diferença.

## Gráficos

- [x] `ear.py`: EAR do Brasil (SIN) e por região, 2020 até hoje
- [x] `cmo.py`: CMO médio do mês do Sudeste × EAR, e uma semana de 2026 de meia em meia hora
- [x] `perfil_horario.py`: perfil médio do CMO do Sudeste por hora do dia, uma curva por ano
- [ ] Simulação: posição vendida a preço fixo contra o PLD real, mês a mês, e o resultado acumulado. Depende do PLD da CCEE em `data/ccee/`
- [ ] ENA × CMO (a relação entre chuva e preço, que não é linear)
- [ ] Spread de preço entre submercados (risco de vender numa região com energia comprada em outra)
- [x] `modulacao.py`: custo de modulação do Sudeste, CMO ponderado pela curva de carga contra a média flat, mês a mês

## O que os dados mostraram

- **O Sudeste é ~70% da capacidade de armazenamento**, então a EAR do Brasil anda colada nele.
- **2021 foi crise porque o reservatório não encheu:** o pico do verão foi ~45%, contra 60% em 2020 e 75–88% em 2022–2023. O CMO médio de ago/2021 chegou a R$ 2.540.
- **2024 não foi seca de reservatório:** o Brasil não ficou abaixo de ~44%. Houve só um pico curto de preço em out/2024 (média de R$ 516).
- **De 2025 em diante o preço descolou da água:** CMO médio de R$ 200–330 com reservatório entre 45% e 70%. Em 2023, com água parecida, era zero.
- **O risco agora é a hora do dia:** em 28/08–04/09/2026 o CMO zerou todo dia no meio do dia e disparou por volta das 18h, chegando a R$ 7.849 em 31/08, com reservatório em ~62%.
- **A curva do pato começou em 2024 e se aprofunda todo ano:** até 2023 o CMO médio era plano ao longo do dia. A razão entre 18h e meio-dia foi ~2× em 2024 (R$ 171 × 82), ~3× em 2025 (285 × 101) e ~7× em 2026 (374 × 52). Vender energia flat ficou barato de comprar ao meio-dia e caro de entregar no fim da tarde.
- **Pra carga média do Sudeste, a curva do pato custa pouco:** a modulação ficou em R$ 2–9/MWh por mês em 2025–2026. A carga às 19h é só ~13% maior que ao meio-dia, então o pico de preço pesa pouco na média. O custo depende da forma da carga de cada cliente: entregar só o bloco das 18h às 21h custou R$ 338/MWh em 2026, contra R$ 193 do flat. Cliente com consumo concentrado no fim da tarde fica entre os dois.

## Fontes

- **ONS**, [dados.ons.org.br](https://dados.ons.org.br): API CKAN aberta, com arquivos anuais em Parquet e CSV no S3. Datasets: `ear-diario-por-subsistema`, `ena-diario-por-subsistema`, `cmo-semi-horario`, `cmo-semanal`, `curva-carga`, `carga-energia`.
- **CCEE**, [dadosabertos.ccee.org.br](https://dadosabertos.ccee.org.br): PLD horário. A API bloqueia requisição por script (403), então baixar o CSV pelo navegador e colocar em `data/ccee/`.

## Rodar

```
uv sync
uv run <script>.py
```

`ons.py` baixa os datasets do ONS com cache em `data/ons/`; `dados.py` limpa e devolve as séries prontas pros gráficos.
