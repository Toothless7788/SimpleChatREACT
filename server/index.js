const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {    // For security checking: define what is allowed
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});


server.listen(3001, () => {    // We use port 3001 for server because the client uses port 3000
    console.log(`Server is running`);
})