"use client"

import { useState } from "react"
import { Bot, Send, Plus, Image, Paperclip, Mic } from "lucide-react"

export function AIAssistant() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! I'm your AI assistant. How can I help you with your crypto portfolio today?" },
    { sender: "user", text: "What investments would you recommend for a moderate risk profile?" },
    {
      sender: "bot",
      text: "For a moderate risk profile, I recommend a diversified portfolio with 40% Bitcoin, 30% Ethereum, 20% in large-cap altcoins like Solana and Cardano, and 10% in stablecoins as a safety reserve. This balance provides good growth potential while managing volatility.",
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { sender: "user", text: message }])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm analyzing your portfolio and market conditions. Based on current trends, I recommend considering an increase in your Ethereum allocation by 5%, as upcoming network upgrades may drive value appreciation.",
        },
      ])
    }, 1000)
  }

  return (
    <div className="glass-card p-6 animate-fade-in opacity-0 animate-once stagger-3">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="bg-brand-navy w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">AI Assistant</h3>
            <p className="text-sm text-brand-darkGray/70">Get real-time investment advice</p>
          </div>
        </div>
        <button className="secondary-button py-1 px-3 text-sm">
          <Plus size={16} className="mr-1" />
          New Chat
        </button>
      </div>

      <div className="h-80 overflow-y-auto mb-4 pr-2">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`mb-4 flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={chat.sender === "user" ? "user-bubble" : "bot-bubble"}>{chat.text}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center bg-brand-gray rounded-xl p-2">
        <button className="icon-button mr-1">
          <Paperclip size={18} className="text-brand-darkGray/60" />
        </button>
        <button className="icon-button mr-1">
          <Image size={18} className="text-brand-darkGray/60" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none px-2 py-1"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="icon-button mr-1">
          <Mic size={18} className="text-brand-darkGray/60" />
        </button>
        <button
          className={`p-2 rounded-lg transition-all ${
            message ? "bg-brand-blue text-white" : "bg-brand-darkGray/20 text-brand-darkGray/60"
          }`}
          onClick={handleSendMessage}
          disabled={!message}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}

