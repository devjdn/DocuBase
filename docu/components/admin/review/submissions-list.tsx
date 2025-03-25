"use client";

import { SubmittedLinksArray } from "@/app/types/links";
import { Button } from "@/components/ui/button";
import { useSubmissions } from "@/providers/submissions-content-provider";
import { useState } from "react";

interface SubmissionsListProps {
    children: React.ReactNode;
}

function SubmissionsList({submissions}: {submissions?: {
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
}[]}) {
    const {isOpen, setIsOpen, toggleContent, state} = useSubmissions();

    return(
        <ul className="grid auto-rows-auto">
            {submissions && submissions.map((submission, submissionIndex) => (
                <div></div>
            ))}
        </ul>
    );
}

function SubmissionsListItem({children}: SubmissionsListProps) {
    return(
        <li className="border-b border-b-border">
            {children}
        </li>
    );
}

function SubmissionsListItemHeader({children}: SubmissionsListProps) {
    return(
        <Button variant={"ghost"} asChild >
            <header className="flex justify-between gap-4 align-center">
                {children}
            </header>
        </Button>
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
    SubmissionsListItemHeader,
    SubmissionsListItemContent
}