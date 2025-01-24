import { createClient } from "@/utils/supabase/server";
import SidebarNav, { SidebarNavProps } from "./sidebar-nav";

export default async function SidebarWrapper(){
    const supabase = await createClient();
    const { data: links, error } = await supabase.from("links").select();

    if (error || !links) {
        console.error("Error fetching links:", error);
        return <div>Error fetching data</div>; // Or a loading indicator
      }

    return(
        <div className="hidden md:flex md:flex-col h-[calc(100vh-60px)] w-64 border-r border-[hsl(var(--border))] scroll-py-10 px-8">
            <SidebarNav links={links}/>
        </div>
    );
}