// import BreadcrumbNav from "@/components/nav/breadcrumb";
import Heading1 from "@/components/typography/headings"

export default function DocumentationPage(){
    return(
        <section className="p-10">
            {/* <BreadcrumbNav/> */}
            <Heading1 text={"Documentation Library"}/>
            <p className="max-w-[80ch] text-[hsl(var(--muted-foreground))]">This is where all of the documentation links in DocuBase are located. Filter by category, or simply search for the specific link you&apos;re looking for.</p>
        </section>
    );
}