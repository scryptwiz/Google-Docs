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

		if (search && organizationId) {
			return await ctx.db
				.query("documents")
				.withSearchIndex("search_title", (q) =>
					q.search("title", search).eq("organizationId", organizationId)
				)
				.paginate(paginationOpts);
		}

		if (search) {
			return await ctx.db
				.query("documents")
				.withSearchIndex("search_title", (q) =>
					q.search("title", search).eq("ownerId", user.subject)
				)
				.paginate(paginationOpts);
		}

		if (organizationId) {
			return await ctx.db
				.query("documents")
				.withIndex("by_organizationId", (q) =>
					q.eq("organizationId", organizationId)
				)
				.order("desc") // 🔥 Sort by latest first
				.paginate(paginationOpts);
		}

		return await ctx.db
			.query("documents")
			.withIndex("by_ownerId", (q) => q.eq("ownerId", user.subject))
			.order("desc")
			.paginate(paginationOpts);
	},
});

export const getDocById = query({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const document = await ctx.db.get(args.id);
		if (!document) throw new ConvexError("Document does not exist");
		return document;
	},
});

export const getDocByIds = query({
	args: { ids: v.array(v.id("documents")) },
	handler: async (ctx, args) => {
		const documents = [];

		for (const id of args.ids) {
			const document = await ctx.db.get(id);
			if (document) documents.push({ id: document._id, title: document.title });
			else documents.push({ id, title: "[Removed]" });
		}

		return documents;
	},
})

const checkDocumentAccess = async (ctx: any, user: User, documentId: string) => {
	const document = await ctx.db.get(documentId);
	if (!document) throw new ConvexError("Document does not exist");

	const organizationId = getOrganizationId(user);
	const isOwner = document.ownerId === user.subject;
	const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);

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