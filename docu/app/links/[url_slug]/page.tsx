import DocDetails from "@/components/docs-pages/doc-details";
import DocHeader from "@/components/docs-pages/doc-header";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function LinkPage({ params }: { params: Promise<{ url_slug: string }> }) {
    try {
        const { url_slug } = await params;

        const supabase = await createClient();
        const { data: link, error } = await supabase
            .from("links")
            .select("*, categories(name)")
            .eq("url_slug", url_slug)
            .maybeSingle();

        if (error || !link) {
            console.error("Error fetching link data:", error);
            return <div>Error fetching data. Link not found.</div>;
        }

        return (
            <Suspense fallback="Loading...">
                <section>
                    <DocHeader category={link.categories.name} name={link.name} />
                    <DocDetails url={link.url} description={link.description} created_at={link.created_at} />
                </section>
            </Suspense>
        );
    } catch (error) {
        console.error("Error resolving params:", error);
        return <div>Error fetching data.</div>;
    }
}
