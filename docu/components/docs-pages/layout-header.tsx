"use client";

import { useSidebar } from "@/providers/sidebar-provider";
import { Button } from "../ui/button";
import { Sidebar } from "lucide-react";
import WindowBtn from "../buttons/window-btn";

export default function LinksLayoutHeader() {
    const { isMobile, state, toggleSidebar, isOpenMobile } = useSidebar();

    return(
        <header className="flex flex-row items-center gap-2 mb-4">
            {isMobile && (
                <Button variant={"ghost"} justify={"center"} size={"icon"} onClick={() => toggleSidebar()}>
                    <Sidebar size={18} />
                </Button>
            )}

            { isMobile && <div className="h-4 border-l border-l-border"></div>}

            <WindowBtn/>
        </header>
    );
}