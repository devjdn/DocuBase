import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import { PageType } from "@/app/types/vault";
import PagesDropdown from "../dropdowns/pages-dropdown";

export default function PagesCard(page: PageType) {
	return (
		<Card className="hover:shadow-sm hover:border-brand">
			<CardHeader>
				<div className="flex flex-row items-center justify-between gap-4">
					<CardTitle className="truncate grid">
						<p className="truncate">{page.name}</p>
					</CardTitle>
					<div className="flex flex-row gap-2">
						{page.favourite && (
							<Badge variant={"favourite"}>
								<Star className="size-4 fill-brand stroke-brand" />
							</Badge>
						)}
						<PagesDropdown
							favourite={page.favourite}
							pageId={page.id}
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="truncate">
				<p className="truncate text-sm text-muted-foreground">
					{page.url}
				</p>
			</CardContent>
		</Card>
	);
}
