"use client"

import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import InputArea from "./InputArea"
import MessageBubble from "./message-bubble"
import { Message } from "@/lib/types"
import TypingIndicator from "./typing-indicator"

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hey! I’m your AI assistant 😊" },
    { id: "2", role: "user", content: "Hi! Show me a demo message" },
    { id: "3", role: "assistant", content: "Sure! These are left vs right bubbles." },
  ]);

  const [isThinking, setIsThinking] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto px-4 py-20 space-y-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isThinking && (
            <div className="flex justify-start">
                <TypingIndicator />
            </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <footer className="relative h-24">
        <InputArea />
      </footer>
    </div>
  )
}