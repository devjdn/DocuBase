"use client";

import { Clipboard, ClipboardCheck, ClipboardX, Flag, Heart, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ControlBar({url}: {url: string;}) {
    const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');

    const copyToClipboard = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopyState('success');
            setTimeout(() => setCopyState('idle'), 1000);
            // console.log("Copied to clipboard:", url);
        } catch (error) {
            console.error("Failed to copy text to clipboard:", error);
            setCopyState('error');
        }
    }

    return(
        <div className="py-4">
            <p className="mb-2">Link controls</p>

            <div className="flex flex-row gap-6">
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    justify={"center"}
                    aria-label="Copy link"
                    onClick={() => copyToClipboard(url)}
                >
                    {copyState === 'success' ? (
                        <ClipboardCheck size={18}/> 
                    ) : copyState === 'error' ? (
                        <ClipboardX size={18}/>
                    ) : (
                        <Clipboard size={18}/>
                    )}
                </Button>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    justify={"center"}
                    aria-label="Submit edit request"
                >
                    <Pencil className="group-hover:stroke-brand" size={18}/>
                </Button>

                <Button
                    variant={"ghost"}
                    size={"icon"}
                    justify={"center"}
                    aria-label="Submit delete request"
                >
                    <Trash2 className="group-hover:stroke-destructive" size={18}/>
                </Button>

                <Button
                    variant={"ghost"}
                    size={"icon"}
                    justify={"center"}
                    aria-label="Favourite link"
                >
                    <Heart className="group-hover:stroke-pink-800" size={18}/>
                </Button>

                <Button
                    variant={"ghost"}
                    size={"icon"}
                    justify={"center"}
                    aria-label="Submit a deprecation request"
                >
                    <Flag className="group-hover:stroke-warning-foreground" size={18}/>
                </Button>
            </div>
        </div>
    );
}