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


def _opcional(valor: float) -> float | None:
    return None if pd.isna(valor) else round(float(valor), 1)


def mensal() -> dict:
    """Um registro por mês: EAR do Brasil, CMO do Sudeste e custo de modulação.

    A modulação é a conta do `modulacao.py`: CMO ponderado pela carga horária
    do Sudeste menos o CMO médio simples. Mês sem carga publicada fica null.
    O mês do último dado é parcial e usa só os dias que existem.
    """
    cmo = dados.cmo("SE")
    ultimo = cmo.dropna().index.max()
    ear = dados.ear_brasil()

    cmo_hora = cmo.resample("h").mean()
    df = pd.concat({"cmo": cmo_hora, "carga": dados.carga("SE")}, axis=1).dropna()
    df["valor"] = df["cmo"] * df["carga"]
    carga_mes = df.resample("MS").agg({"cmo": "mean", "carga": "sum", "valor": "sum"})
    modulacao = carga_mes["valor"] / carga_mes["carga"] - carga_mes["cmo"]

    meses = pd.concat({
        "ear": ear.resample("MS").mean(),
        "cmo": cmo.resample("MS").mean(),
        "modulacao": modulacao,
    }, axis=1).dropna(subset=["ear", "cmo"])

    ano = cmo_hora[str(ultimo.year)]
    fim_de_tarde = ano[(ano.index.hour >= 18) & (ano.index.hour < 22)]

    return {
        "subsistemaCmo": "SE",
        "unidade": "R$/MWh",
        "ultimoDado": ultimo.strftime("%Y-%m-%d"),
        "geradoEm": date.today().isoformat(),
        "meses": [
            {
                "mes": m.strftime("%Y-%m"),
                "earBrasil": round(float(linha.ear), 1),
                "cmo": round(float(linha.cmo), 1),
                "modulacao": _opcional(linha.modulacao),
            }
            for m, linha in meses.iterrows()
        ],
        "blocoAnoCorrente": {
            "ano": int(ultimo.year),
            "flat": round(float(ano.mean()), 1),
            "fimDeTarde18h22h": round(float(fim_de_tarde.mean()), 1),
        },
    }


if __name__ == "__main__":
    SAIDA.mkdir(parents=True, exist_ok=True)
    for nome, dados_json in [("cmoPerfilHorario", perfil_horario()), ("mercadoMensal", mensal())]:
        arquivo = SAIDA / f"{nome}.json"
        arquivo.write_text(json.dumps(dados_json, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"escrito {arquivo}")
