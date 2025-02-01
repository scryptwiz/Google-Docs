"use client";

import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RenameDialog } from "../ui/rename-dialog";
import { RemoveDialog } from "../ui/remove-dialog";

interface Props {
	documentId: Id<"documents">;
	title: string;
	onNewTabClick: (id: Id<"documents">) => void;
}

export const DocMenu = ({ documentId, title, onNewTabClick }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<MoreVertical className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<RenameDialog documentId={documentId} initialTitle={title}>
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						onClick={(e) => e.stopPropagation()}
					>
						<FilePenIcon className="size-4 mr-2" /> Rename
					</DropdownMenuItem>
				</RenameDialog>
				<RemoveDialog documentId={documentId}>
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						onClick={(e) => e.stopPropagation()}
					>
						<TrashIcon className="size-4 mr-2" /> Remove
					</DropdownMenuItem>
				</RemoveDialog>
				<DropdownMenuItem
					onClick={(e) => {
						e.stopPropagation();
						onNewTabClick(documentId);
					}}
				>
					<ExternalLinkIcon className="size-4 mr-2" />
					Open a new Tab
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
