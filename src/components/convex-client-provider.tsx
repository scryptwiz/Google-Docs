"use client";

import { ConvexReactClient, AuthLoading } from "convex/react";
import { ClerkProvider, RedirectToSignIn, SignedOut, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { FullPageLoader } from "./Loader/fullPage-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider ({ children }: { children: ReactNode }) {
	const { isLoaded } = useAuth();

	if (!isLoaded) {
		return <FullPageLoader label="Auth loading..." />;
	}

	return (
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			{children}
		</ConvexProviderWithClerk>
	);
}