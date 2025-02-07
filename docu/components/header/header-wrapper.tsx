import HeaderAuth from "../header-auth";
import Link from "next/link";
import { ThemeSwitcher } from "../../../site/components/theme-switcher";
import { FileText } from "lucide-react";
import GithubStar from "../buttons/github-star";

export default function HeaderWrapper() {
    return(
        <header className="bg-background/50 z-50 backdrop-blur-xs w-full border-b border-b-foreground/10 sticky top-0 left-0">
            <nav className="w-full flex justify-center">
                <div className="w-full flex justify-between items-center py-3 px-5">
                    <div className="flex gap-4 items-center">
                        <Link href={"/"}>
                            <div className="flex flex-row items-center font-semibold text-lg leading-none">
                                <FileText className="stroke-[hsl(var(--brand))]"/>
                                DocuBase
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <HeaderAuth />
                        <GithubStar/>
                    </div>
                </div>
            </nav>
        </header>
    );
}