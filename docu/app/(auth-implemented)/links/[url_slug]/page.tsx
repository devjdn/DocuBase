import { SingleLink } from "@/app/types/links";
import ControlBar from "@/components/docs-pages/control-bar";
import DeprecationWarning from "@/components/docs-pages/deprecation-warning";
import DocDetails from "@/components/docs-pages/doc-details";
import DocHeader from "@/components/docs-pages/doc-header";
import supabaseClient from "@/utils/supabaseClient";
import { Suspense } from "react";

// export async function generateStaticParams() {
//     const { data: links, error } = await supabaseClient
//         .from("links")
//         .select("name, url_slug, url, categories(name)")
//         .order("category_id", {ascending: true})
//         .overrideTypes<Array<{categories: {name: string}}>>();

//     if (!links) return [];

//     return links?.map((link) => ({
//         category_name: link.categories.name,
//         link_slug: link.url_slug,
//     }));
// }

export default async function LinkPage({ params }: { params: Promise<{ url_slug: string }> }) {
    try {
        const { url_slug } = await params;

        const { data, error } = await supabaseClient
            .from("links")
            .select("id, name, url, description, created_at, is_deprecated, categories(name)")
            .eq("url_slug", url_slug)
            .single()
            .overrideTypes<SingleLink>();

        console.log(data);

        if (error || !data) {
            console.error("Error fetching link data:", error, error.cause, error.message, error.stack);
            return <div>Error fetching data. Link not found.</div>;
        }

        return (
            <Suspense fallback="Loading...">
                <section>
                    <DocHeader category={data.categories.name} name={data.name} />
                    <DocDetails url={data.url} description={data.description} created_at={data.created_at} is_deprecated={data.is_deprecated} />
                    <ControlBar url={data.url} name={data.name} is_deprecated={data.is_deprecated}/>
                    {data.is_deprecated && (
                        <DeprecationWarning/>
                    )}
                </section>
            </Suspense>
        );
    } catch (error) {
        console.error("Error resolving params:", error);
        return <div>Error fetching data.</div>;
    }
}
