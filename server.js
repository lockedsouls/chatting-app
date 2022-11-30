const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: "*"});

app.use("/", require("./routes/loginRoute"));


server.listen(3000, () => {console.log("Server on")});