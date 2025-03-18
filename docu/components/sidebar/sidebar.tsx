import { createClient } from "@/utils/supabase/server";
import SidebarWrapper from "./sidebar-wrapper";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { SidebarLinkInfo } from "@/app/types/links";
import { checkRole } from "@/utils/roles";

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: links, error } = await supabase
        .from("links")
        .select("name, url_slug, url, categories(name)")
        .order("category_id", {ascending: true})
        .overrideTypes<Array<{categories: {name: string}}>>();

    if (error || !links) {
        console.error("Error fetching links:", error.message);
        return <div>Error fetching data</div>; // Or a loading indicator
    }

    const isAdmin = await checkRole("admin");

    return(
        <SidebarProvider>
            <SidebarWrapper isAdmin={isAdmin} links={links}/>
        </SidebarProvider>
    );
}