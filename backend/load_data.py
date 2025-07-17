import pandas as pd
from langchain_community.document_loaders import CSVLoader
from langchain_community.vectorstores import FAISS
from langchain_huggingface.embeddings.huggingface import HuggingFaceEmbeddings


# Load CSV data
loader = CSVLoader(file_path="../data/faqs.csv")
documents = loader.load()

# Create embeddings using sentence-transformers
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_store = FAISS.from_documents(documents, embeddings)

# Save vector store
vector_store.save_local("faiss_index")

# Test query
query = "What’s the return policy?"
results = vector_store.similarity_search(query)
print(results[0].page_content)
