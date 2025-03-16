'use server';

import { createClerkSupabaseClientSsr } from "@/utils/clerkSupabase";
import { auth } from '@clerk/nextjs/server'
import { SingleLinkSubmission } from "./types/links";

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