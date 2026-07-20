from io import BytesIO

import requests
from pypdf import PdfReader

pdf_url = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/96-FDF8f7coh0ooim7NyEQ/langchain-paper.pdf"

response = requests.get(pdf_url)
response.raise_for_status()
pdf_bytes = response.content

reader = PdfReader(BytesIO(pdf_bytes))
pages = reader.pages

if len(pages) >= 2:
    print(pages[0].extract_text()[:100])
    print("_____________________________________________________________________")
    print(pages[1].extract_text()[:100])
else:
    print("The PDF does not contain enough pages.")
