from langchain_core.documents import Document
import pymupdf  # Also known as fitz


def load_pdf_fast(file_path: str) -> list[Document]:
    documents = []
    doc_parsed = pymupdf.open(file_path)
    for page_num, page in enumerate(doc_parsed):
        text = page.get_text()
        doc = Document(
            page_content=text, metadata={"source": file_path, "page": page_num + 1}
        )
        documents.append(doc)
    return documents


docs = load_pdf_fast("sample.pdf")
print(f"Loaded {len(docs)} pages from the PDF.")
print(f"First page content: {docs[0].page_content}")
