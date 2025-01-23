import Heading1 from "@/components/typography/headings";
import { createClient } from "@/utils/supabase/server";

export default async function LinkPage({params}: {params: Promise<{url_slug: string}>}) {
    const { url_slug } = await params;

    const supabase = await createClient();
    const { data: link, error } = await supabase
    .from("links")
    .select("*")
    .eq("url_slug", url_slug)
    .single();

    if (error || !link) {
        console.error("Error fetching link data:", error);
        return <div>Error fetching data. Link not found.</div>;
    }

    return(
        <main className="max-w-5xl p-10">
            <Heading1 text={link.name}/>
            <a className="text-link-foreground" href={link.url} target="_blank">{link.url}</a>
            <p className="text-muted-foreground">{link.description}</p>
        </main>
    );
}