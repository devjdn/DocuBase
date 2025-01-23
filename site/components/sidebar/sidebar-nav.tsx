"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

export default function SidebarNav({links}: SidebarNavProps) {
    const pathname = usePathname();
    const groupedLinks = groupLinksByCategory(links);

    return(
        <nav className="overflow-y-auto flex flex-col gap-3 h-full">
            {Object.entries(groupedLinks).map(([category, links], index) => (
                <div key={index}>
                    <p className="text-sm text-[hsl(var(--brand))] mb-2">{category}</p>
                    <ul>
                        {links.map((link) => (
                            <li className={clsx(
                                "px-3 py-2 rounded-md",
                                {"bg-link": pathname.includes(link.url_slug)}
                            )}
                            key={link.id}
                            >
                                <Link className={clsx(
                                    "text-sm",
                                    {"text-muted-foreground hover:text-primary": !pathname.includes(link.url_slug)},
                                    {"text-link-foreground": pathname.includes(link.url_slug)}
                                )}
                                href={`/documentation/${link.url_slug}`}
                                >
                                    <p>{link.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
}