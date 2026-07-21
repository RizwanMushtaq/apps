from langchain_core.documents import Document
import pypdf
from langchain_text_splitters import CharacterTextSplitter


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
# print(docs[0].page_content)  # Print the content of the first page

# Create a CharacterTextSplitter with specific configuration:
# - chunk_size=200: Each chunk will contain approximately 200 characters
# - chunk_overlap=20: Consecutive chunks will overlap by 20 characters to maintain context
# - separator="\n": Text will be split at newline characters when possible
text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=20, separator="\n")

# Split the previously loaded document (PDF or other text) into chunks
# The split_documents method:
# 1. Takes a list of Document objects
# 2. Splits each document's content based on the configured parameters
# 3. Returns a new list of Document objects where each contains a chunk of text
# 4. Preserves the original metadata for each chunk
chunks = text_splitter.split_documents(docs)

# Print the total number of chunks created
# This shows how many smaller Document objects were generated from the original document(s)
# The number depends on the original document length and the chunk_size setting
print(f"Total chunks created: {len(chunks)}")
