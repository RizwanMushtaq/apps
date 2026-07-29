import glob
import os

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
