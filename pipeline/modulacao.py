"""Custo de modulação no Sudeste: quanto custa entregar a forma da carga.

Quem vende energia flat (o mesmo MW toda hora) e precisa entregar a curva
de carga do cliente compra mais justo nas horas caras. O custo disso é a
diferença entre o preço médio ponderado pela carga e o preço médio simples
do mês.

Usa o CMO, não o PLD: sem o piso e o teto da Aneel, os picos aparecem
maiores do que o mercado paga. E a carga é a do Sudeste inteiro; a de
residência e comércio pequeno tem pico mais concentrado no fim da tarde,
então o custo pra esse cliente tende a ser maior que o daqui. Pra dar a
ordem de grandeza do extremo, o script imprime o preço médio de 2026 de um
cliente que só consome das 18h às 22h (horas 18, 19, 20 e 21) contra o flat.
"""

import matplotlib.pyplot as plt
import pandas as pd

import dados

cmo = dados.cmo("SE").resample("h").mean()
carga = dados.carga("SE")

df = pd.concat({"cmo": cmo, "carga": carga}, axis=1).dropna()
df["valor"] = df["cmo"] * df["carga"]  # R$ por hora: custo de entregar a carga ao CMO

mes = df.resample("MS").agg({"cmo": "mean", "carga": "sum", "valor": "sum"})
mes["ponderado"] = mes["valor"] / mes["carga"]
mes["custo"] = mes["ponderado"] - mes["cmo"]
mes.index += pd.Timedelta(days=14)  # barra no meio do mês

ano = cmo["2026"]
bloco = ano[(ano.index.hour >= 18) & (ano.index.hour < 22)]
print(f"2026 até {ano.dropna().index.max():%d/%m}: flat R$ {ano.mean():.0f}/MWh, "
      f"só 18h–22h R$ {bloco.mean():.0f}/MWh")

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
