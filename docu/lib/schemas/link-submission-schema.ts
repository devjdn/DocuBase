import { z } from "zod";

export const linkSubmissionSchema = z.object({
    name: z.string().min(1),
    url: z.string().url("Invalid URL format").min(1),
    description: z.string().min(15).max(350),
    category_id: z.number().min(1),
    url_slug: z.string().min(1),
});

export function generateUrlSlug(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")  // Replace spaces with dashes
        .replace(/[.?!,;]/g, ""); // Remove punctuation
}