import Link from "next/link";
import { FileText } from "lucide-react";
import GithubStar from "../buttons/github-star";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
import { Button } from "../ui/button";
import { ThemeSwitcher } from "../ui/theme-switcher";

export default function HeaderWrapper() {
    return(
        <header className="bg-background/50 z-50 backdrop-blur-xs w-full border-b border-b-foreground/10 sticky top-0 left-0">
            <nav className="w-full flex justify-center">
                <div className="w-full flex justify-between items-center py-3 px-5">
                    <div className="flex gap-4 items-center">
                        <Link href={"/"}>
                            <div className="flex flex-row items-center font-semibold text-lg leading-none">
                                <FileText className="stroke-[hsl(var(--brand))]"/>
                                <span>DocuBase</span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <ThemeSwitcher/>
                        <SignedOut>
                          <SignInButton mode="modal">
                            <Button size="default" variant={"default"}>Sign In</Button>
                          </SignInButton>
                        </SignedOut>
                        <SignedIn>
                          <UserButton />
                        </SignedIn>
                        <GithubStar/>
                    </div>
                </div>
            </nav>
        </header>
    );
}