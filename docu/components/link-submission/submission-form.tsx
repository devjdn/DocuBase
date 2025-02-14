"use client";

import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { SubmitButton } from "../ui/submit-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { generateUrlSlug, linkSubmissionSchema } from "@/lib/schemas/link-submission-schema";
import clsx from "clsx";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LinkSubmissionForm() {
    const [categories, setCategories] = useState<{id: number; name: string;}[]>([]);
    const [selectedCategory, setCategory] = useState<number | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            const { data , error } = await supabase.from("categories").select("id, name");
            if (error) { 
                console.error(error) 
            } else {
                setCategories(data);
            };
        }
        fetchCategories();
    }, []);

    async function handleSubmit(formData: FormData) {
        if(!selectedCategory) {
            console.log("Select a category");
            return;
        }

        const formValues = {
            name: formData.get("linkName") as string,
            url: formData.get("linkUrl") as string,
            description: formData.get("linkDescription") as string,
            category_id: selectedCategory,
            url_slug: generateUrlSlug(formData.get("linkName") as string)
        }

        const validatedData = linkSubmissionSchema.safeParse(formValues);

        if(!validatedData.success) {
            console.error(`Validation failed. ${validatedData.error.format()}`);
            return;
        }

        const { data, error } = await supabase.from("links").insert([validatedData.data]);
        console.log(data);

        if (error) {
            console.error("Error inserting data:", error);
          } else {
            console.log("Success:", data);
        }
    }
    
    return(
        <form action={handleSubmit} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input name="linkName" placeholder="Name" required/>
            </div>
            <div>
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input name="linkUrl" placeholder="Link URL" required/>
            </div>
            <div>
                <Label htmlFor="linkCategory">Link category</Label>
                <ul className="grid gap-2 grid-flow-col overflow-x-auto styled-scrollbar">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button 
                                type="button"
                                className={clsx(
                                    "whitespace-nowrap grid-rows-2 rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer",
                                    {"bg-primary text-primary-foreground border-none": category.id === selectedCategory}
                                )} 
                                onClick={() => setCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Label htmlFor="linkDescription">Link description</Label>
                <textarea name="linkDescription" placeholder="Link description" className="field-sizing-content flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
            </div>
            <SubmitButton className="w-fit mx-auto cursor-pointer">
                Submit
            </SubmitButton>
        </form>
    );
}