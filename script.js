function sendMessage() {
    // 1. Input box aur Chat box ko dhoondo
    const input = document.getElementById("user-msg");
    const chatBox = document.getElementById("chat-box");
    const messageText = input.value.trim(); // .trim() faltu space hatata hai

    // 2. Check karo ki message khali toh nahi hai
    if (messageText !== "") {
        
        // 3. Ek naya DIV (bubble) banayein
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "sent"); // Hamari CSS classes use karein

        // 4. Message ka content set karein
        messageDiv.innerHTML = `<strong>Me:</strong> ${messageText}`;

        // 5. Chat box mein naya message jod dein
        chatBox.appendChild(messageDiv);

        // 6. Input box ko khali karein aur scroll niche karein
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Keyboard ke "Enter" button se message bhejne ke liye
document.getElementById("user-msg").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});