const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: "*"});
const rooms_nsp = io.of("/rooms");
const mongoose = require("mongoose");
const Logs = require("./db/Logs");

mongoose.connect("mongodb+srv://admin:parol@chatting-app.0mv6qst.mongodb.net/?retryWrites=true&w=majority", () => console.log("Connected to db"));
app.use(require("cors")());
app.use("/", require("./routes/loginRoute"));
app.use("/api", require("./routes/usersAPIRoute"));
app.use(express.static(`${__dirname}/views/rooms`));

const sender_colors = [
    {color: "rgb(255, 226, 57)", occupied: null},
    {color: "rgb(0, 255, 84)", occupied: null},
    {color: "rgb(255, 0, 0)", occupied: null},
    {color: "rgb(255, 40, 40)", occupied: null},
    {color: "rgb(128, 216, 202)", occupied: null},
    {color: "rgb(113,90,165)", occupied: null}
];

rooms_nsp.on("connection", socket => {
    for (let i=0; i<sender_colors.length; i++){
        if (!sender_colors[i].occupied) {
            socket.emit("get-color", sender_colors[i].color);
            sender_colors[i].occupied = socket.id;
            break;
        }
    }
    socket.on("send-message", async (sender, message, date_time) => {
        let color = "";
        for (let i=0; i<sender_colors.length; i++){
            if (sender_colors[i].occupied == socket.id) {
                color = sender_colors[i].color;
                break;
            }
        }
        socket.broadcast.emit("receive-message", {sender: sender, message: message, color: color});
        try{
            await Logs.create({sender: sender, message: message, sent_at: date_time});
        }catch(error){
            console.log(error.message);
        }
    })
    socket.on("disconnect", () => {
        for (let i=0; i<sender_colors.length; i++){
            if (sender_colors[i].occupied == socket.id) {
                sender_colors[i].occupied = null;
                break;
            }
        }
    })
})

app.route("/rooms")
    .get((req, res) => {
        res.sendFile(`${__dirname}/views/rooms/rooms.html`);
    })

server.listen(3000, () => {console.log("Server on")});