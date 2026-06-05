import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import CompareBar from "@/components/compare/CompareBar";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "EduTrack | Discover Top Colleges in India",
  description:
    "EduTrack helps you discover, compare and choose the best colleges for your future career including engineering, arts, and commerce.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <SessionProvider>
          <Navbar />
          {children}
          <CompareBar />
        </SessionProvider>
      </body>
    </html>
  );
}
