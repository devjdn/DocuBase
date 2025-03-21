"use client";

import { useCallback, useState, useRef, useEffect, use } from "react";
import { createPortal } from "react-dom";
import LinkSubmissionForm from "./submission-form";
import { CircleOff, Send, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useSidebar } from "@/providers/sidebar-provider";
import { Heading2 } from "../typography/headings";

export default function LinkSubmissionPortal() {
    const { isSignedIn } = useUser();
    const { isOpen, toggleSidebar } = useSidebar();
    const [mounted, setMounted] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const togglePortal = useCallback(() => {
        setMounted((prev) => !prev);
    }, [setMounted])

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMounted(false);
        }
    }, [menuRef]);

    useEffect(() => {
        if(mounted) {
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [mounted, menuRef]);

    if (!isSignedIn) {
        return(
            <Button
                onClick={
                    () => {
                        if(!isOpen) {
                            toggleSidebar();
                        }

                        return null;
                    }
                }
                variant="outline"
                justify="center"
                size={isOpen ? "sm" : "icon"}
                className="gap-2"
            >
                <CircleOff size={18}/>
                {isOpen && <p>Sign in to submit links</p>}
            </Button>
        );
    }

    return (
        <>
            <Button
                onClick={togglePortal}
                variant="default"
                justify="center"
                size={isOpen ? "sm" : "icon"}
                className="gap-2"
            >
                <Send size={18} />
                {isOpen && <p>Submit a link</p>}
            </Button>
            {mounted && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95" data-state={isOpen ?  "open" : "closed"}>
                    <div className="rounded-xl bg-card p-8 shadow-lg border border-input text-card-foreground  w-full max-w-md" ref={menuRef}>
                        <header className="flex flex-row justify-between items-center gap-4 mb-6">
                            <div className="flex h-fit">
                                <Heading2 text={"Link submission"}/>
                            </div>
                            <Button onClick={togglePortal} variant={"ghost"} size={"icon"} justify={"center"}><X size={18}/></Button>
                        </header>
                        <LinkSubmissionForm />
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}