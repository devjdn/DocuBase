"use client";
import { useSidebar } from "@/providers/sidebar-provider";
import clsx from "clsx";

interface SidebarActionProps {
    buttonColor: "primary" | "secondary";
    buttonWidth: "full" | "fit";
    centered: boolean;
    icon: React.ReactNode;
    onClick: () => void;
    label?: string;
}

export default function SidebarAction({buttonColor, buttonWidth, centered, icon, onClick, label}: SidebarActionProps) {
    const { isOpen, isOpenMobile } = useSidebar();
    return(
        <button className={clsx(
            "cursor-pointer px-2 h-9 rounded-md flex flex-row items-center gap-2",
            {"w-full": buttonWidth === "full"},
            {"w-fit": buttonWidth === "fit"},
            {"justify-center": centered},
            {"bg-primary text-primary-foreground": buttonColor === "primary"},
            {"bg-secondary text-secondary-foreground": buttonColor === "secondary"},
        )}
        onClick={onClick}
        >
            {icon}
            {label && isOpen && <p className="hidden md:block text-sm">{label}</p>}
        </button>
    );
}