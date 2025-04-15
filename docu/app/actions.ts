"use server";

import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from "@clerk/nextjs/server";
import { PageType } from "./types/vault";

export async function submitLink(page: PageType) {
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
