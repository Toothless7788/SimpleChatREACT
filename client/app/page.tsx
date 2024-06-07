"use client";
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");    // We will use socket to emit and receive message from server

export default function App() {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    // Send a message to server
    socket.emit("sendMessage", {value: "Hello from user"});    // Name of event, i.e. sendMessage is self-defined -> just need to map the correct one at the server
  };

  socket.on("receiveMessage", (data) => {
    setMessage(data["value"]);
  });

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="border-black border-2">
        <input placeholder="Type your message" />
        <button onClick={sendMessage}>Send Message</button>
        <h1>{message}</h1>
      </div>
    </div>
  );
}
