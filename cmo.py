"""CMO do Sudeste: o custo de gerar o próximo MWh, calculado pelo ONS.

Em cima, a média de cada mês contra a água guardada no Brasil: até 2023 os
dois andam juntos (pouca água, preço alto). De 2025 em diante o preço sobe
com reservatório no meio.

Embaixo, uma semana de 2026 de meia em meia hora: o preço zera no meio do
dia, com sol sobrando, e dispara no fim da tarde, quando a solar sai e a
demanda continua. A média do mês esconde esse pico.
"""

import matplotlib.pyplot as plt

import dados

TETO_PLD_2026 = 1611  # R$/MWh, teto horário definido pela Aneel

cmo = dados.cmo("SE")
ear = dados.ear_brasil()

fig, (ax_mes, ax_semana) = plt.subplots(2, 1, figsize=(12, 9))

# Média mensal do CMO contra a EAR
ax_mes.plot(cmo.resample("ME").mean(), color="tab:red", linewidth=1.5)
ax_mes.set_ylabel("CMO médio do mês (R$/MWh)", color="tab:red")
ax_mes.set_title("Sudeste: preço médio do mês × água guardada no Brasil")
ax_mes.grid(alpha=0.3)

ax_agua = ax_mes.twinx()
ax_agua.plot(ear, color="tab:blue", linewidth=1, alpha=0.6)
ax_agua.set_ylabel("EAR Brasil (%)", color="tab:blue")
ax_agua.set_ylim(0, 100)

# Uma semana, de meia em meia hora
semana = cmo["2026-08-28":"2026-09-04"]
ax_semana.plot(semana, color="tab:red", linewidth=1)
ax_semana.axhline(TETO_PLD_2026, color="black", linestyle="--", linewidth=1)
ax_semana.text(semana.index[0], TETO_PLD_2026, " teto do PLD 2026 (R$ 1.611)",
               va="bottom", fontsize=9)
ax_semana.set_title("Sudeste: CMO de meia em meia hora, 28/08 a 04/09/2026")
ax_semana.set_ylabel("R$/MWh")
ax_semana.grid(alpha=0.3)

fig.tight_layout()
fig.savefig("data/cmo.png", dpi=150)
plt.show()
