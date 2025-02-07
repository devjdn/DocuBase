"use client";

import SidebarNav, { SidebarNavProps } from "./sidebar-nav/sidebar-nav";
import { useSidebar } from "@/providers/sidebar-provider";
import clsx from "clsx";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";
import SidebarAction from "./sidebar-buttons/sidebar-action";
import { PanelLeft, Send } from "lucide-react";

export default function SidebarWrapper({links}: SidebarNavProps){
    const { isMobile, state, toggleSidebar } = useSidebar();

    if(isMobile) {
        return <div></div>
    }

    return(
        <div className={clsx(
            "sticky top-[64px] flex flex-col gap-4 bg-background styled-scrollbar border-[hsl(var(--border))] border-r h-[calc(100vh-60px)] p-5",
            {"auto": state === "closed"},
            {"w-68": state === "expanded"}
            )}
            data-sidebar-state={state}
        >
            <SidebarHeader>
                <SidebarAction 
                    buttonColor={"secondary"}
                    buttonWidth={"fit"}
                    centered={false}
                    icon={<PanelLeft size={18} />}
                    onClick={toggleSidebar}
                 />
            </SidebarHeader>
            <SidebarNav links={links}/>
            <SidebarFooter>
                <SidebarAction
                    buttonColor={"primary"}
                    buttonWidth={"full"}
                    centered={true}
                    icon={<Send size={18} />} 
                    label={"Submit a link"} 
                    
                />
            </SidebarFooter>
        </div>
    );
}