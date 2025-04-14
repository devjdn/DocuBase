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

const formSchema = z.object({
	name: z.string().min(1),
	url: z.string().min(1).url(),
	favourite: z.boolean().optional(),
});

export function PagesForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			url: "",
			favourite: false,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Create the form submission with supabase, or a potentially new solution
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="PageVault" {...field} />
							</FormControl>
							<FormDescription>
								This is the name of the page you&apos;re adding
								to your vault.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL</FormLabel>
							<FormControl>
								<Input
									placeholder="https://pagevault.app"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the full HTTPS URL of that page.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Add Page</Button>
			</form>
		</Form>
	);
}
