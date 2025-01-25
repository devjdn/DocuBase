import { createClient } from "@/utils/supabase/server";
import { SidebarProvider } from "@/providers/sidebar-provider";
import SidebarWrapper from "./sidebar-wrapper";

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: links, error } = await supabase.from("links").select();

    if (error || !links) {
        console.error("Error fetching links:", error);
        return <div>Error fetching data</div>; // Or a loading indicator
    }

    return(
        <SidebarProvider>
            <SidebarWrapper links={links}/>
        </SidebarProvider>
    );
}