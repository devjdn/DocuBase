"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import * as React from "react";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

export function NavUser({
	user,
}: {
	user: {
		firstName: string;
		imageUrl: string;
		email: string;
		username: string;
	};
}) {
	const { isMobile } = useSidebar();
	const { signOut } = useClerk();

	if (!user) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size={"lg"}
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-md">
								<AvatarImage src={user.imageUrl} />
								<AvatarFallback className="rounded-md">
									{user.firstName}
								</AvatarFallback>
							</Avatar>

							<div className="grid flex-1 text-left text-sm">
								<span className="truncate font-mediums">
									{user.username}
								</span>
								<span className="truncate text-xs">
									{user.email}
								</span>
							</div>

							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={"bottom"}
						align="start"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-md">
									<AvatarImage
										src={user.imageUrl}
										alt={user.username}
									/>
									<AvatarFallback className="rounded-md">
										{user.username}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user.username}
									</span>
									<span className="truncate text-xs">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href="/account">
									<User className="size-4" />
									<span className="font-regular">
										Account
									</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() =>
									signOut({ redirectUrl: "/sign-in" })
								}
							>
								<LogOut className="size-4" />
								<span className="font-regular">Log out</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
