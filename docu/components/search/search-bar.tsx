"use client";

import { Search, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSidebar } from "@/providers/sidebar-provider";
import { Button } from "../ui/button";
import Link from "next/link";
import { categoryIcons } from "@/lib/docubase";
import supabaseClient from "@/utils/supabaseClient";

const INPUT_FOCUS_SHORTCUT = "k";

export default function SearchBar() {
    const { isOpen, toggleSidebar } = useSidebar();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [results, setResults] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

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

            const {data: result, error} = await supabaseClient
                .rpc('search_links_by_name_prefix', {prefix: debouncedQuery});
            

            if(error) {
                console.error("Error searching links:", error);
            } else {
                setResults(result || []);
            }
        }

        searchLinks();
    }, [debouncedQuery, supabaseClient]);

    useEffect(() => {
        const handleInputFocus = (event: KeyboardEvent) => {
            if (event.key === INPUT_FOCUS_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                inputRef.current?.focus();
            }
        }

        window.addEventListener("keydown", handleInputFocus);

        return () => {
            window.removeEventListener("keydown", handleInputFocus);
        }

    }, []);

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
                    ref={inputRef}
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
                <div className="border border-border rounded-lg p-2 bg-popover w-full absolute top-[38px] z-10">
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