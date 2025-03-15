import WindowBtn from "@/components/buttons/window-btn";
import { Heading1, Heading3 } from "@/components/typography/headings";
import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { LinkSubmissionTypes } from "../types/links";
// import { SubmissionTable, SubmissionTableBody, SubmissionTableColumn, SubmissionTableHeader, SubmissionTableRow } from "@/components/admin/submission-table";

export default async function AdminPage() {
    const isAdmin = await checkRole("admin");
    if(!isAdmin) {
        redirect("/links");
    }

    let submissions: LinkSubmissionTypes[] = [];
    // Remember that I have to await this function as it returns a promise, not an actual result
    const client = await createClerkSupabaseClientSsr();

    try {
        const { data, error } = await client.from("submissions").select("name, url, description, approval_status, created_at, user_id, categories (name)").order("created_at", { ascending: false });
        console.log(data);
        submissions = data ?? []; // If there are no submissions, data will be null
    } catch (error) {
        console.error("An error has occurred: ", error);
        console.log("An error has occurred: ", error);
    }

    const pendingCount = submissions?.filter((submissions) => submissions.approval_status === "Pending").length;

    const tableHeadingsMap: Record<string, string> = {
        name: "Name",
        url: "URL",
        description: "Description",
        approval_status: "Approval status",
        created_at: "Submitted at",
        user_id: "User ID",
        categories: "Category",
    };

    return(
        <>

        <header className="block w-full border-b border-b-border">
            <WindowBtn/>
            <Heading1 className="mt-2" text="Admin Dashboard"/>
        </header>

        <div className="grid grid-cols-4 gap-4">
            <article className="bg-muted p-6 rounded-2xl">
                <p className="text-sm text-muted-foreground">Pending submissions</p>
                <Heading1 text={pendingCount.toString()}/>
            </article>
        </div>

        {/* <SubmissionTable>
            <SubmissionTableHeader>
                {Object.keys(submissions[0]).map((submissionKey, index) => (
                    <SubmissionTableColumn key={index}>
                        <p>{tableHeadingsMap[submissionKey] || submissionKey}</p>
                    </SubmissionTableColumn>
                ))}
            </SubmissionTableHeader>
            <SubmissionTableBody>
                {submissions.map((submission, index) => (
                    <SubmissionTableRow key={index}>
                        <SubmissionTableColumn>
                            <p>{submission.name}</p>
                        </SubmissionTableColumn>
                        <SubmissionTableColumn>
                            <p>{submission.url}</p>
                        </SubmissionTableColumn>
                        <SubmissionTableColumn>
                            <p>{submission.description}</p>
                        </SubmissionTableColumn>
                        <SubmissionTableColumn>
                            <p>{submission.approval_status}</p>
                        </SubmissionTableColumn>
                        <SubmissionTableColumn>
                            <p>{submission.created_at}</p>
                        </SubmissionTableColumn>
                        <SubmissionTableColumn>
                            <p>{submission.user_id}</p>
                        </SubmissionTableColumn>
                        <SubmissionTableColumn>
                            <p>{(Array.isArray(submission.categories) ? submission.categories.map((category) => category.name) : ["N/A"]).join(", ")}</p>
                        </SubmissionTableColumn>
                    </SubmissionTableRow>
                ))}
            </SubmissionTableBody>
        </SubmissionTable> */}


        </>
    );
}