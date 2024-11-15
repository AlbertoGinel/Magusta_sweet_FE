// src/app/login/page.js
"use client";
import { useState } from "react";
import useAuthStore from "../_lib/stores/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await login(username, password); // Call login with username and password
      router.push("/game"); // Redirect to /game on successful login
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
