//socketio
const socket = io("http://localhost:3000/rooms");

socket.on("connect", () => {
    console.log(socket.id);
});

//room.js
//functions
function addChat(){
    const chat = document.createElement("div"); chat.classList.add("chat-message");
    const chat_sender = document.createElement("span");
    chat_sender.classList.add("sender"); chat_sender.classList.add("local");
    chat_sender.innerHTML = "ichavamp: ";

    const chat_message = document.createElement("span");
    chat_message.classList.add("message");
    chat_message.innerHTML = "djskalwjdwlkadjalkwdj";
    
    chat.appendChild(chat_sender); chat.appendChild(chat_message);
    document.querySelector("#chat").appendChild(chat);
    return chat;
}


document.querySelector("#chat-box").addEventListener("keyup", event => {
    if (event.key == "Enter"){
        console.log(addChat(2));        
    }
})