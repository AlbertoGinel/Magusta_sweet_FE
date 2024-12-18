"use client"; // Indicate it's a Client Component

import React, { useState } from "react";
import { useGameStore } from "../_lib/stores/gameStore";

export default function WaitingInput() {
  const state = useGameStore((state) => state);
  const setGameData = useGameStore((state) => state.setGameData); // Import the function to update the game data
  const [humanResponse, setHumanResponse] = useState(""); // State for the input response

  const handleResponseChange = (event) => {
    setHumanResponse(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/game/gameResponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "c38f66aa-d08c-464d-9471-53b2f81c081f", // Your user ID here
            humanResponse: humanResponse, // User's input response
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send response");
      }

      const result = await response.json();
      console.log("Response sent successfully:", result);

      // Update the Zustand store with the game data received from the server
      setGameData(result); // Assuming result contains the updated game data
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  return (
    <div>
      <h1>Waiting Input</h1>
      <p>Type: {state.type}</p>
      <p>Seeds: {state.seeds}</p>
      <p>Word Length: {state.wordLength}</p>
      <p>Initial Sentence: {state.initialSentence}</p>
      <p>Step: {state.step}</p>

      <div>
        <label>
          Your Response:
          <input
            type="text"
            value={humanResponse}
            onChange={handleResponseChange}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Submit Response</button>
    </div>
  );
}
