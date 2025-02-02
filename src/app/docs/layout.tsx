import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout ({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
			<ConvexClientProvider>{children}</ConvexClientProvider>
		</ClerkProvider>
	);
}
