import SidebarWrapper from "@/components/sidebar/sidebar-wrapper";

export default function DocumentationLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="w-full grid grid-cols-[256px_1fr] grow">
            <SidebarWrapper/>
            {children}
        </div>
    );
}