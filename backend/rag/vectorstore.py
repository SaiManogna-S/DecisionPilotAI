from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS

from config.gemini_config import GEMINI_API_KEY

KNOWLEDGE_PATH = "knowledge_base"


def create_vector_store():

    loader = PyPDFDirectoryLoader(KNOWLEDGE_PATH)

    documents = loader.load()

    print(f"Loaded {len(documents)} pages")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_documents(documents)

    print(f"Created {len(chunks)} chunks")

    embeddings = GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-001",
        google_api_key=GEMINI_API_KEY
    )

    vectorstore = FAISS.from_documents(
        chunks,
        embeddings
    )

    vectorstore.save_local("faiss_index")

    print("Vector Store Saved!")

    return vectorstore