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
			<Button
				variant={theme === "dark" ? "default" : "ghost"}
				size={"icon"}
				onClick={() => setTheme("dark")}
			>
				<MoonStar size={18} />
			</Button>
			<Button
				variant={theme === "light" ? "default" : "ghost"}
				size={"icon"}
				onClick={() => setTheme("light")}
			>
				<Sun size={18} />
			</Button>
			<Button
				variant={theme === "system" ? "default" : "ghost"}
				size={"icon"}
				onClick={() => setTheme("system")}
			>
				<Laptop size={18} />
			</Button>
		</div>
	);
};

export { ThemeSwitcher };
