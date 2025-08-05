import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotiFine",
  description: "A simple way to explore your Spotify data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
