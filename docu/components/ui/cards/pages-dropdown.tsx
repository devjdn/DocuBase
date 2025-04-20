"use client";

import { Library, Pen, Star, Trash } from "lucide-react";
import { Ellipsis } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu";
import { deletePage, toggleFavourite } from "@/app/actions";
import { Button } from "../button";

export default function PagesDropdown({
	favourite,
	pageId,
}: {
	favourite: boolean;
	pageId: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"} size={"icon"} className="size-7">
					<Ellipsis className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="end">
				<DropdownMenuItem
					onClick={() => toggleFavourite(favourite, pageId)}
				>
					{favourite ? (
						<>
							<Star className="size-4 fill-primary-foreground" />
							Unfavourite
						</>
					) : (
						<>
							<Star className="size-4" />
							Favourite
						</>
					)}
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Library className="size-4" />
					Add to a collection
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Pen className="size-4" />
					Edit page
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => deletePage(pageId)}>
					<Trash className="size-4" />
					Remove page
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
