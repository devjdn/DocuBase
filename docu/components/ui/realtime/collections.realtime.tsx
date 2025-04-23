"use client";

import * as React from "react";
import { CollectionType } from "@/app/types/vault";
import { useAuth } from "@clerk/nextjs";
import supabase from "@/utils/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";
import CollectionsCard from "../cards/collections-card";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../collapsible";
import { Button } from "../button";
import { ChevronsUpDown } from "lucide-react";

export default function CollectionsRealtime({
	serverCollections,
}: {
	serverCollections: CollectionType[];
}) {
	const { getToken, userId } = useAuth();
	const [collections, setCollections] =
		React.useState<CollectionType[]>(serverCollections);
	const [open, setOpen] = React.useState<boolean>(true);

	const favouriteCollections = collections.filter(
		(collection) => collection.favourite,
	);
	const otherCollections = collections.filter(
		(collection) => !collection.favourite,
	);

	React.useEffect(() => {
		let channel: RealtimeChannel;
		let refreshInterval: NodeJS.Timeout;

		// Make sure authentication is properly set up before subscribing
		const setupRealtimeSubscription = async () => {
			try {
				// Ensure authentication is set up correctly
				if (userId) {
					const token = await getToken({ template: "supabase" });
					if (token) {
						// Set the auth token explicitly
						supabase.realtime.setAuth(token);
						// console.log("Auth token set successfully");
					}
				}

				channel = supabase.channel("collections");

				// console.log("Setting up channel:", channel);

				// Test if channel is working with a broadcast
				channel.send({
					type: "broadcast",
					event: "test",
					payload: { message: "Testing channel" },
				});

				// Listen for specific events
				channel
					// .on("broadcast", { event: "*" }, (payload) => {
					// 	console.log("Broadcast received:", payload);
					// })
					.on(
						"postgres_changes",
						{
							event: "INSERT",
							schema: "public",
							filter: `user_id=eq.${userId}`,
						},
						(payload) => {
							// console.log("INSERT received:", payload);
							setCollections((prevCollections) => [
								...prevCollections,
								payload.new as CollectionType,
							]);
						},
					)
					.on(
						"postgres_changes",
						{
							event: "UPDATE",
							schema: "public",
							filter: `user_id=eq.${userId}`,
						},
						(payload) => {
							// console.log("UPDATE received:", payload);
							setCollections((prevCollections) =>
								prevCollections.map((collection) =>
									collection.id === payload.new.id
										? (payload.new as CollectionType)
										: collection,
								),
							);
						},
					)
					.on(
						"postgres_changes",
						{
							event: "DELETE",
							schema: "public",
							table: "Collections",
						},
						(payload) => {
							// console.log("DELETE received:", payload);
							setCollections((prevCollections) =>
								prevCollections.filter(
									(collection) =>
										collection.id !== payload.old.id,
								),
							);
						},
					)
					.subscribe((status) => {
						// console.log("Subscription status:", status);
					});

				refreshInterval = setInterval(async () => {
					const newToken = await getToken({ template: "supabase" });
					if (newToken) {
						supabase.realtime.setAuth(newToken);
					}
				}, 50000);
			} catch (error) {
				console.error("Error setting up realtime:", error);
			}
		};

		setupRealtimeSubscription();

		return () => {
			if (channel) {
				// console.log("Unsubscribing from channel");
				supabase.removeChannel(channel);
			}

			if (refreshInterval) {
				clearInterval(refreshInterval);
			}
		};
	}, [userId, getToken]);

	return (
		<main>
			{favouriteCollections && favouriteCollections.length > 0 && (
				<Collapsible
					open={open}
					onOpenChange={() => setOpen((prev) => !prev)}
					className="mb-4"
				>
					<CollapsibleTrigger asChild>
						<Button variant="ghost">
							<span>Favourites</span>
							<ChevronsUpDown />
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className="mt-4 border-b border-border pb-4">
						<ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
							{favouriteCollections?.map((collection, i) => (
								<li key={i}>
									<CollectionsCard {...collection} />
								</li>
							))}
						</ul>
					</CollapsibleContent>
				</Collapsible>
			)}

			<section className="flex flex-col gap-4">
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
					{otherCollections?.map((collection, i) => (
						<li key={i}>
							<CollectionsCard {...collection} />
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
