"use client";

import { Sun, Moon, Laptop } from "lucide-react";
import { SubmitButton } from "../submit-button";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { linkCategories } from "@/lib/docubase";
import { useState } from "react";
import { z } from "zod";


export default function LinkSubmissionForm() {
    const [category, setCategory] = useState<string>("");
    
    return(
        <form action="" className="flex flex-col gap-4">
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
                    {linkCategories.map((category, index) => (
                        <li key={index}>
                            <button 
                                type="button"
                                className="whitespace-nowrap grid-rows-2 rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer"
                                value={category}
                                onClick={() => setCategory(category)}
                            >
                                {category}
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