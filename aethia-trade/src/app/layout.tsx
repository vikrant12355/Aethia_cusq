import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aethia Trade - Institutional AI Consensus & Audit Platform",
  description: "BlackRock Aladdin density, Stripe polish, and multi-agent AI consensus for institutional asset management with cryptographic audit logging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050507] text-[#f4f4f5] antialiased">
        {children}
      </body>
    </html>
  );
}
