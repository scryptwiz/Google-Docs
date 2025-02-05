"use client";

import { ReactNode, useEffect, useState } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullPageLoader } from "@/components/Loader/fullPage-loader";
import { toast } from "sonner";
import { getDocuments, getUsers } from "@/app/actions/myAction";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN, RIGHT_MARGIN } from "@/constants/ui";

interface User {
	id: string;
	name: string;
	avatar: string;
}

export function Room ({ children }: { children: ReactNode }) {
	const { _id } = useParams();
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		getUsers()
			.then(setUsers)
			.catch(() => toast.error("Failed to fetch users"));
	}, []);

	return (
		<LiveblocksProvider
			authEndpoint={async () => {
				const endpoint = "/api/liveblocks-auth";
				const room = _id as string;

				const response = await fetch(endpoint, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ room })
				});

				return await response.json();
			}}
			resolveUsers={({ userIds }) => users.filter(user => userIds.includes(user.id))}
			resolveMentionSuggestions={({ text }) =>
				users
					.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
					.map(user => user.id)
			}
			resolveRoomsInfo={async ({ roomIds }) => {
				const documents = await getDocuments(roomIds as Id<"documents">[]);
				return documents.map(document => ({
					id: document.id,
					name: document.title,
				}));
			}}
		>
			<RoomProvider id={_id as string} initialStorage={{ leftMargin: LEFT_MARGIN, rightMargin: RIGHT_MARGIN, }}>
				<ClientSideSuspense fallback={<FullPageLoader label="Room loading..." />}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
