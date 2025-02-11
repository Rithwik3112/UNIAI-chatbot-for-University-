from sentence_transformers import SentenceTransformer
import PyPDF2
from langchain_ollama import OllamaLLM
from langchain.prompts import ChatPromptTemplate

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"  # Append text from each page
    except Exception as e:
        print(f"An error occurred while reading the PDF: {e}")
    return text

pdf_path = r'R:\UniAI-main\model\DATA.pdf'
cleaned_text = extract_text_from_pdf(pdf_path)
content = cleaned_text
template = """
Answer the question according to the given context
context {context}
question : {question}
answer:
"""

model = OllamaLLM(model="llama3.2")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def handling_prompts():
    print("Welcome to UniAI")
    context = content  
    while True:
        user_input = input("you: ").lower()
        if user_input == "exit":
            break
        result = chain.invoke({"context": context, "question": user_input})
        print("AI:",result)  # Print the AI's response
        
handling_prompts()
