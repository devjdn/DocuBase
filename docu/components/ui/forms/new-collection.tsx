"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "../switch";
import { submitCollection } from "@/app/actions";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../dialog";
import { PlusCircle } from "lucide-react";
import * as React from "react";

const formSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	favourite: z.boolean().optional(),
});

export function NewCollectionForm() {
	const [open, setOpen] = React.useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			favourite: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			submitCollection({
				name: values.name,
				description: values.description,
				favourite: values.favourite || false,
			});

			toast.success(`Collection added to vault`, {
				description:
					"Your collection has been successfully added to the vault.",
				duration: 6000,
			});

			form.reset();
			setOpen(false);
		} catch (error) {
			toast.error(
				"An error occurred while adding the collection to the vault. Please try again.",
			);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"default"}>
					<PlusCircle />
					<span>Add new</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add new collection</DialogTitle>
					<DialogDescription>
						Add a new collection to your vault. Collections serve as
						a way to group websites that relate to each other in
						some way.
					</DialogDescription>
				</DialogHeader>

				{/**
				 * This is the form that's used to add a new collection to the vault.
				 */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Favourite YouTubers"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<Input
											placeholder="A collection of links to my favourite YouTube creators"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="favourite"
							render={({ field }) => (
								<FormItem className="flex flex-row justify-between items-center gap-4 p-4 rounded-lg border border-border">
									<div className="space-y-1">
										<FormLabel>Favourite</FormLabel>
										<FormDescription>
											Mark this collection as a favourite.
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						></FormField>
						<Button type="submit">Add collection</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
