"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Box, BrainCircuit, ChevronRight, CircleFadingPlus, Container, Database, ExternalLink, FlaskConical, Layers, LayoutDashboard, LibraryBig, Server, Shield, TerminalSquare } from "lucide-react";
import { useSidebar } from "@/app/providers/sidebar-provider";

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
    Frameworks: <Box size={20}/>,
    Libraries: <LibraryBig size={20}/>,
    Databases: <Database size={20}/>,
    Authentication: <Shield size={20}/>,
    UI: <LayoutDashboard size={20}/>,
    DevOps: <Container size={20}/>,
    'Hosting & Deployment': <Server size={20}/>,
    Testing: <FlaskConical size={20}/>,
    'AI & Machine Learning': <BrainCircuit size={20}/>,
    CMS: <CircleFadingPlus size={20}/>,
    'CLI Tools': <TerminalSquare size={20}/>,
    'Other': <Layers size={20}/>,
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

export function SidebarCategoryButton({icon, category, toggleCategory, categoryOpen}: {icon: React.ReactNode; category: string; toggleCategory: () => void; categoryOpen: boolean;}) {
    const { isOpen } = useSidebar();

    return(
        <button className="flex flex-row items-center justify-between gap-2 h-[36px] w-full px-2 hover:bg-muted rounded-md cursor-pointer" onClick={toggleCategory}>
            <div className="flex items-center gap-2">
                {icon}
                {isOpen && (
                    <p className="text-sm text-foreground stroke-foreground">{category}</p>
                )}
            </div>
            {isOpen && (
                <ChevronRight className={clsx(
                    {"rotate-90 transition-transform": categoryOpen}
                )} size={16}/>
            )}
        </button>
    )
}

export function SidebarNavCategory({category, icon, links}: CategoryProps) {
    const pathname = usePathname();
    const { isOpen, setIsOpen} = useSidebar();
    const [categoryOpen, setCategoryOpen] = React.useState<boolean>(false);

    return(
        <div className="w-full">
            <SidebarCategoryButton icon={icon} category={category} toggleCategory={() => {
                setCategoryOpen((prev) => !prev);
                if (!isOpen) {
                    setIsOpen(true);
                }
            } } categoryOpen={categoryOpen}/>
            {isOpen && (
                <div className={clsx(
                    "pl-4",
                    {"hidden": !categoryOpen}
                )}
                data-category-open={categoryOpen}
                >
                    <ul className="border-l border-border mt-1 mb-2 pl-2">
                        {links.map((link) => (
                            <li className={clsx(
                                "flex flex-row items-center justify-between group text-sm *:px-3 *:py-2 rounded-md",
                                {"text-muted-foreground hover:text-primary": !pathname.includes(link.url_slug)},
                                {"text-link-foreground bg-link": pathname.includes(link.url_slug)}
                            )}
                            key={link.id}
                            >
                                <Link 

                                    href={`/docs/${link.url_slug}`}
                                    className="grow"
                                >
                                    <p>{link.name}</p>
                                </Link>
                                <a target="_blank" className={clsx(
                                        "transition-colors",
                                        {"invisible group-hover:visible stroke-muted-foreground hover:stroke-primary": !pathname.includes(link.url_slug)},
                                        {"visible stroke-link-foreground": pathname.includes(link.url_slug)}
                                    )} href={link.url}
                                >
                                    <ExternalLink size={18} className="stroke-inherit"/>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function SidebarNav({links}: SidebarNavProps) {
    const pathname = usePathname();
    const groupedLinks = React.useMemo(() => groupLinksByCategory(links), [links]);

    return(
        <nav className="overflow-y-auto styled-scrollbar flex flex-col gap-3 w-full h-full relative">
            <div className={clsx(
            )}>
                {Object.entries(groupedLinks).map(([category, links], index) => (
                    <SidebarNavCategory key={index} category={category} links={links} icon={categoryIcons[category]}/>
                ))}
            </div>
            {/* <div className="sticky bottom-0 left-0 h-6 w-full bg-linear-to-b from-transparent to-background" data-purpose="For anyone wondering what this element is, it is the little thing at the bottom of the nav that makes it fade away. It's only really visible once you open up some categories lol."></div> */}
        </nav>
    );
}