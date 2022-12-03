if (!window.sessionStorage.getItem("client")) window.location.replace("http://localhost:3000/")

const socket = io("http://localhost:3000/rooms");

socket.on("connect", () => {
    console.log("huh")
    socket.username = JSON.parse(window.sessionStorage.getItem("client")).username;
});

socket.on("receive-message", ({sender, message, color}) => addChat(sender, message, color)); 

socket.on("get-color", color => {
    socket.color = color;
})

function addChat(sender, message, color){
    const chat_container = document.createElement("div"); chat_container.classList.add("chat-message");
    const chat_sender = document.createElement("span"); chat_sender.classList.add("sender"); chat_sender.style = `color: ${color}`;chat_sender.innerHTML = `${sender}: `;
    const chat_message = document.createElement("span"); chat_message.innerHTML = message;
    chat_container.appendChild(chat_sender);
    chat_container.appendChild(chat_message);
    document.querySelector("#chats").appendChild(chat_container);
}

document.querySelector("#chat-input").addEventListener("keyup", event => {
    if (event.key == "Enter" && event.target.value != ""){
        addChat(socket.username, event.target.value, socket.color);
        socket.emit("send-message", socket.username, event.target.value);
        event.target.value = "";
    }
})