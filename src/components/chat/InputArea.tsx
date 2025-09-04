"use client"

import { Input } from "@/components/ui/input";
import { FaArrowUp } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onSend: (message: string) => void;
}

const InputArea = ({onSend}: Props) => {

    const [text, setText] = useState("");

    const handleSend = () => {
        if(!text.trim()) return
        onSend(text.trim());
        setText("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSend()
        }
    }


    return(
        <>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl">
                <div className="relative">
                    <Input
                        type="text"
                        className="rounded-full w-full p-7 px-6 pr-14"
                        value={text} onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your ideas, inquiries or thoughts"
                    />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 hover:dark:bg-gray-900 p-3 cursor-pointer"
                        onClick={handleSend}
                    >
                        <FaArrowUp />
                    </motion.button>
                </div>
            </div>
        </>
    )
}

export default InputArea;