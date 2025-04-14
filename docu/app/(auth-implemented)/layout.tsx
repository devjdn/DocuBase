import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ActionsHeader from "@/components/ui/actions-header";

export default async function DocumentationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const sidebarUser = {
		firstName: user.firstName || "",
		imageUrl: user.imageUrl,
		email: user.emailAddresses[0]?.emailAddress || "",
		username: user.username || "",
	};

	return (
		<SidebarProvider>
			<div className="w-full flex flex-col md:grid md:grid-cols-[auto_1fr] min-h-screen relative">
				<AppSidebar user={sidebarUser} />

				<main className="flex flex-col gap-6 grow py-3 px-6 md:px-10 bg-background">
					<ActionsHeader />
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
}
