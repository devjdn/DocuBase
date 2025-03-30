import { SidebarProvider } from "@/providers/sidebar-provider";
import Sidebar from "@/components/sidebar/sidebar";
import LinksLayoutHeader from "@/components/docs-pages/layout-header";


export default function DocumentationLayout({children}: {children: React.ReactNode}) {
    return(
        <SidebarProvider>
            <div className="w-full flex flex-col md:grid md:grid-cols-[auto_1fr] min-h-screen relative">
                <Sidebar/>

                <main className="flex flex-col gap-6 grow py-3 px-6 md:px-10 bg-background">
                    <LinksLayoutHeader/>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}