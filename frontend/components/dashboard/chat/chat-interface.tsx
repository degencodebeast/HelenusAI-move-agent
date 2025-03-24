"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Plus, Image, Paperclip, Mic, Bot, User } from "lucide-react"

interface Message {
  sender: "user" | "bot"
  text: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm your AI crypto assistant. How can I help you with your investments today?",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your portfolio analysis, I recommend exploring Aptos DeFi protocols like Liquidswap and Pancake Swap to optimize your trading and yield opportunities.",
        "Looking at current market trends on Aptos, the ecosystem is growing rapidly. Consider allocating more of your portfolio to APT tokens and Aptos-native projects.",
        "Your current risk level is moderate. If you're looking for more aggressive growth, consider adding positions in Move-based DeFi protocols with strong fundamentals on Aptos.",
        "I've analyzed your trading patterns on Aptos, and you might benefit from utilizing Move's resource-oriented programming model for more efficient trades and lower fees.",
        "The upcoming Aptos protocol upgrades could significantly impact DeFi opportunities. Would you like me to explain how these changes might affect your specific holdings?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const botMessage: Message = {
        sender: "bot",
        text: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, botMessage])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="glass-card flex-1 p-6 flex flex-col animate-scale-in opacity-0 animate-once h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="bg-gradient-premium w-10 h-10 rounded-full flex items-center justify-center shadow-md">
            <Bot size={20} className="text-white" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold">CryptoGPT</h3>
            <p className="text-xs text-brand-darkGray/70">Online • Trained on latest market data</p>
          </div>
        </div>
        <button className="secondary-button py-1.5 px-3 text-sm flex items-center">
          <Plus size={16} className="mr-1.5" />
          New Conversation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 pr-2">
        {messages.map((message, index) => (
          <div key={index} className={`mb-6 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "bot" && (
              <div className="bg-brand-navy w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
            )}

            <div className={`max-w-[75%] ${message.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
              <p>{message.text}</p>
              <div
                className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70 text-right" : "text-brand-darkGray/60"}`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>

            {message.sender === "user" && (
              <div className="bg-brand-blue w-8 h-8 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <button className="icon-button mr-1">
            <Paperclip size={18} className="text-brand-darkGray/60" />
          </button>
          <button className="icon-button mr-1">
            <Image size={18} className="text-brand-darkGray/60" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 outline-none px-3 py-1.5"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="icon-button mr-1">
            <Mic size={18} className="text-brand-darkGray/60" />
          </button>
          <button
            className={`p-2 rounded-lg transition-all ${
              input ? "bg-brand-blue text-white" : "bg-brand-gray text-brand-darkGray/60"
            }`}
            onClick={handleSendMessage}
            disabled={!input}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-center mt-2 text-brand-darkGray/60">
          HelenusAI may produce inaccurate information about market trends or recommendations.
        </p>
      </div>
    </div>
  )
}

