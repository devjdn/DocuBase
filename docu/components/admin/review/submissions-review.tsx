import { SubmittedLinksArray } from "@/app/types/links";
import { SubmissionsContentProvider } from "@/providers/submissions-content-provider";
import { SubmissionsList } from "./submissions-list";

export function SubmissionsReview({submissions}: {
    submissions?: {
        name: any;
        url: any;
        description: any;
        approval_status: any;
        created_at: any;
        user_id: any;
        categories: {
            name: string;
        };
        url_slug: any;
    }[]
}) {
    return(
        <SubmissionsContentProvider>
            <SubmissionsList submissions={submissions}/>
        </SubmissionsContentProvider>
    );
}