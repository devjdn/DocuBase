"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ExternalLink } from "lucide-react";

export interface SidebarNavProps {
    links: {
      id: number;
      name: string;
      url: string;
      description: string;
      created_at: string;
      link_category: "Frameworks" | "Libraries" | "Databases" | "Authentication" | "Other";
      url_slug: string;
    }[];
}
export interface CategoryProps {
    category: string;
    links: {
        id: number;
        name: string;
        url: string;
        url_slug: string;
    }[]
}

export const groupLinksByCategory = (links: SidebarNavProps['links']) => {
    // The reduce method is used to accumulate a result
    // In this case, it is an object
    return links.reduce((acc, link) => {

        // If a link category doesn't exist
        // Initialize that category as an empty array
        if(!acc[link.link_category]) {
            acc[link.link_category] = [];
        }

        // Uses the push method to add the current link 
        // to its corresponding category array
        acc[link.link_category].push(link);
        return acc;

        // The initial value of `acc` is an empty object, typed as `Record<string, SidebarNavProps['links']>`.
        // `acc` will become an object where the keys are strings
        // and the values are arrays of links
    }, {} as Record<string, SidebarNavProps['links']>);
};

export function SidebarNavCategory({category, links}: CategoryProps) {
    const pathname = usePathname();
    return(
        <div>
            <p className="text-sm text-[hsl(var(--brand))] mb-2">{category}</p>
            <ul className="border-l border-border px-2">
                {links.map((link) => (
                    <li className={clsx(
                        "flex flex-row gap-2 items-center group",
                    )}
                    key={link.id}
                    >
                        <Link className={clsx(
                            "text-sm px-3 py-2 rounded-md grow transition-colors",
                            {"text-muted-foreground hover:text-primary": !pathname.includes(link.url_slug)},
                            {"text-link-foreground bg-link": pathname.includes(link.url_slug)}
                        )}
                        href={`/documentation/${link.url_slug}`}
                        >
                            <p>{link.name}</p>
                        </Link>
                        
                        <a target="_blank" className={clsx(
                            "stroke-muted-foreground hover:stroke-primary transition-colors",
                            {"invisible group-hover:visible": !pathname.includes(link.url_slug)},
                            {"visible": pathname.includes(link.url_slug)}
                        )} href={link.url}
                        >
                            <ExternalLink size={18} className="stroke-inherit"/>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function SidebarNav({links}: SidebarNavProps) {
    const pathname = usePathname();
    const groupedLinks = groupLinksByCategory(links);

    return(
        <nav className="overflow-y-auto flex flex-col gap-3 h-full py-10">
            {Object.entries(groupedLinks).map(([category, links], index) => (
                <SidebarNavCategory key={index} category={category} links={links}/>
            ))}
        </nav>
    );
}