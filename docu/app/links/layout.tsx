import { SidebarProvider } from "@/providers/sidebar-provider";
import Sidebar from "@/components/sidebar/sidebar";
import LinksLayoutHeader from "@/components/docs-pages/layout-header";


export default function DocumentationLayout({children}: {children: React.ReactNode}) {
    return(
        <SidebarProvider>
            <div className="w-full flex flex-col md:grid md:grid-cols-[auto_1fr] grow relative">
                <Sidebar/>

                <main className="grow p-6 md:p-10 md:rounded-tl-rounded">
                    <LinksLayoutHeader/>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}