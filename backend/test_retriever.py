from rag.retriever import get_retriever

retriever = get_retriever()

query = "Customer health score is below 40. What should we do?"

results = retriever.invoke(query)

print("\nRESULTS\n")

for i, doc in enumerate(results, start=1):
    print("=" * 60)
    print(f"Result {i}")
    print("=" * 60)
    print(doc.page_content)
    print()