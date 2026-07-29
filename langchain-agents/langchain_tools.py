import glob
import os

import pandas as pd
from langchain.tools import tool


@tool
def list_csv_files() -> list[str] | None:
    """List all CSV file names in the local directory.

    Returns:
        A list containing CSV file names.
        If no CSV files are found, returns None.
    """
    csv_files = glob.glob(os.path.join(os.getcwd(), "*.csv"))
    if not csv_files:
        return None
    return [os.path.basename(file) for file in csv_files]


print("Tool Name:", list_csv_files.name)
print("Tool Description:", list_csv_files.description)
print("Tool Arguments:", list_csv_files.args)

DATAFRAME_CACHE = {}


@tool
def preload_datasets(paths: list[str]) -> str:
    """
    Loads CSV files into a global cache if not already loaded.

    This function helps to efficiently manage datasets by loading them once
    and storing them in memory for future use. Without caching, you would
    waste tokens describing dataset contents repeatedly in agent responses.

    Args:
        paths: A list of file paths to CSV files.

    Returns:
        A message summarizing which datasets were loaded or already cached.
    """
    loaded = []
    cached = []
    for path in paths:
        if path not in DATAFRAME_CACHE:
            DATAFRAME_CACHE[path] = pd.read_csv(path)
            loaded.append(path)
        else:
            cached.append(path)

    return f"Loaded datasets: {loaded}\nAlready cached: {cached}"


print("Tool Name:", preload_datasets.name)
print("Tool Description:", preload_datasets.description)
print("Tool Arguments:", preload_datasets.args)
