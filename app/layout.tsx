import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse - Trending Farcaster Posts",
  description: "A Farcaster mini app that shows the most reacted to posts in a channel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
