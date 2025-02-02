"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const topLinks = [
    {name: 'Docs', href: '/docs'},
    {name: 'Submit a link', href: '/submit-a-link'},
]

export default function HeaderNav() {
    const pathname = usePathname();

    return(
        <nav>
            <ul className="hidden ml-16 md:flex flex-col items-center justify-start gap-6 md:flex-row">
                {topLinks.map((link, index) => (
                    <li key={index}>
                        <Link className={clsx(
                            "text-sm transition-colors",
                            {"text-muted-foreground hover:text-primary": !pathname.includes(link.href)},
                            {"text-link-foreground": pathname.includes(link.href)}

                        )} href={link.href}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}