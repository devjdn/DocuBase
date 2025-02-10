"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import LinkSubmissionForm from "./submission-form";
import SidebarAction from "../sidebar/sidebar-buttons/sidebar-action";
import { Send, X } from "lucide-react";
import { Heading2 } from "../typography/headings";

export default function LinkSubmissionPortal() {
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

    return(
        <>
            <SidebarAction
                buttonColor={"primary"}
                buttonWidth={"full"}
                centered={true}
                icon={<Send size={18} />} 
                label={"Submit a link"}
                onClick={togglePortal}
            />
            {mounted && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
                    <div className="rounded-xl bg-card p-10 shadow-lg border border-input text-card-foreground  w-full max-w-md" ref={menuRef}>
                        <header className="flex flex-row justify-between items-center gap-4 mb-6">
                            <span className="text-2xl font-medium text-foreground">Submit a link</span>
                            <button onClick={togglePortal} className="cursor-pointer stroke-muted-foreground hover:stroke-foreground transition-colors"><X size={18}/></button>
                        </header>
                        <LinkSubmissionForm/>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}