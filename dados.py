"""Séries limpas a partir dos datasets do ONS, prontas pra plotar.

Até 2022 o ONS publicou os números como texto; de 2023 em diante, como float.
Por isso toda coluna numérica passa por pd.to_numeric aqui.
"""

from datetime import date

import pandas as pd

import ons

ANOS = range(2020, date.today().year + 1)


def ear() -> pd.DataFrame:
    df = ons.carregar("ear-diario-por-subsistema", ANOS)
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
    """CMO de meia em meia hora, em R$/MWh."""
    df = ons.carregar("cmo-semi-horario", ANOS)
    df = df[df["id_subsistema"] == subsistema]
    return pd.to_numeric(df.set_index("din_instante")["val_cmo"])


def carga(subsistema: str = "SE") -> pd.Series:
    """Carga de hora em hora, em MW médio."""
    df = ons.carregar("curva-carga", ANOS)
    df = df[df["id_subsistema"] == subsistema]
    return pd.to_numeric(df.set_index("din_instante")["val_cargaenergiahomwmed"])
