import { useSidebar } from "@/providers/sidebar-provider";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export function SidebarCategoryButton({icon, category, toggleCategory, categoryOpen}: {icon: React.ReactNode; category: string; toggleCategory: () => void; categoryOpen: boolean;}) {
    const { isOpen } = useSidebar();

    return(
        <button className="flex flex-row items-center justify-between gap-2 h-9 w-full px-2 hover:bg-accent rounded-md cursor-pointer" onClick={toggleCategory}>
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