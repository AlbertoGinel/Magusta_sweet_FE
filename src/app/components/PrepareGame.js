"use client"; // Indicate it's a Client Component

import React, { useState } from "react";
import { useGameStore } from "../_lib/stores/gameStore";

export default function PrepareGame() {
  const [length, setLength] = useState(4); // Default length is 4
  const [language, setLanguage] = useState("ESTONIAN"); // Default language
  const setGameData = useGameStore((state) => state.setGameData);

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "ESTONIAN" ? "ENGLISH" : "ESTONIAN"
    );
  };

  const handlePlay = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/game/creategame",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: language,
            length: parseInt(length, 10), // Convert length to a number
            user: "c38f66aa-d08c-464d-9471-53b2f81c081f", // Your user ID here
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create game");
      }

      const gameData = await response.json();
      setGameData(gameData); // Update the Zustand store with the game data
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div>
      <h1>Prepare Game</h1>
      <div>
        <label>
          Length:
          <input
            type="number"
            value={length}
            onChange={handleLengthChange}
            min="1" // Set a minimum value if needed
          />
        </label>
      </div>
      <div>
        <label>
          Language: {language}
          <button onClick={toggleLanguage}>Toggle Language</button>
        </label>
      </div>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
}
