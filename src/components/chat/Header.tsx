"use client"

import { TbMoonFilled, TbSunFilled, TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Header = () => {

    const [dark, setDark] = useState<boolean>(false);

    const clearChat = () => {
        localStorage.removeItem("chatMessages");
        window.location.reload();
    };

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark])

    return(
        <header className="fixed top-0 w-full backdrop-blur-md bg-white/30 border-b border-white/20 shadow-md">
            <div className="max-w-6xl mx-auto px-3 py-3 flex items-center justify-between">
                <h1 className="text-lg font-bold">At chat</h1>
                <nav className="flex gap-4 items-center">
                <a href="#" className="relative inline-block after:absolute after:left-1/2 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 after:ease-out after:-translate-x-1/2 hover:dark:after:w-full">
                    Home
                </a>
                <a href="#" className="relative inline-block after:absolute after:left-1/2 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 after:ease-out after:-translate-x-1/2 hover:dark:after:w-full">
                    About
                </a>
                <Button variant="ghost" size="icon" className="cursor-pointer" onClick={clearChat}>
                    <TbTrash className="cursor-pointer text-xl"/>
                </Button>
                <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setDark(!dark)}>
                    {dark ? <TbSunFilled className="cursor-pointer text-xl"/> : <TbMoonFilled className="cursor-pointer text-xl"/>}
                </Button>
                </nav>
            </div>
        </header>

    )
}

export default Header;
