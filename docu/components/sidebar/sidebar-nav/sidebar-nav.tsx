import * as React from "react";
import { LinkTypes } from "@/app/types/links";

export default function SidebarNav({children}: {children: React.ReactNode}) {

    return(
        <nav className="overflow-y-auto styled-scrollbar flex flex-col w-full h-full relative">
            {children}
        </nav>
    );
}