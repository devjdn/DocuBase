import DocDetails from "@/components/docs-pages/doc-details";
import DocHeader from "@/components/docs-pages/doc-header";
import { Heading1 } from "@/components/typography/headings";
import { createClient } from "@/utils/supabase/server";

export default async function LinkPage({params}: {params: Promise<{url_slug: string}>}) {
    const { url_slug } = await params;

    const supabase = await createClient();
    const { data: link, error } = await supabase
    .from("links")
    .select("*, categories(name)")
    .eq("url_slug", url_slug)
    .single();

    if (error || !link) {
        console.error("Error fetching link data:", error);
        return <div>Error fetching data. Link not found.</div>;
    }

    return(
        <section>
            <DocHeader category={link.categories.name} name={link.name}/>
            <DocDetails url={link.url} description={link.description} created_at={link.created_at}/>
        </section>
    );
}