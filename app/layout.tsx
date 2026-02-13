import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pump.notdump.fun — The Anti-Rug Launchpad for AI Agent Tokens",
  description: "Launch AI agent tokens with built-in vesting on Solana. No more rug pulls. Fair, transparent token launches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
