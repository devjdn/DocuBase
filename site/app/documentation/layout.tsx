import SidebarWrapper from "@/components/sidebar/sidebar-wrapper";

export default function DocumentationLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="w-full flex md:flex-row grow">
            <SidebarWrapper/>
            <div>
                {children}
            </div>
        </div>
    );
}