// scroll to bottom
function scrollBottom() {
    const messages = document.querySelector("#messages");
    messages.lastElementChild.scrollIntoView();
}

// write new message to chat
function writeMessage(text) {
    if (text == "") return;
    const messages = document.querySelector("#messages");
    const newMessage = document.createElement("li");
    newMessage.textContent = text;
    messages.append(newMessage);
    scrollBottom();
}

// send message to server
function formSubmitted(e) {
    e.preventDefault(); // prevent auto-refresh

    const input = document.querySelector("#input");
    const text = input.value;
    input.value = "";
    sock.emit("message", text);
}
document.querySelector("#send").addEventListener("click", formSubmitted);

// sock lets client and server communicate
const sock = io();
sock.on("message", writeMessage); // write messages from server