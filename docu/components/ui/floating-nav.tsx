import SettingsPopover from "./settings-popover"; 
import GithubStar from "../buttons/github-star";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
import { Button } from "../ui/button";

export default function FloatingNav() {
    return(
        <div className="p-1 rounded-xl bg-secondary border border-border flex flex-row items-center justify-center gap-2">
            <SettingsPopover/>

            <GithubStar/>

            <SignedOut>
                <SignInButton mode="modal">
                    <Button size="default" variant={"default"}>Sign In</Button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
}