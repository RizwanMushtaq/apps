import wget

import os

from langchain_text_splitters import CharacterTextSplitter
from langchain_core.documents import Document
import chromadb
import hashlib


def get_chunk_id(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()


chroma_client = chromadb.PersistentClient(path="./chroma_db")

filename = "companyPolicies.txt"
url = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/6JDbUb_L3egv_eOkouY71A.txt"


collection = chroma_client.get_or_create_collection(name="my_collection")
existing_docs = collection.get(where={"source": filename}, include=["metadatas"])

exact_source_matches = []
for metadata_list in existing_docs["metadatas"]:
    for metadata in metadata_list:
        if metadata.get("source") == filename:
            exact_source_matches.append(metadata)

if exact_source_matches:
    print(f"Document already exists in the collection for source: {filename}")
    print("Skipping download and processing.")
    process_document = False
else:
    process_document = True

if process_document:
    if os.path.exists(filename):
        print(f"File already exists: {filename}")
    else:
        wget.download(url, out=filename)
        print("\nfile downloaded")
        print(f"File saved as: {filename}")

    documents = []
    with open(filename, "r") as file:
        contents = file.read()
        documents.append(Document(page_content=contents, metadata={"source": filename}))

    print(f"Loaded {len(documents)} documents from the file.")
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    ids = [get_chunk_id(text.page_content) for text in texts]
    # print(f"ids: {ids}")

    collection.upsert(
        ids=ids,
        documents=[text.page_content for text in texts],
        metadatas=[text.metadata for text in texts],
    )


results = collection.query(
    query_texts=["what is your Recruitment Policy?"],
    n_results=3,
)
# print(results)

context = "\n\n".join([doc for doc in results["documents"][0]])
print(f"Context: {context}")
