"use client";

import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { SubmitButton } from "../ui/submit-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { generateUrlSlug, linkSubmissionSchema } from "@/lib/schemas/link-submission-schema";
import { Button } from "../ui/button";
import { submitLink } from "@/app/actions";
import { useRouter } from "next/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LinkSubmissionForm() {
    const [categories, setCategories] = useState<{id: number; name: string;}[]>([]);
    const [selectedCategory, setCategory] = useState<number | null>(null);
    const router = useRouter();

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
            url_slug: generateUrlSlug(formData.get("linkName") as string),
            approval_status: "Pending",
        }

        const validatedData = linkSubmissionSchema.safeParse(formValues);

        if(!validatedData.success) {
            console.error(`Validation failed. ${validatedData.error}`);
            return;
        }

        submitLink(validatedData.data);
        console.log(validatedData.data);
    }
    
    return(
        <form action={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
                <Label htmlFor="name">Name</Label>
                <Input name="linkName" placeholder="Name" required/>
            </div>
            <div className="flex flex-col">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input name="linkUrl" placeholder="Link URL" required/>
            </div>
            <div className="styled-scrollbar flex flex-col">
                <Label htmlFor="linkCategory">Link category</Label>
                <ul className="grid gap-2 grid-flow-col overflow-x-auto styled-scrollbar">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Button
                                type="button"
                                variant={selectedCategory === category.id ? "default" : "secondary"}
                                size={"default"}
                                onClick={() => setCategory(category.id)}
                            >
                                {category.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col">
                <Label htmlFor="linkDescription">Link description</Label>
                <textarea name="linkDescription" placeholder="Link description" className="field-sizing-content flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
            </div>
            <SubmitButton className="mx-auto cursor-pointer">
                Submit
            </SubmitButton>
        </form>
    );
}