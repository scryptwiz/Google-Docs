"use client";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

interface Props {
	documentId: Id<"documents">;
	children: React.ReactNode;
}

export const RemoveDialog = ({ documentId, children }: Props) => {
	const remove = useMutation(api.documents.removeById);
	const [isRemoving, setIsRemoving] = useState(false);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action can not be undone. It will permanently delete your document
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isRemoving}
						onClick={(e) => {
							e.stopPropagation();
							setIsRemoving(true);
							remove({ id: documentId })
								.catch(() => toast.error("Failed to remove document"))
								.then(() => toast.success("Document deleted successfully"))
								.finally(() => setIsRemoving(false));
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};