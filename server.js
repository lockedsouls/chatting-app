const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: "*"});
const rooms_nsp = io.of("/rooms");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:parol@chatting-app.0mv6qst.mongodb.net/?retryWrites=true&w=majority", () => console.log("Connected to db"));
app.use(require("cors")());
app.use("/", require("./routes/loginRoute"));
app.use("/api", require("./routes/usersAPIRoute"));
app.use(express.static(`${__dirname}/views/rooms`));

rooms_nsp.on("connection", socket => {
    console.log(`${socket.id} has connected`);
})

app.route("/rooms")
    .get((req, res) => {
        res.sendFile(`${__dirname}/views/rooms/rooms.html`);
    })

server.listen(3000, () => {console.log("Server on")});