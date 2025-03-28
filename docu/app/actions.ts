'use server';

import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from '@clerk/nextjs/server'
import { SingleLinkSubmission } from "./types/links";
import { checkRole } from "@/utils/roles";

export async function submitLink(link: SingleLinkSubmission) {
    const client = await createClerkSupabaseClientSsr();

    try{
        const { userId } = await auth();
        const {name, approval_status, url, url_slug, description, category_id} = link;
        if (userId) {
            const { data, error } = await client.from("submissions").insert([{
                name: name,
                url: url,
                description: description,
                category_id: category_id,
                url_slug: url_slug,
                approval_status: approval_status,
                user_id: userId
            }]);
            console.log("Success:", data, error);
        }

    } catch (error: any) {
        console.error("Error inserting data:", error);
    }

}

export async function markAsDeprecated(name: string) {
    const client = await createClerkSupabaseClientSsr();

    try{
        const isAdmin = await checkRole("admin");

        if (isAdmin) {
            const { data, error } = await client.from("links").update({ is_deprecated: true }).eq("name", name);
            console.log("Success:", data, error?.code, error?.details, error?.name, error?.message, error?.stack);
        }
    } catch (error: any) {
        console.error("Error updating data:", error);
    }
}