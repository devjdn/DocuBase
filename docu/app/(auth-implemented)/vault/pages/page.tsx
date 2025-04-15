import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { PagesForm } from "@/components/ui/forms/pages";
import { PlusCircle, Star } from "lucide-react";
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

	return (
		<>
			<header className="flex justify-between items-center gap-4">
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
					<Dialog>
						<DialogTrigger asChild>
							<Button variant={"default"}>
								<PlusCircle />
								<span>Add new</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add new page</DialogTitle>
								<DialogDescription>
									Add a new page to your vault. This allows
									you to save websites that you visit
									frequently, all in one place.
								</DialogDescription>
							</DialogHeader>

							{/**
							 * This is the form that's used to add a new page to the vault.
							 */}
							<PagesForm />
						</DialogContent>
					</Dialog>
				</nav>
			</header>

			<section className="flex flex-col gap-4">
				<ul className="grid gap-4">
					{pages?.map((page, i) => (
						<li key={i}>
							<Link href={page.url} target="_blank">
								<Card>
									<CardHeader>
										<div className="flex flex-row justify-between">
											<CardTitle>{page.name}</CardTitle>
											{page.favourite && (
												<Badge variant={"outline"}>
													<Star className="size-4 fill-brand stroke-brand" />
												</Badge>
											)}
										</div>
									</CardHeader>
									<CardContent>
										<p>{page.url}</p>
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
