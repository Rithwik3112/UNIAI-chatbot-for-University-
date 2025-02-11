const typingForm = document.querySelector(".typing-form"); // form where user types message
const chatList = document.querySelector(".chat-list"); // list of chat messages

let userMessage = null; // user message
let isResponseGenerating = false; 

// Updated to use your Flask backend instead of Gemini
const API_URL = "http://127.0.0.1:5000/chat";  // Flask server endpoint

// Message creation function
const createMessageElement = (content,...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// Text effect for typing animation
const showTypingEffect = (text, textElement) => {
    const words = text.split(' '); // split string into words
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];

        if(currentWordIndex === words.length) {
            clearInterval(typingInterval);
            isResponseGenerating = false;
        }
        chatList.scrollTo(0, chatList.scrollHeight); // scroll to bottom
    }, 5);
}

// API response generation
const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector('.text'); // get text element
    try {
        // Sending request to Flask backend
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userMessage // send user message to backend
            })
        });

        // Parsing the response from Flask
        const data = await response.json();

        if (data.error) {
            console.error("Error:", data.error);
            return;
        }

        const apiResponse = data.response; // getting the response from the API
        showTypingEffect(apiResponse, textElement); // show response with typing effect
    } catch (error) {
        console.error('Error in API call:', error);
    } finally {
        incomingMessageDiv.classList.remove("loading"); // Remove loading state
    }
}

// Show loading animation while waiting for the response
const showLoadingAnimation = () => {
    const html = `  
        <div class="message-content">
            <img src="/UniAI code/assets/uai logo.png" alt="user" class="avatar">
            <p class="text"></p>
            <div class="loading-indicator">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>
    `;
    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);
    chatList.scrollTo(0, chatList.scrollHeight); // scroll to bottom
    generateAPIResponse(incomingMessageDiv); // generate response from API
}

// Handle user input and outgoing messages
const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim(); // get the input message
    if (!userMessage || isResponseGenerating) return; // exit if empty or generating response

    isResponseGenerating = true;
    const html = `  
        <div class="message-content">
            <img src="/assets/33d434fc-cc16-4e9f-8618-5ea8dd182ccb.png" alt="user" class="avatar">
            <p class="text"></p>
        </div>`;
    
    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage; // set user message
    chatList.appendChild(outgoingMessageDiv);
    typingForm.reset(); // reset the input field
    chatList.scrollTo(0, chatList.scrollHeight); // scroll to bottom
    document.body.classList.add("hide-header"); // hide header
    setTimeout(showLoadingAnimation, 500); // show loading animation after a slight delay
}

// Prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent form submission
    handleOutgoingChat();
});
