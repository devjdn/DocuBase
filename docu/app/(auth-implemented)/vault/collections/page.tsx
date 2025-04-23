import { CollectionType } from "@/app/types/vault";
import { NewCollectionForm } from "@/components/ui/forms/new-collection";
import CollectionsRealtime from "@/components/ui/realtime/collections.realtime";
import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from "@clerk/nextjs/server";

export default async function CollectionsPage() {
	const client = await createClerkSupabaseClientSsr();
	const { userId } = await auth();

	const { data: collections } = await client
		.from("collections")
		.select("*")
		.eq("user_id", userId)
		.overrideTypes<CollectionType[]>();

	return (
		<>
			<header className="flex justify-between items-center gap-4 mb-8">
				<div>
					<h1 className="text-3xl font-regular">Collections</h1>
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

					<NewCollectionForm />
				</nav>
			</header>

			<CollectionsRealtime serverCollections={collections ?? []} />
		</>
	);
}
