"use client";

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "./sidebar";

export default function SidebarLink({
	children,
	href,
	...props
}: {
	children: React.ReactNode;
	href: string;
}) {
	const pathname = usePathname();
	return (
		<SidebarMenuButton isActive={pathname === href} {...props} asChild>
			{children}
		</SidebarMenuButton>
	);
}
