import { SubmittedLinksArray } from "@/app/types/links";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SubmissionsListProps {
    children: React.ReactNode;
}

function SubmissionsList({children}: SubmissionsListProps) {
    return(
        <ul className="grid auto-rows-auto">
            {children}
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