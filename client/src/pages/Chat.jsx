// Client.js (React example)
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:7000', {
    transports: ['websocket', 'polling'], // Enable both transports
  });

function Chat() {
  const [messages, setMessages] = useState([]);
 
  
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
        console.log('Message received:', message);
        
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    const messageData = {
      sender: "671a64b04225574b13b52daf",
      receiver: "671a647d4225574b13b52da9",
      
      message: newMessage,
    };

    // Emit the message event
    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
