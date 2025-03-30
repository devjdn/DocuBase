import WindowBtn from "@/components/buttons/window-btn";
import { Heading1, Heading2, Heading3} from "@/components/typography/headings";
import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import StatCard from "@/components/admin/stat-card";
import { Suspense } from "react";
import { SubmissionsList } from "@/components/admin/review/submissions-list";
import { currentUser, auth } from "@clerk/nextjs/server";

const columnKeysMap: Record<string, string> = {
    name: "Name",
    url: "URL",
    description: "Description",
    approval_status: "Approval status",
    created_at: "Submitted at",
    user_id: "User ID",
    categories: "Category",
};

export default async function AdminPage() {
    const user = await currentUser();

    const isAdmin = await checkRole("admin");
    if(!isAdmin) {
        redirect("/links");
    }

    // Remember that I have to await this function as it returns a promise, not an actual result
    const client = await createClerkSupabaseClientSsr();

    const { data: submissions, error } = await client.from("submissions")
            .select("name, url, url_slug, description, approval_status, created_at, user_id, categories (name)")
            .order("created_at", { ascending: false })
            .overrideTypes<Array<{categories: {name: string}}>>();

    console.log(submissions);

    const pendingSubmissions = submissions?.filter((submissions) => submissions.approval_status === "Pending");

    return(
        <>

        <header className="block w-full border-b border-b-border">
            <Heading1 text="Admin Dashboard"/>
            <p>Hello, {user?.username}.</p>
        </header>

        <section className="flex flex-col gap-4">
            <Heading2 text={"Submission Review"}/>

            <Suspense fallback="Loading pending submissions">
                <div className="flex flex-row gap-4">
                    <StatCard heading={"Pending submissions"} value={(pendingSubmissions?.length ?? 0).toString()}/>
                </div>
            </Suspense>

            <Suspense fallback="Loading submissions">
                <SubmissionsList submissions={pendingSubmissions}/>
            </Suspense>
        </section>
        </>
    );
}