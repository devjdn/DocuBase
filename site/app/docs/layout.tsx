import Sidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/app/providers/sidebar-provider";

export default function DocumentationLayout({children}: {children: React.ReactNode}) {
    return(
        <SidebarProvider>
            <div className="w-full flex flex-col md:grid md:grid-cols-[auto_1fr] grow">
                <Sidebar/>
                <main className="grow max-w-5xl px-5 py-10 md:p-10">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}