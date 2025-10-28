import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
