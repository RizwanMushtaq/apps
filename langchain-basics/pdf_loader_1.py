from langchain_core.documents import Document
import pypdf


def load_pdf(file_path: str) -> list[Document]:
    documents = []
    with open(file_path, "rb") as f:
        reader = pypdf.PdfReader(f)
        for page_num, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            # Map directly to the standard LangChain Core document structure
            doc = Document(
                page_content=text, metadata={"source": file_path, "page": page_num + 1}
            )
            documents.append(doc)
    return documents


# Usage
docs = load_pdf("sample.pdf")
print(f"Loaded {len(docs)} pages from the PDF.")
print(docs[0].page_content)  # Print the content of the first page
