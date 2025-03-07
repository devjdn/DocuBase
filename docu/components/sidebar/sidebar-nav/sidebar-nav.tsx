"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Box, BrainCircuit, ChevronRight, CircleFadingPlus, Container, Database, ExternalLink, FlaskConical, Layers, LayoutDashboard, LibraryBig, Server, Shield, TerminalSquare } from "lucide-react";
import { useSidebar } from "@/providers/sidebar-provider";
import { SidebarNavCategory } from "./nav-category";

export interface SidebarNavProps {
    links: {
      id: number;
      name: string;
      url: string;
      description: string;
      created_at: string;
      category_id: number;
      categories: {
        name: string;
      }
      url_slug: string;
    }[];
}
export interface CategoryProps {
    category: string;
    icon: React.ReactNode;
    links: {
        id: number;
        name: string;
        url: string;
        url_slug: string;
    }[]
}

const categoryIcons: Record<string, React.ReactNode> = {
    Frameworks: <Box className="stroke-muted-foreground" size={20}/>,
    Libraries: <LibraryBig className="stroke-muted-foreground" size={20}/>,
    Databases: <Database className="stroke-muted-foreground" size={20}/>,
    Authentication: <Shield className="stroke-muted-foreground" size={20}/>,
    UI: <LayoutDashboard className="stroke-muted-foreground" size={20}/>,
    DevOps: <Container className="stroke-muted-foreground" size={20}/>,
    'Hosting & Deployment': <Server className="stroke-muted-foreground" size={20}/>,
    Testing: <FlaskConical className="stroke-muted-foreground" size={20}/>,
    'AI & Machine Learning': <BrainCircuit className="stroke-muted-foreground" size={20}/>,
    CMS: <CircleFadingPlus className="stroke-muted-foreground" size={20}/>,
    'CLI Tools': <TerminalSquare className="stroke-muted-foreground"size={20}/>,
    'Other': <Layers className="stroke-muted-foreground" size={20}/>,
}

export const groupLinksByCategory = (links: SidebarNavProps['links']) => {
    // The reduce method is used to accumulate a result
    // In this case, it is an object
    return links.reduce((acc, link) => {

        // If a link category doesn't exist
        // Initialize that category as an empty array
        if(!acc[link.categories.name]) {
            acc[link.categories.name] = [];
        }

        // Uses the push method to add the current link 
        // to its corresponding category array
        acc[link.categories.name].push(link);
        return acc;

        // The initial value of `acc` is an empty object, typed as `Record<string, SidebarNavProps['links']>`.
        // `acc` will become an object where the keys are strings
        // and the values are arrays of links
    }, {} as Record<string, SidebarNavProps['links']>);
};

export default function SidebarNav({links}: SidebarNavProps) {
    const groupedLinks = React.useMemo(() => groupLinksByCategory(links), [links]);

    return(
        <nav className="overflow-y-auto styled-scrollbar flex flex-col gap-3 w-full h-full relative">
            <div className={clsx(
            )}>
                {Object.entries(groupedLinks).map(([category, links], index) => (
                    <SidebarNavCategory key={index} category={category} links={links} icon={categoryIcons[category]}/>
                ))}
            </div>
        </nav>
    );
}