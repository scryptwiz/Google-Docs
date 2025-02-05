import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { CONVEX_URL, LIVEBLOCKS_SECRET_KEY } from "@/constants/config";

const convex = new ConvexHttpClient(CONVEX_URL!)

const liveblocks = new Liveblocks({ secret: `${LIVEBLOCKS_SECRET_KEY}` });

export async function POST (request: Request) {
	// Get the current user from your database
	const { sessionClaims } = await auth()
	if (!sessionClaims) return new Response("Unauthorized", { status: 401 })

	const user = await currentUser()
	if (!user) return new Response("Unauthorized", { status: 401 })

	const { room } = await request.json()
	const document = await convex.query(api.documents.getDocById, { id: room })
	if (!document) return new Response("Document not found", { status: 404 })

	const isOwnwer = document.ownerId === user.id
	const isOrganizationMember = document.organizationId && document.organizationId === sessionClaims.org_id;

	if (!isOwnwer && !isOrganizationMember) return new Response("Unauthorized", { status: 401 })

	// Start an auth session inside your endpoint
	const session = liveblocks.prepareSession(
		user.id,
		{
			userInfo: {
				name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
				avatar: user.imageUrl
			}
		}
	);

	session.allow(room, session.FULL_ACCESS);
	const { status, body } = await session.authorize();
	return new Response(body, { status });
}