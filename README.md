# EcomAI Chatbot

A full-stack e-commerce chatbot with FAQ, product recommendations, and order tracking.

## Features

- FAQ support using vector store retrieval.
- Product recommendations based on user queries.
- Order tracking using CSV data.

## Tech Stack

- Frontend: Next.js
- Backend: Python, LangChain, OpenAI/Hugging Face, FastAPI
- Data: CSV files, FAISS vector store

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd ecom-ai-chatbot
    ```

2.  **Backend Setup (Python):**
    ```bash
    cd backend
    python -m venv backend_env
    source backend_env/bin/activate  # On Linux/macOS
    # backend_env\Scripts\activate  # On Windows
    pip install -r requirements.txt
    ```
    *   Ensure you have Python 3.9 or higher.
    *   Create a virtual environment to manage dependencies.
    *   Install the required packages from `requirements.txt`.

3.  **Frontend Setup (Next.js):**
    ```bash
    cd ../frontend
    npm install
    ```
    *   Ensure you have Node.js and npm installed.
    *   Install the frontend dependencies.

4.  **Configuration:**

    *   Obtain an OpenAI API key or use a free Hugging Face API.
    *   Set the API key as an environment variable.

5.  **Running the Application:**

    *   **Backend:**
        ```bash
        cd ../backend
        uvicorn app:app --reload
        ```
        This starts the FastAPI backend server. The `--reload` flag enables automatic reloading upon code changes.

    *   **Frontend:**
        ```bash
        cd ../frontend
        npm run dev
        ```
        This starts the Next.js development server.

6.  **Access:**

    *   The frontend will be running on `http://localhost:3000` (or a similar port).
    *   The backend API will be running on `http://localhost:8000`.

## Usage

Visit the deployed app and interact with the chatbot. Example queries:

- "What's the shipping time?"
- "Recommend laptops under $1000."
- "Track order #123."
