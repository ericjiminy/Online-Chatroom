// import modules
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

// express handles server
const app = express();

// allow access to client files
const clientPath = `${__dirname}/../client`;    // path to "client" folder
app.use(express.static(clientPath));
console.log(`Serving static from ${clientPath}`);

// create server and io
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = socketio(server);

// use io for client-server communication
io.on("connection", (sock) => {
    console.log("Someone has connected!");  // new connection --> welcome
    sock.emit("message",  "You are connected!")

    sock.on("message", (text) => {  // new message --> send to every client
        sock.broadcast.emit("message", sock.id.substring(0, 3) + ": " + text);
        sock.emit('message', "You: " + text);
    });
});

// start server
server.on("error", (error) => {
    console.error("Server error: " + error);
});
server.listen(port, () => {
    console.log("Chat started on 8080");
});