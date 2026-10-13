# laboratório de energia

Laboratório pessoal para entender o mercado de energia elétrica brasileiro a partir de dados públicos: como chuva, reservatório e demanda viram preço, e o que esse preço faz com quem compra e vende energia.

## A cadeia que os gráficos seguem

1. **ENA** (energia natural afluente): quanta água chega às usinas, em % da média histórica.
2. **EAR** (energia armazenada): o "estoque" dos reservatórios. Quando ele cai, as térmicas são acionadas.
3. **CMO** (custo marginal de operação): quanto custa produzir o próximo MWh, calculado pelo ONS.
4. **PLD** (preço de liquidação das diferenças): é o CMO limitado por um piso e um teto. É o preço do mercado de curto prazo.
5. **Contrato × PLD**: quem vendeu a preço fixo sem ter comprado a energia antes paga o PLD na diferença.

## Gráficos planejados

- [ ] EAR diária por subsistema, 2020 até hoje (secas de 2021 e 2024)
- [ ] CMO semi-horário de uma semana (pico no fim da tarde, quando a solar sai)
- [ ] ENA × CMO (a relação entre chuva e preço, que não é linear)
- [ ] Simulação: posição vendida a preço fixo contra o preço real, mês a mês, e o resultado acumulado

## Fontes

- **ONS**, [dados.ons.org.br](https://dados.ons.org.br): API CKAN aberta, com arquivos anuais em Parquet e CSV no S3. Datasets: `ear-diario-por-subsistema`, `ena-diario-por-subsistema`, `cmo-semi-horario`, `cmo-semanal`, `curva-carga`, `carga-energia`.
- **CCEE**, [dadosabertos.ccee.org.br](https://dadosabertos.ccee.org.br): PLD horário. A API bloqueia requisição por script (403), então baixar o CSV pelo navegador e colocar em `data/`.

## Rodar

```
uv sync
uv run python <script>.py
```
