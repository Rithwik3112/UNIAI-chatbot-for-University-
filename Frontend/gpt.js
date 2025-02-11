const typingForm = document.querySelector(".typing-form"); // form where user types message
const chatList = document.querySelector(".chat-list"); // list of chat messages


let userMessage = null; // user message
let isResponseGenerating = false; 


// Gemini 1.5 API
const API_KEY = "AIzaSyC5SLt1GI3XyZlM3lEq8msdGTuQbwIFPZo";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Message creation function
const createMessageElement = (content,...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
} // to display the user message and response in the chat.

// text effect
const showTypingEffect = (text, textElement) => {
    const words = text.split(' '); // splits the string into an individual words of array
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        // Append each word to the text element with a space
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];

        // If all words are displayed
        if(currentWordIndex === words.length) {
            clearInterval(typingInterval);
            isResponseGenerating = false;
            
        }
        chatList.scrollTo(0, chatList.scrollHeight); // scroll to bottom
    }, 5);
}
// API response generation

// Declaring a function generateAPIResponse
const generateAPIResponse = async (incomingMessageDiv) => {
    // selecting the text element to display the response
    const textElement = incomingMessageDiv.querySelector('.text'); 
    // Making API call
    try{
        const response = await fetch(API_URL, { //  http request to api
            method: "POST", // data is sending to the server.
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });
        // parsing from JSON format
        const data = await response.json();

        // Extracting the API response
        const apiResponse = data?.candidates[0].content.parts[0].text;
        // displaying the response with typing effect
        showTypingEffect(apiResponse, textElement);
        // error handling
    } catch(error){
        isResponseGenerating
        console.log(error)
        // cleaning up using finally
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
}

// showing a loading animation while waiting for API response
// declaring a function
const showLoadingAnimation = () => {
    // defininf the html element
    const html = `  <div class="message-content">
                            <img src="/assets/uai logo.png" alt="user" class="avatar">
                            <p class="text"></p>
                        <div class="loading-indicator">
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                        </div>
                    </div>
                    `;
    // creating the new message element
    const incomingMessageDiv = createMessageElement(html, "incoming", "loading"); // createMessageElement function is called.
    // appending the element to chat list
    chatList.appendChild(incomingMessageDiv); // append child makes the loading visible in the chat.
    chatList.scrollTo(0, chatList.scrollHeight); // scroll to bottom
    // Generating the API response
    generateAPIResponse(incomingMessageDiv); // generateAPIResponse function called and replaces the loading animation with message recieved.
}


// Handle the user messages
// declaring a function
const handleOutgoingChat = () => {
    // getting user input 
    userMessage = typingForm.querySelector(".typing-input").value.trim(); // trim() to remove the empty spaces in the message.
    // validation check
    if(!userMessage || isResponseGenerating) return; //exit if no user message
    isResponseGenerating = true; // to prevent overlapping of requests
    //  defining the HTML elemnet
    const html = `  <div class="message-content">
                        <img src="/assets/33d434fc-cc16-4e9f-8618-5ea8dd182ccb.png" alt="user" class="avatar">
                        <p class="text"></p>
                    </div>`;
    // creating a new outgoing message element
    const outgoingMessageDiv = createMessageElement(html, "outgoing");    
    outgoingMessageDiv.querySelector(".text").innerText = userMessage
    chatList.appendChild(outgoingMessageDiv); // displays the user message in the chat.

    typingForm.reset(); // clear input field
    chatList.scrollTo(0, chatList.scrollHeight); // scroll to bottom
    document.body.classList.add("hide-header"); // hide header
    setTimeout(showLoadingAnimation, 500); // show loading animation after a delay
}

// prevent defulat sumbimission and handle outgoing chat
typingForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    handleOutgoingChat();
});