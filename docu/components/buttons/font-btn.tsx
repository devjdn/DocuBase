"use client";

import { useFont } from "@/providers/font-provider";
import { Button } from "../ui/button";
import { geist, openDyslexic, ptSerif } from "@/providers/font-provider";

export default function FontBtn() {
    const {font, toggleFont} = useFont();
    console.log(openDyslexic.className);

    return(
        <div>
            <Button variant={"ghost"} size={"icon"} justify={"center"} onClick={() => toggleFont("geist")}>
                <p className={`text-foreground ${geist.className}`}>A</p>
            </Button>
            <Button variant={"ghost"} size={"icon"} justify={"center"} onClick={() => toggleFont("ptSerif")}>
                <p className={`text-foreground ${ptSerif.className}`}>A</p>
            </Button>
            <Button variant={"ghost"} size={"icon"} justify={"center"} onClick={() => toggleFont("openDyslexic")}>
                <p className={`text-foreground ${openDyslexic.className}`}>A</p>
            </Button>
        </div>
    );
}