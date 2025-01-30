"use client";

import SidebarNav, { SidebarNavProps } from "./sidebar-nav";
import { useSidebar } from "@/app/providers/sidebar-provider";
import clsx from "clsx";
import SidebarToggle from "./sidebar-buttons/sidebar-toggle";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";

export default function SidebarWrapper({links}: SidebarNavProps){
    const { isMobile, state } = useSidebar();

    if(isMobile) {
        return <div></div>
    }

    return(
        <div className={clsx(
            "sticky top-[64px] flex flex-col bg-background styled-scrollbar border-[hsl(var(--border))] border-r h-[calc(100vh-60px)]",
            {"auto": state === "closed"},
            {"w-68": state === "expanded"}
            )}
            data-sidebar-state={state}
        >
            <SidebarHeader>
                <SidebarToggle/>
            </SidebarHeader>
            <SidebarNav links={links}/>
            <SidebarFooter/>
        </div>
    );
}