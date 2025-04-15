import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
export default async function SignInPage() {
	const user = await currentUser();

	if (user) {
		redirect("/vault");
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<SignIn />
		</div>
	);
}
