"use client";
import SidebarNav, { SidebarNavProps } from "./sidebar-nav";
import { useSidebar } from "@/providers/sidebar-provider";

export default function SidebarWrapper({links}: SidebarNavProps){
    const { sidebarType } = useSidebar();

    return(
        <div className="flex md:flex-col h-[calc(100vh-60px)] w-64 border-r border-[hsl(var(--border))] py-10 px-6" data-sidebar-type={sidebarType}>
            <SidebarNav links={links}/>
        </div>
    );
}