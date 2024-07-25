import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { role: "user", content: "Start typing to chat!" },
  ]);
  const [input, setInput] = useState("");

  return (
    <ChatContext.Provider value={{ messages, setMessages, input, setInput }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
