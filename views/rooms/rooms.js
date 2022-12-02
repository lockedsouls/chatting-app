const socket = io("http://localhost:3000/rooms");

socket.on("connect", () => {
    
});

socket.on("receive-message", message => addChat(message));


function addChat(message){
    const chat_container = document.createElement("div"); chat_container.classList.add("chat-message");
    const chat_sender = document.createElement("span"); chat_sender.classList.add("sender"); chat_sender.innerHTML = `Placeholder: `
    const chat_message = document.createElement("span"); chat_message.innerHTML = message
    chat_container.appendChild(chat_sender);
    chat_container.appendChild(chat_message);
    document.querySelector("#chats").appendChild(chat_container);
}

document.querySelector("#chat-input").addEventListener("keyup", event => {
    if (event.key == "Enter" && event.target.value != ""){
        addChat(event.target.value);
        socket.emit("send-message", event.target.value);
        event.target.value = "";
    }
})