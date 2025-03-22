import { Header } from "@/components/dashboard/header"
import { ChatInterface } from "@/components/dashboard/chat/chat-interface"

export default function ChatPage() {
  return (
    <>
      <Header title="AI Chat Assistant" />
      <main className="flex-1 p-6 flex flex-col">
        <ChatInterface />
      </main>
    </>
  )
}

