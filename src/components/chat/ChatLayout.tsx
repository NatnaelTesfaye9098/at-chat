"use client"

import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import InputArea from "./InputArea"
import MessageBubble from "./message-bubble"
import { Message } from "@/lib/types"
import TypingIndicator from "./typing-indicator"
import { v4 as uuid } from "uuid"
import { AnimatePresence, motion } from "framer-motion"

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{ id: uuid(), role: "assistant", content: "Hey! I’m your AI assistant 😊" }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMessage: Message = { id: uuid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try{
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: text}),
        });

        const data = await res.json();

        const assistantMessage: Message = {
            id: uuid(),
            role: "assistant",
            content: data.reply,
        };
        setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
        console.error(err);
        const errorMessage: Message = {
            id: uuid(),
            role: "assistant",
            content: "Oops! Something went wrong",
        };
        setMessages((prev) => [...prev, errorMessage])
    } finally {
        setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto px-4 py-20 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <MessageBubble message={m} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <footer className="relative h-24">
        <InputArea onSend={handleSend}/>
      </footer>
    </div>
  )
}