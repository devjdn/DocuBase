import { createClient } from "@/utils/supabase/server";
import SidebarWrapper from "./sidebar-wrapper";

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: links, error } = await supabase
        .from("links")
        .select(`*, categories (name)`)
        .order("category_id", {ascending: true});

    if (error || !links) {
        console.error("Error fetching links:", error);
        return <div>Error fetching data</div>; // Or a loading indicator
    }

    return(
        <SidebarWrapper links={links}/>
    );
}