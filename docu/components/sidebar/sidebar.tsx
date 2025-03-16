import { createClient } from "@/utils/supabase/server";
import SidebarWrapper from "./sidebar-wrapper";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { SidebarLinkInfo } from "@/app/types/links";

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: links, error } = await supabase
        .from("links")
        .select("name, url_slug, url, categories(name)")
        .order("category_id", {ascending: true})
        .overrideTypes<Array<{categories: {name: string}}>>();

    console.log(links);

    if (error || !links) {
        console.error("Error fetching links:", error.message);
        return <div>Error fetching data</div>; // Or a loading indicator
    }

    return(
        <SidebarProvider>
            <SidebarWrapper links={links}/>
        </SidebarProvider>
    );
}