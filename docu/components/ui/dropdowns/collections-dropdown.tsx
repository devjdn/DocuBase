"use client";

import { Library, Pen, Star, Trash } from "lucide-react";
import { Ellipsis } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu";
import { deleteCollection, favouriteCollection } from "@/app/actions";
import { Button } from "../button";

export default function CollectionsDropdown({
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
					onClick={() => favouriteCollection(favourite, pageId)}
				>
					{favourite ? (
						<>
							<Star className="size-4 fill-brand stroke-brand" />
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
				<DropdownMenuItem onClick={() => deleteCollection(pageId)}>
					<Trash className="size-4" />
					Remove page
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
