"use client";
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");    // We will use socket to emit and receive message from server


export default function App() {
  const [message, setMessage] = useState("");
  const [displayText, setDisplayText] = useState("");
  const sendMessage = () => {
    // Send a message to server
    socket.emit("sendMessage", {value: message});    // Name of event, i.e. sendMessage is self-defined -> just need to map the correct one at the server
  };

  socket.on("receiveMessage", (data) => {
    setDisplayText(data["value"]);
  });

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="border-black border-2">
        <input className="border-green-700" placeholder="Type your message" onChange={(event) => {
          setMessage(event.target.value);
        }}/>
        <button className="bg-blue-800 hover:bg-blue-300 rounded-xl" onClick={sendMessage}>Send Message</button>
        <h1>Your message: {displayText}</h1>
      </div>
    </div>
  );
}
