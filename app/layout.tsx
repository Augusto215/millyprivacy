import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Creator — Exclusive Content & Subscriptions",
  description:
    "Access exclusive premium photos and videos from your favorite creator. Subscribe for instant access to the full vault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
