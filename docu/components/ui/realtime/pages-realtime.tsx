"use client";

import * as React from "react";
import { PageType } from "@/app/types/vault";
import supabaseClient from "@/utils/supabaseClient";

export default function PagesRealtime({
	serverPages,
}: {
	serverPages: PageType[];
}) {
	// const [pages, setPages] = React.useState<typeof serverPages>(serverPages);
	// const favouritePages = pages?.filter((page) => page.favourite);
	// const otherPages = pages?.filter((page) => !page.favourite);

	React.useEffect(() => {
		const channel = supabaseClient
			.channel("realtime pages")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "pages",
				},
				(payload) => {
					console.log(payload);
				},
			)
			.subscribe();

		console.log(channel);

		return () => {
			supabaseClient.removeChannel(channel);
		};
	}, [supabaseClient]);

	return (
		<div className="w-2xl overflow-x-hidden">
			<pre>{JSON.stringify(serverPages, null, 2)}</pre>
		</div>
	);
}
