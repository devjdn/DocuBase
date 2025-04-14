import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sword, User, Crown } from "lucide-react";

export default async function AccountPage() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const userRole = (user.publicMetadata.role as string) ?? "user";

	return (
		<header className="flex flex-row items-end gap-4">
			<Avatar className="h-38 w-38 rounded-xl">
				<AvatarImage src={user.imageUrl} />
				<AvatarFallback className="rounded-xl">
					{user.username}
				</AvatarFallback>
			</Avatar>

			<div className="flex flex-col gap-2">
				<Badge className="w-fit grow-1" variant={"secondary"}>
					{userRole === "admin" ? (
						<Crown className="size-4 mr-1" />
					) : userRole === "moderator" ? (
						<Sword className="size-4 mr-1" />
					) : (
						<User className="size-4 mr-1" />
					)}
					<p className="capitalize">{userRole}</p>
				</Badge>
				<h1 className="text-4xl font-medium">{user.username}</h1>
				<h2>{user.emailAddresses[0].emailAddress}</h2>
			</div>
		</header>
	);
}
