"use client";

import { useEffect, useRef} from "react";
import Header from "./Header";
import InputArea from "./InputArea";

export default function ChatLayout() {

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    });

    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <main className="flex-1 overflow-y-auto px-30 py-15 space-y-4">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 w-fit"
                        >
                        Message {i + 1}
                    </div>
                ))}

                <div ref={messagesEndRef} />
            </main>
            <footer className="relative h-24">
                <InputArea/>
            </footer>
        </div>
    )
}