import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { AlertTriangle, CheckCircle, Info, Loader2, XCircle } from "lucide-react";

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
          {children}
          <Toaster
            icons={{
              success: <CheckCircle className="text-green-600" size={24} />,
              info: <Info className="text-blue-600" size={24} />,
              warning: <AlertTriangle className="text-yellow-600" size={24} />,
              error: <XCircle className="text-red-600" size={24} />,
              loading: <Loader2 className="text-gray-500 animate-spin" size={24} />,
            }}
          />
        </body>
      </ClerkProvider>
    </html>
  );
}
