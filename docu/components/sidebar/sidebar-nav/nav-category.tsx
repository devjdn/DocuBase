import * as React from "react";
import { CategoryProps } from "./sidebar-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SidebarCategoryButton } from "./category-button";
import { useSidebar } from "@/providers/sidebar-provider";
import { ExternalLink } from "lucide-react";
import SidebarLinkContent from "./link-content";

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
                            <li
                            key={link.id}
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