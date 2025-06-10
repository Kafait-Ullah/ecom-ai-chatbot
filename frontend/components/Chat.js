"use client"; // Enables client-side rendering in Next.js App Router

import { useState } from "react";

export default function Chat() {
  // State for input field and messages
  const [input, setInput] = useState(""); // Stores user’s typed query
  const [messages, setMessages] = useState([]); // Stores chat history

  // Function to handle sending a message
  const sendMessage = async () => {
    if (!input.trim()) return; // Ignore empty inputs

    // Add user message to chat
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // TODO: Connect to backend API (Day 5)
    // For now, simulate a bot response
    const botResponse = { sender: "bot", text: `Echo: ${input}` };
    setMessages((prev) => [...prev, botResponse]);

    // Clear input field
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4 text-center">EcomAI Chatbot</h1>

      {/* Chat Area */}
      <div className="flex-1 border rounded-lg p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto max-w-xs"
                : "bg-gray-300 text-black mr-auto max-w-xs"
            }`}
          >
            <p className="font-semibold">
              {msg.sender === "user" ? "You" : "Bot"}:
            </p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query (e.g., Recommend laptops)"
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
