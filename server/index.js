const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());    // Prevent server from getting connection error due to cross-origin request

const server = http.createServer(app);

const io = new Server(server, {
    cors: {    // For security checking: define what is allowed
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    /*
      Summary: 
      1. socket.broadcase.emit(): Send the data to all clients except the initiator, i.e. sender
      2. socket.emit(): Send the data to the initiator, i.e. sender
      3. io.emit(): Send the data to all clients
      4. socket.join() puts that socket into a room with an ID (opposite: socket.leave())
      io always refers to all clients while socket always refers to 1 clients who is the initiator, i.e. sender
      Notes: 
      - socket.to().emit() is related to io.in().emit()
    */
    console.log(`User connected: ${socket.id}`);

    // For single connection
    socket.on("send_message", (data) => {
        console.log(`data in server: ${data["value"]}`)    // data["message"] is the same as data.message

        // socket.broadcast.emit("receiveMessage", data);    // Send to all clients except sender
        // socket.emit("receiveMessage", data);    // Send to sender only
        io.emit("receive_message", data);    // Send to all clients
        
    });

    // For room connection
    socket.on("join_room", (roomID) => {
        socket.join(roomID);
    })

    socket.on("send_room_message", (roomMessage) => {
        socket.to(roomMessage.roomID).emit("receive_room_message", roomMessage);
    });
});


server.listen(3001, () => {    // We use port 3001 for server because the client uses port 3000
    console.log(`Server is running`);
})