"use client"; // Indicate it's a Client Component

import React, { useState } from "react";
import useGameStore from "../_lib/stores/gameStore";
import useAuthStore from "../_lib/stores/authStore";
import config from "./config";

export default function PrepareGame() {
  const [length, setLength] = useState(4); // Default length is 4
  const [language, setLanguage] = useState("ESTONIAN"); // Default language
  const [loading, setLoading] = useState(false); // New loading state
  const setGameData = useGameStore((state) => state.setGameData);
  const { token } = useAuthStore(); // Retrieve the token from Zustand store

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "ESTONIAN" ? "ENGLISH" : "ESTONIAN"
    );
  };

  const handlePlay = async () => {
    setLoading(true); // Set loading to true when the play button is pressed

    try {
      const response = await fetch(`${config.baseUrl}/api/game/creategame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify({
          type: language,
          length: parseInt(length, 10), // Convert length to a number
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create game");
      }

      const gameData = await response.json();
      setGameData(gameData); // Update the Zustand store with the game data
    } catch (error) {
      console.error("Error creating game:", error);
    } finally {
      setLoading(false); // Set loading to false once the request is done
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
      {/* Show loading state if the game is being created */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <button onClick={handlePlay}>Play</button>
      )}
    </div>
  );
}
