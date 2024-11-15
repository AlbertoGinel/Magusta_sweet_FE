// src/app/page.js
"use client"; // Needed for client-side code like Zustand and useEffect
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "./_lib/stores/authStore";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push("/game");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Optional: Show a loading screen or remain transparent while redirecting
  return null;
}
