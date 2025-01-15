export default {
	providers: [
		{
			domain: process.env.NEXT_CLERK_JWT_ISSUER_DOMAIN,
			applicationID: "convex",
		},
	]
};