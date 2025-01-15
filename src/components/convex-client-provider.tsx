"use client";

import { ConvexReactClient, AuthLoading } from "convex/react";
import { ClerkProvider, RedirectToSignIn, SignedOut, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { FullPageLoader } from "./Loader/fullPage-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider ({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<SignedOut>
					<RedirectToSignIn />
				</SignedOut>
				{children}
				<AuthLoading>
					<FullPageLoader label="Auth loading..." />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}