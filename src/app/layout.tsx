import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Google Docs",
  description: "docs.google.com",
};

console.log("Rendered on:", typeof window !== "undefined" ? "Client" : "Server");
export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
        <body className={`${roboto.variable} antialiased`}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
