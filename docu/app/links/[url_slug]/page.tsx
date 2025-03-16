import { SingleLink } from "@/app/types/links";
import DocDetails from "@/components/docs-pages/doc-details";
import DocHeader from "@/components/docs-pages/doc-header";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function LinkPage({ params }: { params: Promise<{ url_slug: string }> }) {
    try {
        const { url_slug } = await params;

        const supabase = await createClient();
        const { data, error } = await supabase
            .from("links")
            .select("id, name, url, description, created_at, categories(name)")
            .eq("url_slug", url_slug)
            .single()
            .overrideTypes<SingleLink>();


        if (error || !data) {
            console.error("Error fetching link data:", error);
            return <div>Error fetching data. Link not found.</div>;
        }

        return (
            <Suspense fallback="Loading...">
                <section>
                    <DocHeader category={data.categories.name} name={data.name} />
                    <DocDetails url={data.url} description={data.description} created_at={data.created_at} />
                </section>
            </Suspense>
        );
    } catch (error) {
        console.error("Error resolving params:", error);
        return <div>Error fetching data.</div>;
    }
}
