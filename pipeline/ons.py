"""Baixa datasets do portal de dados abertos do ONS (dados.ons.org.br).

Cada dataset é um "pacote" CKAN com um arquivo por ano. O Parquet de cada ano
vai pra data/ons/<dataset>/ na primeira vez e é lido do disco depois. Um ano
cujo arquivo foi baixado antes de o ano acabar (o corrente, ou o anterior
baixado em dezembro) é baixado de novo quando tem mais de MAX_IDADE. Se a API
ou a rede falhar, segue com o cache que já existe.
"""

import json
import time
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen, urlretrieve

import pandas as pd

API = "https://dados.ons.org.br/api/3/action/package_show?id="
CACHE = Path(__file__).parent / "data" / "ons"
MAX_IDADE = 12 * 3600  # segundos


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


def _desatualizado(arquivo: Path, ano: int) -> bool:
    if not arquivo.exists():
        return True
    baixado = datetime.fromtimestamp(arquivo.stat().st_mtime)
    incompleto = baixado.year <= ano  # baixado antes de o ano terminar
    return incompleto and (datetime.now() - baixado).total_seconds() > MAX_IDADE


def carregar(dataset: str, anos: range) -> pd.DataFrame:
    """Junta os anos pedidos num DataFrame só, baixando o que faltar.

    Ano que o ONS ainda não publicou (ex.: o ano novo em janeiro) é pulado com aviso.
    """
    pasta = CACHE / dataset
    pasta.mkdir(parents=True, exist_ok=True)
    urls = None
    partes = []
    for ano in anos:
        arquivo = pasta / f"{ano}.parquet"
        if _desatualizado(arquivo, ano):
            try:
                urls = urls if urls is not None else urls_parquet(dataset)
                if ano in urls:
                    print(f"baixando {dataset} {ano}")
                    parcial = arquivo.with_suffix(".tmp")
                    try:
                        urlretrieve(urls[ano], parcial)
                        parcial.replace(arquivo)  # só substitui o cache se o download terminou
                    finally:
                        parcial.unlink(missing_ok=True)
            except OSError as erro:
                urls = {}
                print(f"aviso: sem acesso ao ONS ({erro}), usando o cache de {dataset}")
        if not arquivo.exists():
            print(f"aviso: {dataset} {ano} ainda não publicado pelo ONS, pulando")
            continue
        partes.append(pd.read_parquet(arquivo))
    return pd.concat(partes, ignore_index=True)
