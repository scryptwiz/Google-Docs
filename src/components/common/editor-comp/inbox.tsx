"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { BellIcon } from "lucide-react";

export const Inbox = () => {
	return (
		<ClientSideSuspense fallback={
			<>
				<Button variant="ghost" size="icon" className="relative mx-2" disabled>
					<BellIcon className="size-4" />
				</Button>
				<Separator orientation="vertical" className="h-8" />
			</>
		}>
			<InboxMenu />
		</ClientSideSuspense>
	)
}

const InboxMenu = () => {
	const { inboxNotifications } = useInboxNotifications();
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="relative mx-2"
					>
						<BellIcon className="size-4" />
						{inboxNotifications.length > 0 && (
							<div className="absolute -top-1 -right-1 size-4 bg-p2 rounded-full text-xs text-white items-center justify-center">
								{inboxNotifications.length}
							</div>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-auto">
					{inboxNotifications.length > 0 ? (
						<InboxNotificationList>
							{inboxNotifications.map((notification) => (
								<InboxNotification
									key={notification.id}
									inboxNotification={notification}
								/>
							))}
						</InboxNotificationList>
					) : (
						<div className="p-2 w-[400px] text-center text-muted-foreground">No notifications</div>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<Separator orientation="vertical" className="h-8" />
		</>
	)
}