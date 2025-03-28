"use client";

import { Clipboard, ClipboardCheck, ClipboardX, Flag, Heart, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import clsx from "clsx";
import { markAsDeprecated } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function ControlBar({url, name, is_deprecated}: {url: string; name: string; is_deprecated: boolean;}) {
    const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
    const router = useRouter();

    console.log(url, name, is_deprecated)

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
        <div className="bg-secondary border border-border rounded-xl flex flex-row items-center justify-between w-fit gap-4 p-1 my-4">
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
                aria-label="Favourite link"
            >
                <Heart className="group-hover:stroke-pink-800" size={18}/>
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
                aria-label="Submit a deprecation request"
                onClick={() => {
                    markAsDeprecated(name);
                    router.refresh();
                }}
            >
                <Flag className={clsx(
                    "group-hover:stroke-warning-foreground",
                    {"stroke-warning-foreground": is_deprecated}
                )} size={18}/>
            </Button>
        </div>
    );
}