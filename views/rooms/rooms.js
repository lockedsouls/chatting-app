const socket = io("http://localhost:3000/rooms");

socket.on("connect", () => {
    console.log("sjak");
})