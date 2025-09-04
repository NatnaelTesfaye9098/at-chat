import { Message } from "../../lib/types";
import { cn } from "../../lib/utils";

type Props = {
  message: Message
}

export default function MessageBubble({message} : Props) {

    const isUser = message.role === "user";

    return(
        <div className={cn(
            "flex w-full",
            isUser ? "justify-end" : "justify-start"
        )}>
            <div
                className={cn(
                "max-w-xs sm:max-w-md rounded-2xl px-4 py-2 text-sm shadow",
                isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                )}
            >
                {message.content}

                {message.timestamp && (
                <div className="mt-1 text-[10px] opacity-60 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    })}
                </div>
                )}
            </div>
        </div>
    )
}