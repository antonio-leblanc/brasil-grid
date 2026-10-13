"""Baixa datasets do portal de dados abertos do ONS (dados.ons.org.br).

Cada dataset é um "pacote" CKAN com um arquivo por ano. O Parquet de cada ano
vai pra data/ons/<dataset>/ na primeira vez e é lido do disco depois.
"""

import json
from pathlib import Path
from urllib.request import urlopen, urlretrieve

import pandas as pd

API = "https://dados.ons.org.br/api/3/action/package_show?id="
CACHE = Path(__file__).parent / "data" / "ons"


def urls_parquet(dataset: str) -> dict[int, str]:
    """Ano -> URL do Parquet daquele ano."""
    with urlopen(API + dataset) as resp:
        recursos = json.load(resp)["result"]["resources"]
    urls = {}
    for r in recursos:
        if r["format"].upper() == "PARQUET":
            ano = int(r["url"].rsplit("_", 1)[-1].removesuffix(".parquet"))
            urls[ano] = r["url"]
    return urls


def carregar(dataset: str, anos: range) -> pd.DataFrame:
    """Junta os anos pedidos num DataFrame só, baixando o que faltar."""
    pasta = CACHE / dataset
    pasta.mkdir(parents=True, exist_ok=True)
    urls = None
    partes = []
    for ano in anos:
        arquivo = pasta / f"{ano}.parquet"
        if not arquivo.exists():
            urls = urls or urls_parquet(dataset)
            print(f"baixando {dataset} {ano}")
            urlretrieve(urls[ano], arquivo)
        partes.append(pd.read_parquet(arquivo))
    return pd.concat(partes, ignore_index=True)
