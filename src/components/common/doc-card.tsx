"use client";

import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc_icon, logo } from "@/constants/images";
import { DocMenu } from "./doc-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import SharedTooltip from "./shared-tooltip";

interface Props {
	document: Doc<"documents">;
}

export const DocCard = ({ document }: Props) => {
	const router = useRouter();

	const onNewTabClick = (id: string) => {
		window.open(`/docs/${id}`, "_blank");
	};

	return (
		<div
			className="flex flex-col bg-white rounded transition cursor-pointer border border-s1/20 hover:border-p2"
			onClick={() => router.push(`/docs/${document._id}`)}
		>
			{/* Thumbnail */}
			<div className="w-full h-44 flex items-center justify-center border-b border-gray-200">
				<Image src={logo} alt="Document Thumbnail" width={40} height={40} />
			</div>

			<div className="flex items-center py-3 justify-between">
				{/* Document Info */}
				<div className="px-3 py-2">
					<span className="font-medium text-sm">{document.title}</span>
					<div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
						<div className="flex items-center gap-2">
							<Image src={doc_icon} alt="Doc Icon" width={16} height={16} />
							{document.organizationId && (
								<SharedTooltip message="shared"><Users className="size-4 inline-block" /></SharedTooltip>
							)}
						</div>
						<p>{new Date(document._creationTime).toLocaleDateString()}</p>
					</div>
				</div>

				{/* More Options */}
				<div className="flex justify-end">
					<DocMenu documentId={document._id} title={document.title} onNewTabClick={onNewTabClick} />
				</div>
			</div>
		</div>
	);
};
