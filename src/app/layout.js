"use client";
import { Button } from "@/components/ui/button"
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#000000]">

          <header className="bg-primary p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Magusta Suite</h1>
              <nav>
                <Button asChild variant="secondary" className="mr-2">
                  <Link href="/game">Game</Link>
                </Button>
                <Button asChild variant="ghost" className="text-white hover:text-[#0072CE] hover:bg-white">
                  <Link href="/dictionary">Dictionary</Link>
                </Button>
              </nav>
            </div>
          </header>

          <main className="flex flex-col flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
