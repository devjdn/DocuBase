import WindowBtn from "@/components/buttons/window-btn";
import { Heading1, Heading3 } from "@/components/typography/headings";
import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { SubmittedLinksArray, SingleLinkSubmission } from "../types/links";
import StatCard from "@/components/admin/stat-card";
// import { SubmissionTable, SubmissionTableBody, SubmissionTableColumn, SubmissionTableHeader, SubmissionTableRow } from "@/components/admin/submission-table";

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
    const isAdmin = await checkRole("admin");
    if(!isAdmin) {
        redirect("/links");
    }

    // let submissions: SubmittedLinksArray;
    // Remember that I have to await this function as it returns a promise, not an actual result
    const client = await createClerkSupabaseClientSsr();

    try {
        const { data: submissions, error } = await client.from("submissions")
            .select("name, url, description, approval_status, created_at, user_id, categories (name)")
            .order("created_at", { ascending: false })
            .overrideTypes<Array<{categories: {name: string}}>>();

        console.log(submissions);

        const pendingCount = submissions?.filter((submissions) => submissions.approval_status === "Pending").length;

        return(
            <>
    
            <header className="block w-full border-b border-b-border">
                <WindowBtn/>
                <Heading1 className="mt-2" text="Admin Dashboard"/>
            </header>
    
            <div className="flex flex-row gap-4">
                <StatCard heading={"Pending submissions"} value={(pendingCount ?? 0).toString()}/>
            </div>
    
            </>
        );
    } catch (error) {
        console.error("An error has occurred: ", error);
        console.log("An error has occurred: ", error);
    }
}