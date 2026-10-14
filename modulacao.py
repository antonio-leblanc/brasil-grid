"""Custo de modulação no Sudeste: quanto custa entregar a forma da carga.

Quem vende energia flat (o mesmo MW toda hora) e precisa entregar a curva
de carga do cliente compra mais justo nas horas caras. O custo disso é a
diferença entre o preço médio ponderado pela carga e o preço médio simples
do mês.

Usa o CMO, não o PLD: sem o piso e o teto da Aneel, os picos aparecem
maiores do que o mercado paga. E a carga é a do Sudeste inteiro; a de
residência e comércio pequeno tem pico mais concentrado no fim da tarde,
então o custo pra esse cliente tende a ser maior que o daqui.
"""

import matplotlib.pyplot as plt
import pandas as pd

import dados

cmo = dados.cmo("SE").resample("h").mean()
carga = dados.carga("SE")

df = pd.concat({"cmo": cmo, "carga": carga}, axis=1).dropna()
df["receita"] = df["cmo"] * df["carga"]

mes = df.resample("ME").agg({"cmo": "mean", "carga": "sum", "receita": "sum"})
mes["ponderado"] = mes["receita"] / mes["carga"]
mes["custo"] = mes["ponderado"] - mes["cmo"]

fig, (ax_preco, ax_custo) = plt.subplots(2, 1, figsize=(12, 9), sharex=True)

ax_preco.plot(mes["cmo"], color="tab:gray", linewidth=1.5, label="média simples (flat)")
ax_preco.plot(mes["ponderado"], color="tab:red", linewidth=1.5, label="ponderada pela carga")
ax_preco.set_title("Sudeste: CMO médio do mês, simples × ponderado pela carga")
ax_preco.set_ylabel("R$/MWh")
ax_preco.grid(alpha=0.3)
ax_preco.legend()

ax_custo.bar(mes.index, mes["custo"], width=20, color="tab:red")
ax_custo.axhline(0, color="black", linewidth=0.8)
ax_custo.set_title("Custo de modulação: ponderado − simples")
ax_custo.set_ylabel("R$/MWh")
ax_custo.grid(alpha=0.3)

fig.tight_layout()
fig.savefig("data/modulacao.png", dpi=150)
plt.show()
