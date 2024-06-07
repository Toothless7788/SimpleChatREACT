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
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", (data) => {
        console.log(`data in server: ${data["value"]}`)    // data["message"] is the same as data.message

        /*
          Summary: 
          1. socket.broadcase.emit(): Send the data to all clients except the initiator, i.e. sender
          2. socket.emit(): Send the data to the initiator, i.e. sender
          3. io.emit(): Send the data to all clients
        */
        // socket.broadcast.emit("receiveMessage", data);    // Send to all clients except sender
        // socket.emit("receiveMessage", data);    // Send to sender only
        io.emit("receiveMessage", data);    // Send to all clients
        
    })
});


server.listen(3001, () => {    // We use port 3001 for server because the client uses port 3000
    console.log(`Server is running`);
})