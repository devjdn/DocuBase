import HeaderAuth from "../header-auth";
import Link from "next/link";
import { ThemeSwitcher } from "../theme-switcher";
import HeaderNav from "./header-nav";
import { FileText } from "lucide-react";

export default function HeaderWrapper() {
    return(
        <header className="w-full border-b border-b-foreground/10">
            <nav className="w-full flex justify-center">
                <div className="w-full flex justify-between items-center py-3 px-5">
                    <div className="flex gap-16 items-center">
                        <div className="flex items-center font-semibold text-lg">
                            <Link href={"/"}>
                                <div className="flex flex-row">
                                    {/* <FileJson2Icon/> */}
                                    <FileText className="stroke-[hsl(var(--brand))]"/>
                                    DocuBase
                                </div>
                            </Link>
                        </div>

                        <HeaderNav/>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <HeaderAuth />
                    </div>
                </div>
            </nav>
        </header>
    );
}