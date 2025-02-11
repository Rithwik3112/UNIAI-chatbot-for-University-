# UniAI Chatbot

UniAI is an intelligent chatbot built using **Flask**, **LangChain**, and **Llama 3.2**. It extracts data from a PDF file and responds to user queries based on the provided context. The project includes both backend and frontend components for seamless interaction.

---

## 🚀 Features

- Extracts text from PDF documents
- Uses Llama 3.2 for generating responses
- Simple REST API with Flask
- Cross-Origin Resource Sharing (CORS) enabled for frontend integration
- Responsive frontend interface for easy user interaction

---

## 📦 Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/uniai-chatbot.git
   cd uniai-chatbot
   ```

2. **Create a Virtual Environment (Optional but Recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate     # For Windows
   ```

3. **Install Dependencies:**

   ```bash
     pip install -r requirements.txt
   ```


4. **Run the Flask App:**

   ```bash
   python app.py
   ```

   The server will start at `http://127.0.0.1:5000/`.

5. **Run the Frontend:**

   Navigate to the frontend directory (if applicable) and start the frontend server:

   ```bash
   cd frontend
   npm install
   npm start
   ```

   The frontend will be available at `http://localhost:3000/`.

---

## 🔗 API Endpoints

### **POST /chat**

- **Description:** Sends a message to the chatbot and receives a response.
- **Request:**
  ```json
  {
    "message": "Your question here"
  }
  ```
- **Response:**
  ```json
  {
    "response": "Generated answer from the model",
    "context": "Relevant context from the PDF"
  }
  ```

---

## 🌐 Frontend Features

- User-friendly chat interface
- Real-time interaction with the backend
- Displays both chatbot responses and context when needed

---

## 📄 Technologies Used

- **Flask:** Web framework for building the REST API
- **LangChain:** For managing prompts and interactions
- **Llama 3.2:** AI language model for generating responses
- **Sentence Transformers:** (For future embedding support)
- **PyPDF2:** To extract text from PDFs
- **React (or relevant framework):** For frontend development
- **JavaScript/HTML/CSS:** For frontend UI

---

## ⚖️ License

This project is licensed under the **MIT License**.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)

---

## 📧 Contact

For any queries, feel free to reach out:

- **Author:** Rithwik Reddy M
- **Email:** [your-email@example.com](mailto\:your-email@example.com)
- **GitHub:** [https://github.com/your-username](https://github.com/your-username)

Happy coding! 🚀

