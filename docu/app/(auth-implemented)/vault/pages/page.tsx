import { Button } from "@/components/ui/button";
import { NewPageForm } from "@/components/ui/forms/new-page";
import { ChevronsUpDown } from "lucide-react";
import { PageType } from "@/app/types/vault";
import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import PagesCard from "@/components/ui/cards/pages-card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import PagesRealtime from "@/components/ui/realtime/pages-realtime";

export default async function PagesPage() {
	const client = await createClerkSupabaseClientSsr();
	const { userId } = await auth();

	const { data: pages } = await client
		.from("pages")
		.select("*")
		.eq("user_id", userId)
		.overrideTypes<PageType[]>();

	const favouritePages = pages?.filter((page) => page.favourite);
	const otherPages = pages?.filter((page) => !page.favourite);

	return (
		<>
			<header className="flex justify-between items-center gap-4 mb-8">
				<div>
					<h1 className="text-3xl font-regular">Pages</h1>
				</div>
				<nav className="flex items-center gap-2">
					{/**
					 * Here there will be a list of controls
					 *
					 * Examples:
					 * Add new page
					 * Filter pages (by collection, by tags, by date) [dropdown]
					 * Change view (grid, list)
					 */}
					<NewPageForm />
				</nav>
			</header>

			{/* <PagesRealtime serverPages={pages ?? []} /> */}

			<main>
				{favouritePages && favouritePages.length > 0 && (
					<Collapsible className="mb-4">
						<CollapsibleTrigger asChild>
							<Button variant="ghost">
								<span>Favourites</span>
								<ChevronsUpDown />
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent className="mt-4 border-b border-border pb-4">
							<ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
								{favouritePages?.map((page, i) => (
									<li key={i}>
										<Link href={page.url} target="_blank">
											<PagesCard {...page} />
										</Link>
									</li>
								))}
							</ul>
						</CollapsibleContent>
					</Collapsible>
				)}

				<section className="flex flex-col gap-4">
					<ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
						{otherPages?.map((page, i) => (
							<li key={i}>
								<Link href={page.url} target="_blank">
									<PagesCard {...page} />
								</Link>
							</li>
						))}
					</ul>
				</section>
			</main>
		</>
	);
}
