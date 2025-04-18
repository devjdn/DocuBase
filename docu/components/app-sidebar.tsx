import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { Bookmark, Home, Library, Send, Vault } from "lucide-react";
import Link from "next/link";
import { NavUser } from "./ui/user/nav-user";
import { checkRole } from "@/utils/roles";
import SidebarLink from "./ui/active-sidebar-link";

type VaultItem = {
	name: string;
	icon: React.ReactNode;
	href: string;
};

const vaultItems: VaultItem[] = [
	{ name: "Home", icon: <Home />, href: "/vault" },
	{ name: "Pages", icon: <Bookmark />, href: "/vault/pages" },
	{ name: "Collections", icon: <Library />, href: "/vault/collections" },
];

export async function AppSidebar({
	user,
}: {
	user: {
		firstName: string;
		imageUrl: string;
		email: string;
		username: string;
	};
}) {
	const isAdmin = await checkRole("admin");

	return (
		<Sidebar collapsible="offcanvas">
			<SidebarHeader>
				<Link href="/links">
					<div className="p-1 flex gap-1 items-center font-medium">
						<Vault className="stroke-brand" />
						<span>PageVault</span>
					</div>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<span>Vault</span>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{vaultItems.map((item, i) => (
								<SidebarLink key={i} href={item.href}>
									<Link href={item.href}>
										{item.icon}
										<span>{item.name}</span>
									</Link>
								</SidebarLink>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>
						<span>Miscellaneous</span>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuButton>
								<Send />
								<span>Feature Request</span>
							</SidebarMenuButton>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} isAdmin={isAdmin} />
			</SidebarFooter>
		</Sidebar>
	);
}
