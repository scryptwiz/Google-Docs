import { CLERK_JWT_ISSUER_DOMAIN } from "@/constants/config";

export default {
	providers: [
		{
			domain: CLERK_JWT_ISSUER_DOMAIN,
			applicationID: "convex",
		},
	]
};