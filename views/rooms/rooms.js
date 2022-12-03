if (!window.sessionStorage.getItem("client")) window.location.replace("http://localhost:3000/")

const socket = io("http://localhost:3000/rooms");

socket.on("connect", () => {
    socket.username = JSON.parse(window.sessionStorage.getItem("client")).username;
    socket.emit("get-messages");
    socket.on("render-messages", logs => {
        logs.forEach(item => {
            addChat(`${item.sent_at.date}, ${item.sent_at.time.substring(0, 5)} | ${item.sender}`, item.message, "white");
        })
    })
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
        const temp = new Date();
        const date_time = {
            date: `${temp.getDate()}/${temp.getMonth()}/${temp.getFullYear()}`,
            time: temp.toTimeString().substring(0, 8)
        }
        socket.emit("send-message", socket.username, event.target.value, date_time);
        event.target.value = "";
    }
})