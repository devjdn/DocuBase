'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { formatUrlSegment } from "@/utils/format-url-segment";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbNav() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return(
        <nav>
            <ol className="flex flex-row items-center">
                {segments.map((segment, index) => {
                    const href = '/' + segments.slice(0, index + 1).join('/');
                    return(
                        <li className="flex flex-row items-center" key={index}>
                            {index + 1 !== segments.length ? (
                                <>
                                    <Link href={href}>{formatUrlSegment(segment)}</Link>
                                    
                                </>
                            ) : (
                                <span>{formatUrlSegment(segment)}</span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    );
}