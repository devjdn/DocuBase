"use client";

import { Search, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useSidebar } from "@/providers/sidebar-provider";
import { Button } from "../ui/button";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { categoryIcons } from "@/lib/docubase";

const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SearchBar() {
    const { isOpen, toggleSidebar } = useSidebar();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        const searchLinks = async () => {
            if(debouncedQuery.trim() === "") {
                setResults([]);
                return;
            }

            const {data: result, error} = await client
                .rpc('search_links_by_name_prefix', {prefix: debouncedQuery});
            

            if(error) {
                console.error("Error searching links:", error);
            } else {
                setResults(result || []);
            }
        }

        searchLinks();
    }, [debouncedQuery, client]);

    if (!isOpen) {
        return(
            <Button
                onClick={toggleSidebar}
                size="icon"
                variant="ghost"
                justify="center"
                className="items-center"
            >
                <Search size={18}/>
            </Button>
        )
    }

    return(
        <div className="relative">
            <form 
            className="border border-input bg-background h-9 px-2 flex items-center gap-2 rounded-md ring-offset-background has-placeholder:text-muted-foreground has-focus-visible:outline-hidden has-focus-visible:ring-1 has-focus-visible:ring-brand has-focus-visible:ring-offset-2" 
            onSubmit={((e: FormEvent) => e.preventDefault())}
            >
                <div>
                    <Search className="stroke-muted-foreground" size={18}/>
                </div>
                <input 
                    className="text-sm w-full flex-1 focus:ring-0 focus:outline-none" 
                    type="text" 
                    placeholder="Search for a link"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query.valueOf() !== "" && (
                    <button className="cursor-pointer" onClick={() => setQuery("")}>
                        <X size={12} strokeWidth={3}/>
                    </button>
                )}
            </form>

            {results.length > 0  && (
                <div className="border border-border rounded-lg p-2 bg-background w-full absolute top-[38px] z-10">
                    <ol className="flex flex-col gap-2">
                        {results.map((result, resultIndex) => (
                           <Button key={resultIndex} asChild variant={"ghost"} size={"default"} justify={"default"}>
                                <Link className="flex gap-2" href={`/links/${result.url_slug}`}>
                                    {categoryIcons[result.category_name]}
                                    <div className="flex flex-col">
                                        <p>{result.name}</p>
                                        <p className="text-muted-foreground text-xs">{result.category_name}</p>
                                    </div>
                                </Link>
                           </Button>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}