"use client";

import Timestamp from "@/components/ui/typography/timestamp";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import * as React from "react";

interface SubmissionsListProps {
	children?: React.ReactNode;
	className?: string;
}

function SubmissionsList({
	submissions,
}: {
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
	}[];
}) {
	return (
		<ul className="grid auto-rows-auto">
			{submissions &&
				submissions.map((submission, submissionIndex) => (
					<SubmissionsListItem
						className="flex flex-col gap-2"
						key={submissionIndex}
						linkName={submission.name}
					>
						<div>
							<strong>Submission URL:</strong>
							<p>{submission.url}</p>
						</div>
						<div>
							<strong>Category:</strong>
							<p>{submission.categories.name}</p>
						</div>
						<div>
							<strong>Description:</strong>
							<p>{submission.description}</p>
						</div>
						<div>
							<strong>Created at:</strong>
							<Timestamp timestamp={submission.created_at} />
						</div>
					</SubmissionsListItem>
				))}
		</ul>
	);
}

function SubmissionsListItem({
	children,
	className,
	linkName,
	...props
}: SubmissionsListProps & { linkName: string }) {
	const [isContentOpen, setIsContentOpen] = React.useState<boolean>(false);
	const state = isContentOpen ? "open" : "closed";

	const toggleContent = () => {
		setIsContentOpen((prev) => !prev);
	};

	return (
		<li
			className={clsx(` group ${className}`, {
				"bg-secondary rounded-lg": state === "open",
			})}
			{...props}
			data-state={state}
		>
			<header className="">
				<Button
					variant={"ghost"}
					className="p-4 w-full flex flex-row justify-between items-center"
					onClick={toggleContent}
				>
					<p>{linkName}</p>
					<ChevronRight
						className={clsx("rotate-0 transition-transform", {
							"rotate-90": state === "open",
						})}
						size={18}
					/>
				</Button>
			</header>
			<SubmissionsListItemContent
				data-state={state}
				className={
					"px-4 border-t border-t-border overflow-hidden data-[state=open]:flex data-[state=closed]:hidden"
				}
			>
				{children}
			</SubmissionsListItemContent>
		</li>
	);
}

function SubmissionsListItemContent({
	children,
	className,
	...props
}: SubmissionsListProps & { className?: string }) {
	return (
		<div className={`${className}`} {...props}>
			{children}
		</div>
	);
}

export { SubmissionsList, SubmissionsListItem, SubmissionsListItemContent };
