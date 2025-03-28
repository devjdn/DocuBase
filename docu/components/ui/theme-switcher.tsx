"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <div className="flex flex-row gap-2">
        <Button variant={theme === "dark" ? "default" : "ghost"} size={"icon"} justify={"center"} onClick={() => setTheme("dark")}>
            <MoonStar size={18}/>
        </Button>
        <Button variant={theme === "light" ? "default" : "ghost"} size={"icon"} justify={"center"} onClick={() => setTheme("light")}>
          	<Sun size={18}/>
        </Button>
        <Button variant={theme === "system" ? "default" : "ghost"} size={"icon"} justify={"center"} onClick={() => setTheme("system")}>
          	<Laptop size={18}/>
        </Button>
    </div>
    
  );
};

{/*<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"} justify={"center"}>
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="end">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>*/}

export { ThemeSwitcher };
