"use client"; // Indicate it's a Client Component

import React, { useEffect, useCallback } from "react";
import { useGameStore } from "../_lib/stores/gameStore";

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

      const gameData = await response.json();

      if (gameData) {
        setGameData(gameData); // Update Zustand store with the fetched game data
      } else {
        setGameData(null); // Set null if no game data is returned
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
      setGameData(null); // Set null if fetch fails
    }
  }, [setGameData]); // Only setGameData is a dependency

  // useEffect to load game data on component mount
  useEffect(() => {
    fetchGameData();

    return () => {
      resetGame(); // Optionally reset the game state when component unmounts
    };
  }, [fetchGameData, resetGame]); // Include fetchGameData in dependencies

  // Render logic based on game state
  if (state.gameData === null) {
    // State 1: No game data, show menu to create a new game
    return (
      <div>
        <h1>Welcome to the Game!</h1>
        <p>No active game found. Please start a new game.</p>
        {/* Include button to create game, e.g., <button onClick={createNewGame}>Create Game</button> */}
      </div>
    );
  } else if (state.step === 1) {
    // State 2: Game data exists, waiting for response
    return (
      <div>
        <h1>Waiting for Response</h1>
        <p>Please wait, your opponent is responding...</p>
      </div>
    );
  } else if (state.step === 2) {
    // State 3: Aftermath
    return (
      <div>
        <h1>Game Over</h1>
        <p>Here are the results:</p>
        {/* Render results and aftermath information */}
      </div>
    );
  }

  return (
    <div>
      <h1>Game</h1>
      <p>Type: {state.type || "Loading..."}</p>
      {/* Render other game information as needed */}
    </div>
  );
}
