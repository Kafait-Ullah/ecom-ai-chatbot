from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
import pandas as pd
import time
from threading import Timer
import logging
from google.api_core import exceptions as google_exceptions
from google.api_core.exceptions import RetryError

from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv

load_dotenv()

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# --- Loadings ---
try:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
        
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    index_path = os.path.join(os.path.dirname(__file__), '..', 'faiss_index')
    if not os.path.exists(index_path):
        raise FileNotFoundError(f"FAISS index not found at {index_path}. Please run load_data.py first.")
    vector_store = FAISS.load_local(index_path, embeddings, allow_dangerous_deserialization=True)
    
    orders_df = pd.read_csv(os.path.join(os.path.dirname(__file__), '..', 'data', 'orders.csv'), dtype={"order_id": str})
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", google_api_key=api_key)
except Exception as e:
    logger.critical(f"Failed to initialize the application: {e}", exc_info=True)
    exit()

# --- Tools ---

@tool
def knowledge_base_tool(query: str) -> str:
    """
    Searches the knowledge base for information about products and FAQs.
    Use this tool to answer questions about product details, recommendations, and common questions.
    """
    results = vector_store.similarity_search(query, k=3, filter={"source": "product"})
    return "\n".join([res.page_content for res in results]) if results else "No relevant information found."

@tool
def order_tracking_tool(query: str) -> str:
    """Tracks an order status using an order ID from the query."""
    match = re.search(r'\b\d{4,}\b', query)
    if match:
        order_id = match.group(0)
        order = orders_df[orders_df["order_id"] == order_id]
        if not order.empty:
            return f"The status of order {order_id} is: {order['status'].iloc[0]}"
        else:
            return f"I couldn't find an order with the ID {order_id}. Please double-check the number and try again."
    return "I can help with that! To track your order, please provide your order ID. You can typically find it in the confirmation email you received after placing your order."

tools = [knowledge_base_tool, order_tracking_tool]

# --- Agent and Session Management ---

agents = {}
SESSION_TIMEOUT = 1800

def cleanup_sessions():
    now = time.time()
    for session_id, (agent, last_access) in list(agents.items()):
        if now - last_access > SESSION_TIMEOUT:
            logger.info(f"Session {session_id} timed out. Cleaning up.")
            del agents[session_id]
    Timer(600, cleanup_sessions).start()

def get_or_create_agent(session_id):
    if session_id not in agents:
        logger.info(f"Creating new agent for session {session_id}")
        memory = MemorySaver()
        agent = create_react_agent(model=llm, tools=tools, checkpointer=memory)
        agents[session_id] = (agent, time.time())
    else:
        agents[session_id] = (agents[session_id][0], time.time())
    return agents[session_id][0]

# --- API Endpoint ---

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get("message")
    session_id = request.headers.get('X-Session-ID')

    if not session_id:
        return jsonify({"error": "Session ID is required"}), 400
    if not prompt:
        return jsonify({"error": "No message provided"}), 400

    agent = get_or_create_agent(session_id)
    user_message = {"role": "user", "content": prompt}
    config = {"configurable": {"thread_id": session_id}}

    try:
        response = None
        for event in agent.stream({"messages": [user_message]}, config, stream_mode="values"):
            response = event["messages"][-1].content
        if response is None:
            response = "Sorry, I couldn't generate a response."
            
    except google_exceptions.ResourceExhausted as e:
        logger.error(f"Quota exceeded for session {session_id}: {e}", exc_info=True)
        response = "I'm sorry, but I've hit my request limit for now. Please try again later."
    except RetryError as e:
        logger.error(f"Network timeout for session {session_id}: {e}", exc_info=True)
        response = "I'm having trouble connecting to the AI service. Please check your internet connection and try again."
    except Exception as e:
        logger.error(f"An unexpected error occurred for session {session_id}: {e}", exc_info=True)
        response = "Sorry, something went wrong on our end. We're looking into it."

    return jsonify({"response": response})

if __name__ == '__main__':
    Timer(600, cleanup_sessions).start()
    app.run(debug=True, port=5000)
