"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { Input } from "./input";
import { Button } from "./button";
import { toast } from "sonner";

interface Props {
	documentId: Id<"documents">;
	initialTitle: string;
	children: React.ReactNode;
}

export const RenameDialog = ({ documentId, children, initialTitle }: Props) => {
	const update = useMutation(api.documents.updateById);
	const [isUpdating, setIsUpdating] = useState(false);
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(initialTitle);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsUpdating(true);
		update({ id: documentId, title: title.trim() || "Untitled" })
			.catch(() => toast.error("Failed to remove document"))
			.then(() => toast.success("Document deleted successfully"))
			.then(() => {
				setOpen(false);
			})
			.finally(() => {
				setIsUpdating(false);
			});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent onClick={(e) => e.stopPropagation()}>
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle>Rename Document</DialogTitle>
						<DialogDescription>
							Enter a new name for this document
						</DialogDescription>
					</DialogHeader>
					<div className="my-4">
						<Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document Name" onClick={(e) => e.stopPropagation()} />
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" disabled={isUpdating}
							onClick={(e) => {
								e.stopPropagation();
								setOpen(false);
							}}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isUpdating} onClick={(e) => e.stopPropagation()}>Save</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};