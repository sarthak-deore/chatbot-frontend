// Chat.js
import React from "react";
import { chat } from "../api";
import { useChat } from "../context/ChatContext";
import "./Chat.css";

function Chat() {
  const { messages, setMessages, input, setInput } = useChat();
  const messagesEndRef = React.useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await chat({ messages: updatedMessages });

      if (response.data) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: response.data.content },
        ]);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const renderMessageContent = (content) => {
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>");

    return { __html: formattedContent };
  };

  return (
    <div className="App">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <div
              dangerouslySetInnerHTML={renderMessageContent(message.content)}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
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
