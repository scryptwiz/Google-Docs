"use client";

import { ReactNode, useEffect, useState } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullPageLoader } from "@/components/Loader/fullPage-loader";
import { toast } from "sonner";
import { getUsers } from "@/app/actions/myAction";

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
			authEndpoint="/api/liveblocks-auth"
			resolveUsers={({ userIds }) => users.filter(user => userIds.includes(user.id))}
			resolveMentionSuggestions={({ text }) =>
				users
					.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
					.map(user => user.id)
			}
			resolveRoomsInfo={() => []}
		>
			<RoomProvider id={_id as string}>
				<ClientSideSuspense fallback={<FullPageLoader label="Room loading..." />}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
