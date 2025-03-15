"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";

export default function WindowBtn() {
    const router = useRouter();

    return(
        <Button className="text-muted-foreground stroke-muted-foreground hover:text-foreground hover:stroke-foreground gap-2" variant={"ghost"} size={"sm"} onClick={() => router.back()}>
            <MoveLeft size={18}/>
            <p>Go back</p>
        </Button>
    );
};