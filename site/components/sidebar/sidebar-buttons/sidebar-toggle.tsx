"use client";
import { useSidebar } from "@/app/providers/sidebar-provider";
import { ChevronsUpDown, PanelLeft } from "lucide-react";

export default function SidebarToggle() {
    const { toggleSidebar, isOpen } = useSidebar();

    return(
        <button className="w-fit cursor-pointer p-2 rounded-md hover:bg-muted" onClick={toggleSidebar}>
            <PanelLeft size={20}/>
        </button>
    );
}