"use client";
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");    // We will use socket to emit and receive message from server


export default function App() {
  const [message, setMessage] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [roomMessage, setRoomMessage] = useState("");
  const [roomDisplayText, setRoomDisplayText] = useState("");
  const [room, setRoom] = useState("");
  
  const sendMessage = () => {
    // Send a message to server
    socket.emit("send_message", {value: message});    // Name of event, i.e. sendMessage is self-defined -> just need to map the correct one at the server
  };

  const sendRoomMessage = () => {
    if(room != "") {
      // Send a message for room to server
      socket.emit("send_room_message", {value: roomMessage, roomID: room})
    } else {
      alert("Please input your room ID");
    }
  };

  const joinRoom = () => {
    // Join a room
    if(room != "") {
      socket.emit("join_room", room);
    } else {
      alert("Please input your room ID");
    }
  }

  socket.on("receive_message", (data) => {
    setDisplayText(data["value"]);
  });

  socket.on("receive_room_message", (data) => {
    setRoomDisplayText(data["value"]);
  })

  return (
    <div>
      <div className="flex items-center justify-center mt-5">
        <div className="border-black border-2">
          <input className="border-green-700" placeholder="Type your message" onChange={(event) => {
            setMessage(event.target.value);
          }}/>
          <button className="bg-blue-800 hover:bg-blue-300 rounded-xl" onClick={sendMessage}>Send Message</button>
          <h1>Your message: {displayText}</h1>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <div className="border-black border-2">
          <input className="border-green-700" placeholder="Type your room ID" onChange={(event) => {
            setRoom(event.target.value);
          }}/>
          <button className="bg-blue-800 hover:bg-blue-300 rounded-xl" onClick={joinRoom}>Join Room</button>
          <input className="border-green-700" placeholder="Type your room message" onChange={(event) => {
            setRoomMessage(event.target.value);
          }}/>
          <button className="bg-blue-800 hover:bg-blue-300 rounded-xl" onClick={sendRoomMessage}>Send Room Message</button>
          <h1>Your room message: {roomDisplayText}</h1>
        </div>
      </div>
    </div>
  );
}


