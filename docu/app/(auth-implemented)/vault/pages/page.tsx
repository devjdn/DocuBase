import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { PagesForm } from "@/components/ui/forms/pages";
import { PlusCircle } from "lucide-react";

export default async function PagesPage() {
	return (
		<header className="flex justify-between items-center gap-4">
			<div>
				<h1 className="text-3xl font-regular">Pages</h1>
			</div>
			<nav className="flex items-center gap-2">
				{/**
				 * Here there will be a list of controls
				 *
				 * Examples:
				 * Add new page
				 * Filter pages (by collection, by tags, by date) [dropdown]
				 * Change view (grid, list)
				 */}
				<Dialog>
					<DialogTrigger asChild>
						<Button variant={"default"}>
							<PlusCircle />
							<span>Add new</span>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add new page</DialogTitle>
						</DialogHeader>

						{/**
						 * This is the form that's used to add a new page to the vault.
						 */}
						<PagesForm />
					</DialogContent>
				</Dialog>
			</nav>
		</header>
	);
}
