"use client";
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
        <header>
          <nav>
            <ul style={{ display: "flex", gap: "1rem", listStyleType: "none" }}>
              <li>
                <Link href="/game">Game</Link>
              </li>
              <li>
                <Link href="/dictionary">Dictionary</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
