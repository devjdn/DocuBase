import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import { CollectionType } from "@/app/types/vault";
import PagesDropdown from "./pages-dropdown";

export default function CollectionsCard(collection: CollectionType) {
	return (
		<Card className="hover:shadow-sm hover:border-brand">
			<CardHeader>
				<div className="flex flex-row items-center justify-between gap-4">
					<CardTitle className="truncate grid">
						<p className="truncate">{collection.name}</p>
					</CardTitle>
					<div className="flex flex-row gap-2">
						{collection.favourite && (
							<Badge variant={"favourite"}>
								<Star className="size-4 fill-brand stroke-brand" />
							</Badge>
						)}
						<PagesDropdown
							favourite={collection.favourite}
							pageId={collection.id}
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="truncate">
				<p className="truncate text-sm text-muted-foreground">
					{collection.description}
				</p>
			</CardContent>
		</Card>
	);
}
