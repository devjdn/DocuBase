import { Button } from "@/components/ui/button";
import { NewPageForm } from "@/components/ui/forms/new-page";
import { Star } from "lucide-react";
import { PageType } from "@/app/types/vault";
import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function PagesPage() {
	const client = await createClerkSupabaseClientSsr();
	const { userId } = await auth();

	const { data: pages } = await client
		.from("pages")
		.select("*")
		.eq("user_id", userId)
		.overrideTypes<PageType[]>();

	console.log(pages);

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

			{favouritePages && favouritePages.length > 0 && (
				<section className="flex flex-col gap-4 border-b border-border pb-4">
					<h2 className="text-lg font-medium">Favourites</h2>
					<ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
						{favouritePages?.map((page, i) => (
							<li key={i}>
								<Link href={page.url} target="_blank">
									<Card>
										<CardHeader>
											<div className="flex flex-row justify-between">
												<CardTitle>
													{page.name}
												</CardTitle>
												{page.favourite && (
													<Badge
														variant={"favourite"}
													>
														<Star className="size-4 fill-brand stroke-brand" />
													</Badge>
												)}
											</div>
										</CardHeader>
										<CardContent className="truncate">
											<p className="truncate text-sm text-muted-foreground">
												{page.url}
											</p>
										</CardContent>
									</Card>
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}

			<section className="flex flex-col gap-4">
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
					{otherPages?.map((page, i) => (
						<li key={i}>
							<Link href={page.url} target="_blank">
								<Card>
									<CardHeader>
										<CardTitle>{page.name}</CardTitle>
									</CardHeader>
									<CardContent className="truncate">
										<p className="truncate text-sm text-muted-foreground">
											{page.url}
										</p>
									</CardContent>
								</Card>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
