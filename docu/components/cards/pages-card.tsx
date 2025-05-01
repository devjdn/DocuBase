import { Library, Star, Trash } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { PageType } from "@/app/types/vault";
import { Button } from "../ui/button";

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
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant={"ghost"}
									size={"icon"}
									className="size-7"
								>
									<Ellipsis className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="bottom" align="end">
								{page.favourite ? (
									<DropdownMenuItem>
										<Star className="size-4" />
										Unfavourite
									</DropdownMenuItem>
								) : (
									<DropdownMenuItem>
										<Star className="size-4" />
										Favourite
									</DropdownMenuItem>
								)}
								<DropdownMenuItem>
									<Library className="size-4" />
									Add to a collection
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Trash className="size-4" />
									Remove page
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
