import clsx from "clsx";
import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarNavProps } from "./sidebar-nav";
import Link from "next/link";

export default function SidebarLinkContent({url_slug, name, url}: {url_slug: string; name: string; url: string;}) {
    const pathname = usePathname();

    return(
        <div className={clsx(
            "flex flex-row items-center justify-between group text-sm *:px-3 *:py-2 rounded-md",
            {"text-muted-foreground hover:text-primary": !pathname.includes(url_slug)},
            {"text-link-foreground bg-link": pathname.includes(url_slug)}
        )}>
            <Link
            href={`/docs/${url_slug}`}
            className="grow"
            >
                <p>{name}</p>
            </Link>
            <a target="_blank" className={clsx(
                "transition-colors",
                {"invisible group-hover:visible stroke-muted-foreground hover:stroke-primary": !pathname.includes(url_slug)},
                {"visible stroke-link-foreground": pathname.includes(url_slug)}
            )} href={url}
            >
                <ExternalLink size={18} className="stroke-inherit"/>
            </a>
        </div>
    );
}