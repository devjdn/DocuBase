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
import { submitLink } from "@/app/actions";

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
		submitLink({
			name: values.name,
			url: values.url,
			favourite: values.favourite || false,
		});
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
									Mark this page as a favourite.
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
				<Button type="submit">Add Page</Button>
			</form>
		</Form>
	);
}
