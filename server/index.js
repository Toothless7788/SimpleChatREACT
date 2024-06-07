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
