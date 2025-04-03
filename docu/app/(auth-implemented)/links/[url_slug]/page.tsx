import PostHogClient from "@/app/posthog";
import { SingleLink } from "@/app/types/links";
import ControlBar from "@/components/docs-pages/control-bar";
import DeprecationWarning from "@/components/docs-pages/deprecation-warning";
import { Heading1 } from "@/components/typography/headings";
import Timestamp from "@/components/typography/timestamp";
import { Badge } from "@/components/ui/badge";
import supabaseClient from "@/utils/supabaseClient";
import { Suspense } from "react";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
    const { data: links } = await supabaseClient
        .from("links")
        .select("url_slug")
        .overrideTypes<Array<{categories: {name: string}}>>();

    if (!links) return [];

    return links?.map((link) => ({
        url_slug: String(link.url_slug),
    }));
}

export default async function LinkPage({ params }: { params: Promise<{ url_slug: string }> }) {
    const posthog = PostHogClient();
    
    try {
        const { url_slug } = await params;

        const { data, error } = await supabaseClient
            .from("links")
            .select("id, name, url, description, created_at, is_deprecated, categories(name)")
            .eq("url_slug", url_slug)
            .single()
            .overrideTypes<SingleLink>();

        if (error || !data) {
            console.error("Error fetching link data:", error, error.cause, error.message, error.stack);
            return <div>Error fetching data. Link not found.</div>;
        }

        return (
            <Suspense fallback="Loading...">
                <section className="max-w-prose">
                    <header className="mb-4">
                        <Badge
                                variant={"outline"}
                                className="mb-4"
                        >
                            <p>{data.categories.name}</p>
                        </Badge>
                        <Heading1 text={data.name}/>
                    </header>   

                    <div className="flex flex-col gap-2">
                        <a href={data.url} target="_blank" className="mb-2 text-link-foreground hover:underline">{data.url}</a>
                        <p className="text-muted-foreground max-w-prose mb-4">{data.description}</p>
                        <Timestamp timestamp={data.created_at} />
                    </div>

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
