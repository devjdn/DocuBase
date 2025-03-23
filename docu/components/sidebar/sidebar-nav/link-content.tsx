import clsx from "clsx";
import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarLinkContent({url_slug, name, url}: {url_slug: string; name: string; url: string;}) {
    const pathname = usePathname();

    return(
        <div className={clsx(
            "flex flex-row items-center justify-between group text-sm *:px-3 *:py-2 rounded-lg transition-all",
            {"text-muted-foreground hover:text-primary": !pathname.match(url_slug)},
            {"text-link-foreground bg-link shadow-inner shadow-brand/20": pathname.match(url_slug)}
        )}>
            <Link
            href={`/links/${url_slug}`}
            className="grow"
            >
                <p>{name}</p>
            </Link>
            <a target="_blank" className={clsx(
                "transition-colors",
                {"invisible group-hover:visible stroke-muted-foreground hover:stroke-primary": !pathname.match(url_slug)},
                {"visible stroke-link-foreground": pathname.match(url_slug)}
            )} href={url}
            >
                <ExternalLink size={18} className="stroke-inherit"/>
            </a>
        </div>
    );
}