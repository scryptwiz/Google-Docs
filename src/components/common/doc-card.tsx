"use client";

import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { Building2Icon, CircleUserIcon, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logo } from "@/constants/images";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DocMenu } from "./doc-menu";

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
				<div className="px-4 py-3">
					<span className="font-medium text-sm">{document.title}</span>
					<div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
						{document.organizationId ? (
							<Building2Icon className="size-4 inline-block" />
						) : (
							<CircleUserIcon className="size-4 inline-block" />
						)}
						<p>{new Date(document._creationTime).toLocaleDateString()}</p>
					</div>
				</div>

				{/* More Options */}
				<div className="flex justify-end px-4 pb-3">
					<DocMenu documentId={document._id} title={document.title} onNewTabClick={onNewTabClick} />
				</div>
			</div>
		</div>
	);
};
