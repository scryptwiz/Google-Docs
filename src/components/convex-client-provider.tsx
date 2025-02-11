"use client";

import { AuthLoading, ConvexReactClient } from "convex/react";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { FullPageLoader } from "./Loader/fullPage-loader";
import { CONVEX_URL } from "@/constants/config";

const convex = new ConvexReactClient(CONVEX_URL!);

export function ConvexClientProvider ({ children }: { children: ReactNode }) {
	const { isLoaded } = useAuth();

	if (!isLoaded) return <FullPageLoader label="Auth loading..." />;

	return (
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<AuthLoading>
				<FullPageLoader label="Auth loading..." />
			</AuthLoading>
			<SignedIn>
				{children}
			</SignedIn>
		</ConvexProviderWithClerk>
	);
}