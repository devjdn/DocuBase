import * as React from "react";
import { CategoryProps } from "@/app/types/sidebar";
import clsx from "clsx";
import { useSidebar } from "@/providers/sidebar-provider";
import SidebarLinkContent from "../sidebar-nav/link-content";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function MobileSidebarNavCategory({category, icon, links}: CategoryProps) {
    const { isOpenMobile, setIsOpenMobile, toggleSidebar, isMobile} = useSidebar();
    const [categoryOpen, setCategoryOpen] = React.useState<boolean>(false);

    return(
        <div className="w-full">
            <Button
            className="w-full"
                variant="ghost"
                justify={"between"}
                size={"sm"}
                onClick={
                    () => {
                        setCategoryOpen((prev) => !prev);
                    } 
                }
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <p className="text-sm text-foreground stroke-foreground">{category}</p>
                </div>
                <ChevronRight className={clsx(
                        "transition-transform",
                        {"rotate-90": categoryOpen},
                        {"rotate-0": !categoryOpen}
                    )}
                    size={16}
                />
            </Button>

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
        </div>
    );
}