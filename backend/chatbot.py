from langchain.agents import initialize_agent, Tool
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.embeddings import HuggingFaceEmbeddings
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print("GEMINI_API_KEY:", api_key)  # Debug to confirm key is loaded

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load vector store
vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# FAQ Tool
def faq_tool(query: str) -> str:
    results = vector_store.similarity_search(query)
    return results[0].page_content if results else "Sorry, I don’t know."

# Recommendation Tool
def recommendation_tool(query: str) -> str:
    df = pd.read_csv("data/products.csv")
    category = query.split(" ")[-1]
    matches = df[df["category"].str.contains(category, case=False)]
    return ", ".join(matches["name"].tolist()) if not matches.empty else "No recommendations."

# Order Tracking Tool
def order_tracking_tool(order_id: str) -> str:
    df = pd.read_csv("data/orders.csv", dtype={"order_id": str})
    order = df[df["order_id"] == order_id]
    return order["status"].iloc[0] if not order.empty else "Order not found."

tools = [
    Tool(name="FAQ", func=faq_tool, description="Answer common questions"),
    Tool(name="Recommend", func=recommendation_tool, description="Recommend products"),
    Tool(name="TrackOrder", func=order_tracking_tool, description="Track order status")
]

# Initialize the ChatGoogleGenerativeAI model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=api_key
)

# Initialize the agent
agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

# Command line interface
while True:
    prompt = input("Enter your question (or type 'exit' to quit): ")
    if prompt.lower() == "exit":
        break
    try:
        order_id = int(prompt)
        # If the input is a number, assume it's an order ID
        tool_input = str(order_id)
        response = order_tracking_tool(tool_input)
        print(response)
    except ValueError:
        # If the input is not a number, assume it's a question
        response = agent.run(prompt)
        print(response)
