"use client";
import { useRouter } from "next/navigation";
import useAuthStore from "./_lib/stores/authStore";
import { useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

// Load fonts
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
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const currentPath = router.pathname;

  // Redirect to /login if not authenticated, but not on /login page
  useEffect(() => {
    if (!isAuthenticated && currentPath !== "/login") {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, currentPath, router]);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
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

              {/* Render the Logout button only if authenticated */}
              {isAuthenticated && (
                <li>
                  <button
                    onClick={() => useAuthStore.getState().logout()}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
