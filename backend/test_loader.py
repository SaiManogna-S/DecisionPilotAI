from rag.loader import load_documents

docs = load_documents()

for doc in docs:
    print("=" * 50)
    print(doc["filename"])
    print("=" * 50)
    print(doc["content"])