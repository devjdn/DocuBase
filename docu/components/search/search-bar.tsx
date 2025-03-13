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
            className="border border-input bg-background h-9 px-2 flex items-center gap-2 rounded-md ring-offset-background has-placeholder:text-muted-foreground has-focus-visible:outline-hidden has-focus-visible:ring-1 has-focus-visible:ring-brand has-focus-visible:ring-offset-2" 
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