const socket = io("http://localhost:3000/rooms");
const CLIENT = JSON.parse(window.sessionStorage.getItem("client")).username;
const colors = [
    {color: "rgb(255, 226, 57)", user: null},
    {color: "rgb(0, 255, 84)", user: null},
    {color: "rgb(255, 0, 0)", user: null},
    {color: "rgb(255, 40, 40)", user: null},
    {color: "rgb(128, 216, 202)", user: null},
    {color: "rgb(113,90,165)", user: null}
];

socket.on("connect", () => {
  colors.forEach(item => {
    if (!item.user) {
        item.user = CLIENT;
        CLIENT.color = item.color;
    }
  })  
});

socket.on("receive-message", message => addChat(message)); 

function addChat(message){
    const chat_container = document.createElement("div"); chat_container.classList.add("chat-message");
    const chat_sender = document.createElement("span"); chat_sender.classList.add("sender"); chat_sender.style.color = toString(CLIENT.color);chat_sender.innerHTML = `${CLIENT}: `
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