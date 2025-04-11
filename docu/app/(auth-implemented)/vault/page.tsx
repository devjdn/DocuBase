import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Vault() {
	const user = await currentUser();
	const { userId } = await auth();

	if (!userId) {
		auth.protect({ unauthorizedUrl: "/sign-in" });
	}

	return (
		<section>
			<h1 className="text-2xl font-bolds">Hello, {user?.username}</h1>
		</section>
	);
}
