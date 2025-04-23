import { NewPageForm } from "@/components/ui/forms/new-page";
import { PageType } from "@/app/types/vault";
import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from "@clerk/nextjs/server";
import PagesRealtime from "@/components/ui/realtime/pages-realtime";

export default async function PagesPage() {
	const client = await createClerkSupabaseClientSsr();
	const { userId } = await auth();

	const { data: pages } = await client
		.from("pages")
		.select("*")
		.eq("user_id", userId)
		.overrideTypes<PageType[]>();

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

			<PagesRealtime serverPages={pages ?? []} />
		</>
	);
}
