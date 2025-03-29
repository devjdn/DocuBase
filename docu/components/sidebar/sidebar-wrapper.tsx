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
import React from "react";
import { categoryIcons, groupLinksByCategory } from "@/lib/docubase";
import { SidebarLinkInfo } from "@/app/types/links";
import Link from "next/link";
import { MobileSidebarNavCategory } from "./mobile/nav-category";

export default function SidebarWrapper({links, isAdmin}: SidebarLinkInfo & {isAdmin: boolean | null}){
    const { isMobile, state, toggleSidebar, isOpen, isOpenMobile } = useSidebar();
    const groupedLinks = React.useMemo(() => (
        groupLinksByCategory(links)
    ), [links]);

    if (isMobile) {
        return(
            <div className={clsx(
                "absolute top-0 z-60 flex flex-col gap-4 grow bg-sidebar/50 backdrop-blur-lg styled-scrollbar border-r border-border h-full p-5 w-68",
                {"animate-slide-out": !isOpenMobile},
                {"animate-slide-in shadow-2xl shadow-brand/50": isOpenMobile}
            )}

            data-sidebar-open={isOpenMobile}
            >
                <SidebarHeader>
                    <Button 
                        onClick={toggleSidebar}
                        size={"icon"}
                        variant={"sidebarGhost"}
                        justify={"center"}
                    >
                        <PanelLeft size={18} />
                    </Button>

                    <SearchBar/>
                </SidebarHeader>

                <SidebarNav>
                    {Object.entries(groupedLinks).map(([category, links], index) => (
                        <MobileSidebarNavCategory key={index} category={category} links={links} icon={categoryIcons[category]}/>               
                    ))}
                </SidebarNav>


                <SidebarFooter>
                        {isAdmin === true ? (
                            <Button asChild variant={"outline"} size={isOpen ? "sm": "icon"} justify={"center"}>
                                <Link href="/admin">
                                    <div className="flex gap-1 items-center justify-center">
                                        <LayoutDashboard size={18} />
                                        {isOpen && <p>Admin Dashboard</p>}
                                    </div>
                                </Link>
                            </Button>
                        ) : isAdmin === null ? (
                            <Button variant={"suspense"} size={isOpen ? "sm": "icon"} justify={"center"}/>
                        ) : null}
                    <LinkSubmissionPortal/>
                </SidebarFooter>
            </div>
        )
    }
    
    return(
        <div className={clsx(
            "hidden md:flex flex-col grow styled-scrollbar max-h-screen h-full",
            {"w-auto": state === "closed"},
            {"w-64": state === "expanded"}
            )}
            data-sidebar-state={state}
        >
            <SidebarHeader>
                <Button 
                    onClick={toggleSidebar}
                    size={"icon"}
                    variant={"sidebarGhost"}
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
                    {isAdmin === true ? (
                        <Button asChild variant={"outline"} size={isOpen ? "sm": "icon"} justify={"center"}>
                            <Link href="/admin">
                                <div className="flex gap-1 items-center justify-center">
                                    <LayoutDashboard size={18} />
                                    {isOpen && <p>Admin Dashboard</p>}
                                </div>
                            </Link>
                        </Button>
                    ) : isAdmin === null ? (
                        <Button variant={"suspense"} size={isOpen ? "sm": "icon"} justify={"center"}/>
                    ) : null}
                <LinkSubmissionPortal/>
            </SidebarFooter>
        </div>
    );
}