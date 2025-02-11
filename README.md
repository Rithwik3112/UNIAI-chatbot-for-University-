# UNIAI-chatbot-for-University-
UniAI is an intelligent chatbot built using Flask, LangChain, and Llama 3.2. It extracts data from a PDF file and responds to user queries based on the provided context. The project includes both backend and frontend components for seamless interaction.
## 🚀 Features
Extracts text from PDF documents
Uses Llama 3.2 for generating responses
Simple REST API with Flask
Cross-Origin Resource Sharing (CORS) enabled for frontend integration
Responsive frontend interface for easy user interaction
## 📦Installation
Clone the Repository:
git clone https://github.com/your-username/uniai-chatbot.git
cd uniai-chatbot
Create a Virtual Environment (Optional but Recommended):
python -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate     # For Windows
Install Dependencies:
pip install -r requirements.txt
Ensure the PDF file is location
Run the Flask App:
python app.py
The server will start at http://127.0.0.1:5000/.
Run the Frontend:
Navigate to the frontend directory (if applicable) and start the frontend server:
cd frontend
npm install
npm start
The frontend will be available at http://localhost:3000/.
## 🌐 Frontend Features
User-friendly chat interface
Real-time interaction with the backend
Displays both chatbot responses and context when needed
## 📄 Technologies Used
Flask: Web framework for building the REST API
LangChain: For managing prompts and interactions
Llama 3.2: AI language model for generating responses
Sentence Transformers: (For future embedding support)
PyPDF2: To extract text from PDFs
React (or relevant framework): For frontend development
JavaScript/HTML/CSS: For frontend UI
