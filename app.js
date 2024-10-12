const express = require('express');
const app = express();
const http = require("http");
const path = require('path');
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        // Emit only socket.id instead of spreading the socket object
        io.emit("receive-location", { id: socket.id, ...data });
    });
    
    
socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id);
});
});

const port = 3000;
server.listen(port);
app.get("/", (req, res) => {
    res.render("index");
});
