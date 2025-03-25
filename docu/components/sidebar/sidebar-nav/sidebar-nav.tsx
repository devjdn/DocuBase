import * as React from "react";

export default function SidebarNav({children}: {children: React.ReactNode}) {

    return(
        <nav className="overflow-y-auto styled-scrollbar flex flex-col w-full  grow relative">
            {children}
        </nav>
    );
}