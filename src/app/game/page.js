"use client"; // Indicate it's a Client Component

import React, { useEffect, useCallback } from "react";
import useGameStore from "../_lib/stores/gameStore";
import useAuthStore from "../_lib/stores/authStore"; // Corrected import
import PrepareGame from "../components/PrepareGame";
import WaitingInput from "../components/WaitingInput";
import AfterMatch from "../components/AfterMatch";

export default function Game() {
  // Access Zustand stores for game state and actions
  const state = useGameStore((state) => state);
  const setGameData = useGameStore((state) => state.setGameData);
  const resetGame = useGameStore((state) => state.reset);

  // Access the token from the auth store correctly
  const token = useAuthStore((state) => state.token); // Call it like a hook

  // Use useCallback to memoize fetchGameData
  const fetchGameData = useCallback(async () => {
    if (!token) {
      console.error("No token available for authentication");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/game/getgame", {
        method: "GET", // Change to GET method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token in the headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch game data");
      }

      const text = await response.text();
      const gameData = text ? JSON.parse(text) : null;

      if (gameData) {
        setGameData(gameData); // Update Zustand store with the fetched game data
      } else {
        setGameData(null); // Set null if no game data is returned
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
      setGameData(null); // Set null if fetch fails
    }
  }, [token, setGameData]);

  useEffect(() => {
    fetchGameData();

    return () => {
      resetGame(); // Optionally reset the game state when component unmounts
    };
  }, [fetchGameData, resetGame]);

  return (
    <div>
      {state.step === 0 ? (
        <div>
          <PrepareGame />
        </div>
      ) : state.step === 1 ? (
        <div>
          <WaitingInput />
        </div>
      ) : state.step === 2 ? (
        <div>
          <AfterMatch />
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
