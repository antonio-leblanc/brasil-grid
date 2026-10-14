"""Séries limpas a partir dos datasets do ONS, prontas pra plotar.

Até 2022 o ONS publicou os números como texto; de 2023 em diante, como float.
Por isso toda coluna numérica passa por pd.to_numeric aqui. Os ids e nomes de
subsistema às vezes vêm com espaço no fim ('N ' no EAR de 2026), então passam
por strip antes de qualquer filtro.

Horário: CMO (meia hora) e carga (hora) começam o dia em 00:00 e terminam em
23:30/23:00, ou seja, os dois marcam o início do intervalo e ficam alinhados.
O dicionário de dados do ONS não diz isso explicitamente.
"""

from datetime import date

import pandas as pd

import ons

ANOS = range(2020, date.today().year + 1)


def _limpar_subsistema(df: pd.DataFrame) -> pd.DataFrame:
    for col in ["id_subsistema", "nom_subsistema"]:
        df[col] = df[col].str.strip()
    return df


def ear() -> pd.DataFrame:
    df = _limpar_subsistema(ons.carregar("ear-diario-por-subsistema", ANOS))
    df["ear_data"] = pd.to_datetime(df["ear_data"])
    for col in ["ear_max_subsistema", "ear_verif_subsistema_mwmes", "ear_verif_subsistema_percentual"]:
        df[col] = pd.to_numeric(df[col])
    return df


def ear_brasil() -> pd.Series:
    """% do SIN: água somada das regiões / capacidade somada."""
    total = ear().groupby("ear_data")[["ear_verif_subsistema_mwmes", "ear_max_subsistema"]].sum()
    return total["ear_verif_subsistema_mwmes"] / total["ear_max_subsistema"] * 100


def ear_regioes() -> pd.DataFrame:
    """% de cada região, uma coluna por região."""
    return ear().pivot(index="ear_data", columns="nom_subsistema",
                       values="ear_verif_subsistema_percentual")


def cmo(subsistema: str = "SE") -> pd.Series:
    """CMO de meia em meia hora, em R$/MWh.

    O ONS tem dias inteiros sem CMO (42 no Sudeste entre 2020 e 2026, quase
    metade em dez/2022–jan/2023). Eles não são preenchidos: a série devolvida
    tem NaN nesses dias, pra média mensal ignorar e o gráfico de linha quebrar
    em vez de ligar por cima do buraco.
    """
    df = _limpar_subsistema(ons.carregar("cmo-semi-horario", ANOS))
    df = df[df["id_subsistema"] == subsistema]
    serie = pd.to_numeric(df.set_index("din_instante")["val_cmo"]).sort_index()
    dias = serie.index.normalize()
    faltando = pd.date_range(dias.min(), dias.max(), freq="D").difference(dias.unique())
    if len(faltando):
        print(f"aviso: CMO {subsistema} sem dado em {len(faltando)} dias inteiros "
              f"(ex.: {', '.join(d.strftime('%d/%m/%Y') for d in faltando[:3])})")
    return serie.reindex(pd.date_range(serie.index.min(), serie.index.max(), freq="30min"))


def carga(subsistema: str = "SE") -> pd.Series:
    """Carga de hora em hora, em MW médio."""
    df = _limpar_subsistema(ons.carregar("curva-carga", ANOS))
    df = df[df["id_subsistema"] == subsistema]
    return pd.to_numeric(df.set_index("din_instante")["val_cargaenergiahomwmed"])
