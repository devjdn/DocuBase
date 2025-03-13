import { Heading1 } from "@/components/typography/headings";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const isAdmin = await checkRole("admin");
    if(!isAdmin) {
        redirect("/links");
    }

    return(
        <header className="block w-full px-6 py-8 md:px-16 md:py-16">
            <Heading1 text="Admin Dashboard"/>
        </header>
    );
}