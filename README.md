# 🤖 EcomAI Chatbot: Your Intelligent E-commerce Assistant

Welcome to the future of e-commerce! The EcomAI Chatbot is a smart, conversational AI assistant designed to elevate the customer experience on your online store. It's more than just a chatbot; it's a tireless team member that can answer questions, recommend products, and track orders, 24/7.

This project is built with a modern, developer-friendly tech stack and is ready to be customized and deployed to your own e-commerce platform.

## 🤔 Why EcomAI Chatbot?

In today's competitive e-commerce landscape, providing a seamless and personalized customer experience is key. The EcomAI Chatbot helps you achieve this by:

-   **Boosting Sales:** By providing instant product recommendations and answering customer questions, the chatbot can help guide customers through the sales funnel.
-   **Reducing Support Costs:** The chatbot can handle a wide range of customer queries, freeing up your human agents to focus on more complex issues.
-   **Increasing Customer Satisfaction:** With instant, 24/7 support, your customers will feel valued and supported, leading to increased loyalty and retention.

## 🚀 Tech Stack

The EcomAI Chatbot is built with a powerful and modern tech stack:

### Frontend
- **React:** A popular JavaScript library for building user interfaces.
- **Vite:** A fast and lightweight build tool for a great development experience.
- **TypeScript:** A superset of JavaScript that adds static typing for more robust code.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

### Backend
- **Python:** A versatile and powerful language for backend development.
- **Flask:** A lightweight and flexible web framework for Python.

### AI & Data
- **LangChain & LangGraph:** A framework for developing applications powered by language models.
- **Google AI (Gemini Pro):** A powerful language model for natural language understanding and generation.
- **Hugging Face:** A platform for state-of-the-art machine learning models.
- **FAISS:** A library for efficient similarity search and clustering of dense vectors.

## 🚀 Getting Started

Ready to bring your e-commerce store to life? Here's how to get the EcomAI Chatbot up and running.

### 1. Clone the Repository

```bash
git clone https://github.com/Kafait-Ullah/ecom-ai-chatbot.git
cd ecom-ai-chatbot
```

### 2. Set Up the Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv backend_env
# On Windows: backend_env\Scripts\activate
# On macOS/Linux: source backend_env/bin/activate

# Install the required Python packages
pip install -r requirements.txt
```

### 3. Set Up the Frontend

```bash
cd ../frontend

# Install the required npm packages
npm install
```

### 4. Configure Your Environment

You'll need a Google AI API key to power the chatbot.

1.  Create a file named `.env` in the root directory of the project.
2.  Add your API key to the `.env` file:

    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

### 5. Build the Knowledge Base

This is where the magic happens! Run the following command to build the chatbot's knowledge base from your data.

```bash
cd backend
python load_data.py
```

This will create a `faiss_index` directory in the root of the project.

### 6. Run the Application

You're all set! Now, let's get the chatbot running.

-   **Start the Backend Server:**

    ```bash
    cd backend
    flask run
    ```

-   **Start the Frontend Server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

    Your chatbot is now live and ready to chat!

## 🔮 What's Next?

The EcomAI Chatbot is a powerful tool, but there's always room for improvement. Here are some ideas for future enhancements:

-   **Admin Dashboard:** A dashboard for managing the chatbot's knowledge base and viewing conversation logs.
-   **More Integrations:** Connect the chatbot to more e-commerce platforms and messaging channels.
-   **Proactive Messaging:** Allow the chatbot to proactively engage with customers based on their browsing behavior.

## 🤝 Contributing

This is an open-source project, and we welcome contributions from the community! If you have an idea for a new feature or have found a bug, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
