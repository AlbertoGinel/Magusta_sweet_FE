"use client";
import { Button } from "@/components/ui/button"
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { Home, ListTodo, BookOpen, User, HelpCircle } from 'lucide-react'

import "/node_modules/flag-icons/css/flag-icons.min.css";

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
        <div className="min-h-screen flex flex-col">
{/*TODO: not for hackathon****
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
*/}
          <main className="flex flex-col flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
          <div className="container max-w-md mx-auto">
            <div className="flex justify-around py-4">
              <Link href="#" className="flex flex-col items-center gap-1">
                <Home className="h-6 w-6 text-sky-500" />
                <span className="text-xs text-slate-600">Home</span>
              </Link>
              <Link href="#" className="flex flex-col items-center gap-1">
                <ListTodo className="h-6 w-6 text-slate-400" />
                <span className="text-xs text-slate-600">Tasks</span>
              </Link>
              <Link href="#" className="flex flex-col items-center gap-1">
                <BookOpen className="h-6 w-6 text-slate-400" />
                <span className="text-xs text-slate-600">Learn</span>
              </Link>
              <Link href="#" className="flex flex-col items-center gap-1">
                <User className="h-6 w-6 text-slate-400" />
                <span className="text-xs text-slate-600">Profile</span>
              </Link>
              <Link href="#" className="flex flex-col items-center gap-1">
                <HelpCircle className="h-6 w-6 text-slate-400" />
                <span className="text-xs text-slate-600">Help</span>
              </Link>
            </div>
          </div>
        </nav>
        </div>
      </body>
    </html>
  );
}
