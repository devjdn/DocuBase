"use client";

import SidebarNav from "./sidebar-nav/sidebar-nav";
import { useSidebar } from "@/providers/sidebar-provider";
import clsx from "clsx";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";
import { PanelLeft, LayoutDashboard } from "lucide-react";
import LinkSubmissionPortal from "../link-submission/submission-portal";
import SearchBar from "../search/search-bar";
import { Button } from "../ui/button";
import { SidebarNavCategory } from "./sidebar-nav/nav-category";
import React, { useEffect, useState } from "react";
import { categoryIcons, groupLinksByCategory } from "@/lib/docubase";
import { LinkTypes } from "@/app/types/links";
import { checkRole } from "@/utils/roles";
import Link from "next/link";

export default function SidebarWrapper({links}: LinkTypes){
    const { isMobile, state, toggleSidebar, isOpen } = useSidebar();
    const groupedLinks = React.useMemo(() => groupLinksByCategory(links), [links]);
    const [isAdmin, setIsAdmin] = useState(false);

    if(isMobile) {
        return <div></div>
    }

    useEffect(() => {
        async function checkIsAdmin() {
            const isAdmin = await checkRole("admin");
            setIsAdmin(isAdmin);
        };
        checkIsAdmin();
    }, [isAdmin]);

    return(
        <div className={clsx(
            "sticky top-16 flex flex-col gap-4 grow bg-background styled-scrollbar border-border border-r h-full max-h-[calc(100svh_-_65px)] p-5",
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
                {isAdmin && (
                    <Button variant={"outline"} size={isOpen ? "sm": "icon"} justify={"center"}>
                        <Link href="/admin">
                            <div className="flex gap-1 items-center justify-center">
                                <LayoutDashboard size={18} />
                                {isOpen && <p>Admin Dashboard</p>}
                            </div>
                        </Link>
                    </Button>
                )}
                <LinkSubmissionPortal/>
            </SidebarFooter>
        </div>
    );
}