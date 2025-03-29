"use client";

import { geist, libreBaskerville, openDyslexic, useFont } from "@/providers/font-provider";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function FontBtn() {
    const [mounted, setMounted] = useState(false);
    const {font, toggleFont} = useFont();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return(
        <div className="flex flex-row gap-2">
            <Button variant={font === "geist" ? "default" : "ghost"} size={"icon"} justify={"center"} onClick={() => toggleFont("geist")}>
                <p className={`${geist.className}`}>A</p>
            </Button>
            <Button variant={font === "libreBaskerville" ? "default" : "ghost"} size={"icon"} justify={"center"} onClick={() => toggleFont("libreBaskerville")}>
                <p className={`${libreBaskerville.className}`}>A</p>
            </Button>
            <Button variant={font === "openDyslexic" ? "default" : "ghost"} size={"icon"} justify={"center"} onClick={() => toggleFont("openDyslexic")}>
                <p className={`${openDyslexic.className}`}>A</p>
            </Button>
        </div>
    );
}