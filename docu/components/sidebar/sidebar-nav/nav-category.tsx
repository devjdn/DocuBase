import * as React from "react";
import { CategoryProps } from "@/app/types/sidebar";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSidebar } from "@/providers/sidebar-provider";
import SidebarLinkContent from "./link-content";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function SidebarNavCategory({category, icon, links}: CategoryProps) {
    const { isOpen, setIsOpen} = useSidebar();
    const [categoryOpen, setCategoryOpen] = React.useState<boolean>(false);

    return(
        <div className="w-full">
            <Button
            className="w-full"
                variant="ghost"
                justify={isOpen ? "between" : "center"}
                size={isOpen ? "sm" : "icon"}
                onClick={
                    () => {
                        setCategoryOpen((prev) => !prev);
                        if (!isOpen) {
                            setIsOpen(true);
                        }
                    } 
                }
            >
                <div className="flex items-center gap-2">
                    {icon}
                    {isOpen && (
                        <p className="text-sm text-foreground stroke-foreground">{category}</p>
                    )}
                </div>
                {isOpen && (
                    <ChevronRight className={clsx(
                        "transition-transform",
                        {"rotate-90": categoryOpen},
                        {"rotate-0": !categoryOpen}
                    )} size={16}/>
                )}
            </Button>

            {isOpen && (
                <div className={clsx(
                    "pl-4",
                    {"hidden": !categoryOpen}
                )}
                data-category-open={categoryOpen}
                >
                    <ul className="border-l border-border mt-1 mb-2 pl-2">
                        {links.map((link, linkIndex) => (
                            <li
                            key={linkIndex}
                            >
                                <SidebarLinkContent url_slug={link.url_slug} name={link.name} url={link.url}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}