"use client";

import { SubmittedLinksArray } from "@/app/types/links";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import * as React from "react";

interface SubmissionsListProps {
    children: React.ReactNode;
}

function SubmissionsList({submissions}: {
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
        <ul className="grid auto-rows-auto">
            {submissions && submissions.map((submission, submissionIndex) => (
                <SubmissionsListItem key={submissionIndex} linkName={submission.name}>

                    <SubmissionsListItemContent>
                        <></>
                    </SubmissionsListItemContent>
                </SubmissionsListItem>
            ))}
        </ul>
    );
}

function SubmissionsListItem({children, linkName, ...props}: SubmissionsListProps & {linkName: string}) {
    const [isContentOpen, setIsContentOpen] = React.useState<boolean>(false);
    const state = isContentOpen ? "open" : "closed";

    const toggleContent = () => {
        setIsContentOpen((prev) => !prev);
    }

    return(
        <li className="border-b border-b-border group" {...props} data-state={state}>
            <header className="flex justify-between gap-4 items-center py-4">
                <p>{linkName}</p>

                <Button variant={"ghost"} justify={"center"} size={"icon"} onClick={toggleContent}>
                    <ChevronRight className={
                        clsx(
                            "rotate-0 transition-transform",
                            {"rotate-90": state === "open"}
                        )
                    } size={18} />
                </Button>
            </header>
            {children}
        </li>
    );
}

function SubmissionsListItemContent({children}: SubmissionsListProps) {

    return(
        <div className="animate-accordion-in">
            {children}
        </div>
    );
}

export {
    SubmissionsList,
    SubmissionsListItem,
    SubmissionsListItemContent
}