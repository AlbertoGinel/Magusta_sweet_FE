"use client"; // Indicate it's a Client Component

import React, { useEffect, useCallback } from "react";
import { useGameStore } from "../_lib/stores/gameStore";
import PrepareGame from "../components/PrepareGame";
import WaitingInput from "../components/WaitingInput";
import AfterMatch from "../components/AfterMatch";

export default function Game() {
  // Access Zustand store states and actions
  const state = useGameStore((state) => state);
  const setGameData = useGameStore((state) => state.setGameData);
  const resetGame = useGameStore((state) => state.reset);

  // Use useCallback to memoize fetchGameData
  const fetchGameData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/game/getgame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "c38f66aa-d08c-464d-9471-53b2f81c081f", // Use the actual user ID here
        }),
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
  }, [setGameData]);

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
