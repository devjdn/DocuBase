"use client";

import SidebarNav from "./sidebar-nav/sidebar-nav";
import { useSidebar } from "@/providers/sidebar-provider";
import clsx from "clsx";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";
import { PanelLeft } from "lucide-react";
import LinkSubmissionPortal from "../link-submission/submission-portal";
import SearchBar from "../search/search-bar";
import { Button } from "../ui/button";
import { SidebarNavCategory } from "./sidebar-nav/nav-category";
import React from "react";
import { categoryIcons, groupLinksByCategory } from "@/lib/docubase";
import { LinkTypes } from "@/app/types/links";

export default function SidebarWrapper({links}: LinkTypes){
    const { isMobile, state, toggleSidebar, isOpen } = useSidebar();
    const groupedLinks = React.useMemo(() => groupLinksByCategory(links), [links]);

    if(isMobile) {
        return <div></div>
    }

    return(
        <div className={clsx(
            "sticky top-16 flex flex-col gap-4 bg-background styled-scrollbar border-[hsl(var(--border))] border-r h-[calc(100vh-60px)] p-5",
            {"auto": state === "closed"},
            {"w-68": state === "expanded"}
            )}
            data-sidebar-state={state}
        >
            <SidebarHeader>
                <Button 
                    onClick={toggleSidebar}
                    size={"icon"}
                    variant={"ghost"}
                    justify={"center"}
                >
                    <PanelLeft size={18} />
                </Button>

                <SearchBar/>
            </SidebarHeader>

            <SidebarNav>
                {Object.entries(groupedLinks).map(([category, links], index) => (
                    <SidebarNavCategory key={index} category={category} links={links} icon={categoryIcons[category]}/>               
                ))}
            </SidebarNav>


            <SidebarFooter>
                <LinkSubmissionPortal/>
            </SidebarFooter>
        </div>
    );
}