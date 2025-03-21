import { SubmittedLinksArray } from "@/app/types/links";
import { SubmissionsContentProvider } from "@/providers/submissions-content-provider";

export function SubmissionsReview({children, submissions}: {children: React.ReactNode, submissions?: SubmittedLinksArray}) {
    return(
        <SubmissionsContentProvider>
            {children}
        </SubmissionsContentProvider>
    );
}