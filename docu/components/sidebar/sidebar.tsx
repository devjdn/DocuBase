import SidebarWrapper from "./sidebar-wrapper";
import { checkRole } from "@/utils/roles";
import supabaseClient from "@/utils/supabaseClient";

export default async function Sidebar() {

    // console.time("fetching links");

    const { data: links, error } = await supabaseClient
        .from("links")
        .select("name, url_slug, url, categories(name)")
        .order("category_id", {ascending: true})
        .overrideTypes<Array<{categories: {name: string}}>>();

    // console.timeEnd("fetching links");

    if (error || !links) {
        console.error("Error fetching links:", error.message);
        return <div>Error fetching data</div>; // Or a loading indicator
    }

    // console.time("Check Role"); // Optional: time role check too
    const isAdmin = await checkRole("admin");
    // console.timeEnd("Check Role");

    return(
        <SidebarWrapper isAdmin={isAdmin} links={links}/>
    );
}