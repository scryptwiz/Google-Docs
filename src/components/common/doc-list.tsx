import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocCard } from "./doc-card";

interface Props {
	documents: Doc<"documents">[] | undefined;
	loadMore: (numItems: number) => void;
	status: PaginationStatus;
}

export const DocList = ({ documents, loadMore, status }: Props) => {
	return (
		<div className="max-w-screen-lg mx-auto md:px-16 px-5 py-6 flex flex-col gap-5">
			{documents === undefined ? (
				<div className="flex justify-center items-center h-24">
					<LoaderIcon className="animate-spin text-muted-foreground size-5" />
				</div>
			) : documents.length === 0 ? (
				<div className="h-24 flex justify-center items-center text-muted-foreground">
					No Document found
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 py-4">
					{documents.map((document) => (
						<DocCard key={document._id} document={document} />
					))}
				</div>
			)}

			<div className="flex items-center justify-center">
				<Button variant="ghost" size="sm" onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>
					{status === "CanLoadMore" ? "Load More" : "End of results"}
				</Button>
			</div>
		</div>
	);
};