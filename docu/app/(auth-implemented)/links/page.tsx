import { Heading1, Heading2 } from "@/components/typography/headings"
import PostHogClient from '@/app/posthog';

export default function DocumentationPage(){
    const posthog = PostHogClient();

    return(
        <section className="flex flex-col gap-10 max-w-prose">
            <div className="py-2 px-3 rounded-lg bg-warning text-warning-foreground">
                <p>
                    Documentation pages are unstable on mobile. This will be fixed in the future. For now, please stick to desktop usage of DocuBase.
                </p>
            </div>
            <div>
                <Heading1 text={"Documentation Library"}/>
                <p className="text-muted-foreground">
                    This is where all of the documentation links in DocuBase are located. Filter by category, or simply search for the specific link you&apos;re looking for.
                </p>
            </div>
            <div>
                <Heading2 text={"The state of link descriptions"}/>
                <p className="text-muted-foreground">
                    DocuBase is strongly reliant on community contribution to grow the database and improve existing information. When I created this database, I inserted some less than helpful descriptions, you as a community can improve these by editing them and sending a request for it to be approved.
                </p>
            </div>
            <div>
                <Heading2 text={"Why I built DocuBase"}/>
                <p className="text-muted-foreground">
                    I built DocuBase purely due to the fact that I hate searching Google for official documenation. Yeah, that may seem lazy. Yeah, I could just bookmark links. But searching Google is repetitive, and bookmarks get crowded very quickly with links that aren&apos;t relevant to web dev.
                </p>
            </div>
        </section>
    );
}