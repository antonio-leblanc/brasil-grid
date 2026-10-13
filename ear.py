"""EAR diária, 2020 até hoje: o Brasil inteiro em cima, as quatro regiões embaixo.

EAR é a água guardada nos reservatórios, medida pela energia que ela gera.
O Brasil (SIN) é a soma da água das regiões dividida pela soma das
capacidades, então o Sudeste, com ~70% da capacidade, pesa ~70% da linha.
"""

from datetime import date

import matplotlib.pyplot as plt
import pandas as pd

import ons

df = ons.carregar("ear-diario-por-subsistema", range(2020, date.today().year + 1))
df["ear_data"] = pd.to_datetime(df["ear_data"])
# Até 2022 o ONS publicou os números como texto; de 2023 em diante, como float.
for col in ["ear_max_subsistema", "ear_verif_subsistema_mwmes", "ear_verif_subsistema_percentual"]:
    df[col] = pd.to_numeric(df[col])

total = df.groupby("ear_data")[["ear_verif_subsistema_mwmes", "ear_max_subsistema"]].sum()
brasil = total["ear_verif_subsistema_mwmes"] / total["ear_max_subsistema"] * 100

regioes = df.pivot(index="ear_data", columns="nom_subsistema",
                   values="ear_verif_subsistema_percentual")

fig, (ax_br, ax_reg) = plt.subplots(2, 1, figsize=(12, 8), sharex=True,
                                    height_ratios=[2, 1])

ax_br.plot(brasil, color="black", linewidth=1.5)
ax_br.set_title("Brasil (SIN): energia armazenada, % da capacidade máxima")

regioes.plot(ax=ax_reg, linewidth=0.8)
ax_reg.set_title("Por região, % da capacidade de cada uma")
ax_reg.legend(loc="upper left", fontsize=8, ncols=4)

for ax in (ax_br, ax_reg):
    ax.set_ylim(0, 100)
    ax.set_ylabel("%")
    ax.set_xlabel("")
    ax.grid(alpha=0.3)

fig.tight_layout()
fig.savefig("data/ear.png", dpi=150)
plt.show()
