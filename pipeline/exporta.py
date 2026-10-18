"""Exporta as séries do pilar "Preço" pro site, em JSON.

O site desenha os gráficos em SVG a partir destes arquivos; o PNG dos outros
scripts fica só pra exploração aqui. Saída em src/data/mercado/, versionada
no repo como snapshot: atualizar é rodar este script e commitar o JSON.

A razão 18h ÷ meio-dia usa a média de cada hora cheia (18:00 e 18:30 juntas),
a mesma conta do README. Ela é calculada também na janela do ano corrente
(1º/jan até o último dado) em todos os anos, pra comparar ano parcial com ano
parcial. Anos com meio-dia perto de zero (2023) não têm razão: fica null.
"""

import json
from datetime import date
from pathlib import Path

import pandas as pd

import dados

SAIDA = Path(__file__).parent.parent / "src" / "data" / "mercado"
MEIO_DIA_MINIMO = 5  # R$/MWh; abaixo disso a razão explode e não diz nada


def _razao(cmo: pd.Series) -> float | None:
    por_hora = cmo.groupby(cmo.index.hour).mean()
    if por_hora[12] < MEIO_DIA_MINIMO:
        return None
    return round(float(por_hora[18] / por_hora[12]), 1)


def perfil_horario() -> dict:
    cmo = dados.cmo("SE").dropna()
    ultimo = cmo.index.max()
    meia_hora = cmo.index.hour * 2 + cmo.index.minute // 30
    perfil = cmo.groupby([cmo.index.year, meia_hora]).mean().unstack(level=0)

    anos = []
    for ano in perfil.columns:
        do_ano = cmo[cmo.index.year == ano]
        mesma_janela = do_ano[do_ano.index.dayofyear <= ultimo.dayofyear]
        anos.append({
            "ano": int(ano),
            "parcial": bool(ano == ultimo.year),
            "cmo": [round(float(v), 1) for v in perfil[ano]],
            "razao18h12h": _razao(do_ano),
            "razao18h12hMesmaJanela": _razao(mesma_janela),
        })

    return {
        "subsistema": "SE",
        "unidade": "R$/MWh",
        "inicio": cmo.index.min().strftime("%Y-%m-%d"),
        "ultimoDado": ultimo.strftime("%Y-%m-%d"),
        "geradoEm": date.today().isoformat(),
        "anos": anos,
    }


if __name__ == "__main__":
    SAIDA.mkdir(parents=True, exist_ok=True)
    arquivo = SAIDA / "cmoPerfilHorario.json"
    arquivo.write_text(json.dumps(perfil_horario(), ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"escrito {arquivo}")
