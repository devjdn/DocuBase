"use client";

import { Library, Pen, Star, Trash } from "lucide-react";
import { Ellipsis } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu";
import { deletePage, favouritePage } from "@/app/actions";
import { Button } from "../button";
import AddToCollectionDialog from "../dialogs/add-to-collection";
import { Dialog, DialogTrigger } from "../dialog";

export default function PagesDropdown({
	favourite,
	pageId,
}: {
	favourite: boolean;
	pageId: string;
}) {
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"} size={"icon"} className="size-7">
						<Ellipsis className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="bottom" align="end">
					<DropdownMenuItem
						onClick={() => favouritePage(favourite, pageId)}
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
					<DropdownMenuItem asChild>
						<DialogTrigger>
							<Library className="size-4" />
							Add to a collection
						</DialogTrigger>
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
				<AddToCollectionDialog />
			</DropdownMenu>
		</Dialog>
	);
}
