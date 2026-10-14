"""CMO do Sudeste por hora do dia, uma curva por ano.

Cada curva é a média de todos os dias do ano naquela meia hora. Se o
preço zera no meio do dia e dispara no fim da tarde, aparece como um vale
ao meio-dia e um pico por volta das 18h. A pergunta é de quando essa
forma começa a aparecer.

O ano corrente é parcial e entra na legenda com a data do último dado. Refeito
com a mesma janela (1º/jan até a data do último dado) em todos os anos, a
conclusão não muda: 2025 vai de ~2,9× pra ~3,2× entre 18h e meio-dia.
"""

import matplotlib.pyplot as plt

import dados

cmo = dados.cmo("SE")
ultimo = cmo.dropna().index.max()

perfil = (
    cmo.groupby([cmo.index.year, cmo.index.hour + cmo.index.minute / 60])
    .mean()
    .unstack(level=0)
)

fig, ax = plt.subplots(figsize=(12, 6))
cores = plt.cm.viridis([i / (len(perfil.columns) - 1) for i in range(len(perfil.columns))])
for ano, cor in zip(perfil.columns, cores):
    ax.plot(perfil.index, perfil[ano], color=cor, linewidth=2, label=f"{ano} (até {ultimo:%d/%m})" if ano == ultimo.year else str(ano))

ax.set_title("Sudeste: CMO médio por hora do dia, um ano por curva")
ax.set_xlabel("hora do dia")
ax.set_ylabel("R$/MWh")
ax.set_xticks(range(0, 24, 2))
ax.grid(alpha=0.3)
ax.legend()

fig.tight_layout()
fig.savefig("data/perfil-horario.png", dpi=150)
plt.show()
