"use client";

import { Library } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "../dialog";

import * as React from "react";
import { CollectionType } from "@/app/types/vault";
import supabase from "@/utils/supabaseClient";
import CollectionsCard from "../cards/collections-card";

export default function AddToCollectionDialog() {
	const [collections, setCollections] = React.useState<
		CollectionType[] | null
	>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		const fetchCollections = async () => {
			try {
				setLoading(true);
				const { data, error } = await supabase
					.from("collections")
					.select("*")
					.order("id");

				console.log(data, error);
				setCollections(data);
				setLoading(false);
			} catch (error) {
				throw new Error("An error occurred. Here are the details: ");
			}
		};

		fetchCollections();
	}, []);

	return (
		<>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add to a collection</DialogTitle>
				</DialogHeader>
				<ul>
					{collections &&
						collections.map((collection, ci) => (
							<li key={ci}>
								<CollectionsCard {...collection} />
							</li>
						))}
				</ul>
			</DialogContent>
		</>
	);
}
