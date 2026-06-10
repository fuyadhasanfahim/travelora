import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Travelora — Unveil the beauty of the World",
  description:
    "Travelora — discover, plan and book unforgettable tours and travel experiences around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        {/* pt-20 clears the fixed navbar; full-bleed hero sections pull back with -mt-20 */}
        <main className="flex-1 pt-20">{children}</main>
      </body>
    </html>
  );
}
