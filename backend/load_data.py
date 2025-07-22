import pandas as pd
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.docstore.document import Document
import os

def create_knowledge_base():
    """
    Loads data from CSV files and creates a unified FAISS vector store.
    """
    # --- Load Data ---
    try:
        faqs_df = pd.read_csv(os.path.join(os.path.dirname(__file__), '..', 'data', 'faqs.csv'))
        products_df = pd.read_csv(os.path.join(os.path.dirname(__file__), '..', 'data', 'products.csv'))
        # We don't need to load orders into the vector store as they are looked up directly.
    except FileNotFoundError as e:
        print(f"Error loading data: {e}. Make sure the data files are in the 'data' directory.")
        return

    # --- Create Documents ---
    documents = []

    # Create documents for FAQs
    for _, row in faqs_df.iterrows():
        doc_content = f"Question: {row['question']}\nAnswer: {row['answer']}"
        documents.append(Document(page_content=doc_content, metadata={"source": "faq"}))

    # Create documents for products
    for _, row in products_df.iterrows():
        doc_content = f"Product: {row['name']}, Category: {row['category']}, Description: {row['description']}"
        documents.append(Document(page_content=doc_content, metadata={"source": "product"}))

    # --- Create Embeddings and Vector Store ---
    try:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        vector_store = FAISS.from_documents(documents, embeddings)
        
        # --- Save Vector Store ---
        index_path = os.path.join(os.path.dirname(__file__), '..', 'faiss_index')
        vector_store.save_local(index_path)
        print(f"Knowledge base created and saved to '{index_path}'")

    except Exception as e:
        print(f"An error occurred during vector store creation: {e}")

if __name__ == "__main__":
    create_knowledge_base()
