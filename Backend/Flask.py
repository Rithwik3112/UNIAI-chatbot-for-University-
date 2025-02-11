
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import PyPDF2
from langchain_ollama import OllamaLLM
from langchain.prompts import ChatPromptTemplate

app = Flask(__name__)
CORS(app)


def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"An error occurred while reading the PDF: {e}")
    return text

pdf_path = r'your PDF file path'
cleaned_text = extract_text_from_pdf(pdf_path)
model = OllamaLLM(model="llama3.2")
template = """
Answer the question according to the given context
context: {context}
question : {question}
answer:
"""
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

# Function to get response from model
def get_model_response(user_input, context):
    result = chain.invoke({"context": context, "question": user_input})
    return result, context

# Flask route to handle chat requests
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if 'message' in data:
        user_message = data['message']
        response, updated_context = get_model_response(user_message, cleaned_text)
        return jsonify({"response": response, "context": updated_context})
    else:
        return jsonify({"error": "Message not found in request"}), 400

if __name__ == '__main__':
    app.run(debug=True)
    
