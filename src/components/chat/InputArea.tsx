import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { FaArrowUp } from "react-icons/fa";

const InputArea = () => {
    return(
        <>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl">
                <div className="relative">
                    <Input type="text" className="rounded-full w-full p-7 px-6 pr-14" placeholder="Type your ideas, inquiries or thoughts"/>
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-300 dark:bg-gray-800 p-3 cursor-pointer">
                        <FaArrowUp />
                    </button>
                </div>
            </div>
        </>
    )
}

export default InputArea;