import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

type User = { subject: string; organization_id?: string };

const getUser = async (ctx: any): Promise<User> => {
	const user = await ctx.auth.getUserIdentity();
	if (!user) throw new ConvexError("Unauthorized");
	return user;
};

const getOrganizationId = (user: User): string | undefined => user.organization_id ?? undefined;

export const createDocument = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await getUser(ctx);
		return await ctx.db.insert("documents", {
			title: args.title ?? "Untitled document",
			ownerId: user.subject,
			organizationId: getOrganizationId(user),
			initialContent: args.initialContent,
		});
	},
});

export const getDocuments = query({
	args: {
		paginationOpts: paginationOptsValidator,
		search: v.optional(v.string()),
	},
	handler: async (ctx, { search, paginationOpts }) => {
		const user = await getUser(ctx);
		const organizationId = getOrganizationId(user);
		const query = ctx.db.query("documents");

		if (search) {
			const searchQuery = query.withSearchIndex("search_title", (q) =>
				q.search("title", search)
			);
			return organizationId
				? searchQuery.filter(q => q.eq("organizationId", organizationId)).paginate(paginationOpts)
				: searchQuery.filter(q => q.eq("ownerId", user.subject)).paginate(paginationOpts);
		}

		const indexQuery = organizationId
			? query.withIndex("by_organizationId", (q) => q.eq("organizationId", organizationId))
			: query.withIndex("by_ownerId", (q) => q.eq("ownerId", user.subject));

		return indexQuery.paginate(paginationOpts);
	},
});

const checkDocumentAccess = async (ctx: any, user: User, documentId: string) => {
	const document = await ctx.db.get(documentId);
	if (!document) throw new ConvexError("Document does not exist");

	const organizationId = getOrganizationId(user);
	const isOwner = document.ownerId === user.subject;
	const isOrganizationMember = document.organizationId === organizationId;

	if (!isOwner && !isOrganizationMember) throw new ConvexError("Unauthorized");
	return document;
};

export const removeById = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const user = await getUser(ctx);
		await checkDocumentAccess(ctx, user, args.id);
		await ctx.db.delete(args.id);
	},
});

export const updateById = mutation({
	args: { id: v.id("documents"), title: v.string() },
	handler: async (ctx, args) => {
		const user = await getUser(ctx);
		await checkDocumentAccess(ctx, user, args.id);
		await ctx.db.patch(args.id, { title: args.title });
	},
});
