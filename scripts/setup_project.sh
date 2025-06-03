#!/bin/bash

# Create directories
mkdir -p backend frontend/pages/api frontend/public frontend/styles data .github/workflows scripts

# Create backend files
touch backend/app.py backend/chatbot.py backend/load_data.py backend/test_chatbot.py backend/requirements.txt backend/Dockerfile

# Create frontend files
touch frontend/pages/index.js frontend/pages/api/chat.js frontend/package.json

# Create data files
touch data/products.csv data/faqs.csv data/orders.csv

# Create GitHub Actions and root files
touch .github/workflows/ci.yml
touch README.md PLAN.md REFLECTION.md .gitignore

# Initialize .gitignore with common ignores
echo "node_modules/
backend_env/
__pycache__/
*.pyc
.env
faiss_index/" > .gitignore

# Initialize requirements.txt with basic dependencies
echo "langchain
openai
faiss-cpu
fastapi
uvicorn
pandas
pytest" > backend/requirements.txt

# Initialize package.json for frontend
echo '{
  "name": "ecom-ai-chatbot",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "^2.2.19"
  }
}' > frontend/package.json

# Initialize README.md with basic content
echo "# EcomAI Chatbot\n\nA full-stack e-commerce chatbot built with Next.js, LangChain, and FAISS." > README.md

echo "Folder structure created successfully!"