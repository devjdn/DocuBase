"use server";

import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from "@clerk/nextjs/server";
import { PageType } from "./types/vault";
import { toast } from "sonner";

export async function submitLink(
	page: Pick<PageType, "name" | "url" | "favourite">,
) {
	const client = await createClerkSupabaseClientSsr();

	try {
		const { userId } = await auth();
		const { name, url, favourite } = page;
		if (userId) {
			const { data, error } = await client.from("pages").insert([
				{
					name: name,
					url: url,
					favourite: favourite,
					user_id: userId,
				},
			]);
			console.log("Success:", data, error);
		}
	} catch (error: any) {
		console.error("Error inserting data:", error);
	}
}

export async function toggleFavourite(favourite: boolean, pageId: string) {
	const client = await createClerkSupabaseClientSsr();

	try {
		const { data, error } = await client
			.from("pages")
			.update({
				favourite: !favourite,
			})
			.eq("id", pageId);

		console.log("Success:", data, error);
	} catch (error: any) {
		console.error("Error updating data:", error);
	}
}

export async function deletePage(pageId: string) {
	const client = await createClerkSupabaseClientSsr();

	try {
		const { data, error } = await client
			.from("pages")
			.delete()
			.eq("id", pageId);
	} catch (error: any) {
		console.error("Error deleting data:", error);
	}
}
