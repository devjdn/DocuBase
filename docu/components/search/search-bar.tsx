"use client";

import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSidebar } from "@/providers/sidebar-provider";
import { Button } from "../ui/button";

export default function SearchBar() {
    const { isOpen, toggleSidebar } = useSidebar();

    if (!isOpen) {
        return(
            <Button
                onClick={toggleSidebar}
                size="icon"
                variant="ghost"
                justify="center"
                className="items-center"
            >
                <Search size={18}/>
            </Button>
        )
    }

    return(
        <div>
            <form 
            className="bg-input h-9 px-2 flex items-center gap-2 rounded-md border-input border has-focus:outline-1" 
            onSubmit={((e: FormEvent) => e.preventDefault())}
            >
                <div>
                    <Search className="stroke-muted-foreground" size={18}/>
                </div>
                <input className="text-sm w-full flex-1 focus:ring-0 focus:outline-none" type="text" placeholder="Search for a link"/>
            </form>
        </div>
    );
}