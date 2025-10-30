import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookIt: Experiences & Slots",
  description: "Explore and book unique travel experiences easily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen ${inter.className}`}>
        <main>{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
