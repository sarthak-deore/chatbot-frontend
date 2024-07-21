import React, { useState } from "react";
import { chat } from "../api";

import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([
    { role: "user", content: "Start typing to chat!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await chat({
        messages: [...messages, newMessage],
      });

      if (response.data) {
        setMessages([
          ...messages,
          newMessage,
          { role: "assistant", content: response.data.content },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
