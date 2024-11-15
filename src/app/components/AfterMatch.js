"use client"; // Indicate it's a Client Component

import React, { useState } from "react";
import useGameStore from "../_lib/stores/gameStore";
import useAuthStore from "../_lib/stores/authStore"; // Import useAuthStore to access the token
import PrepareGame from "./PrepareGame";
import WaitingInput from "./WaitingInput";

export default function AfterMatch() {
  const state = useGameStore((state) => state); // Access Zustand store state
  const [selectedLevels, setSelectedLevels] = useState({}); // Stores the selected level for each word
  const { token } = useAuthStore(); // Access token from Zustand store

  // Function to handle button clicks
  const handleButtonClick = (value, word) => {
    const levelMap = {
      50: 1,
      100: 2,
      500: 3,
      1000: 4,
      "1000+": 5,
      "1000lock": 6,
    };
    const level = levelMap[value];

    setSelectedLevels((prevLevels) => ({
      ...prevLevels,
      [word.estonian]: {
        estonian: word.basicForm,
        id: word.basicWordId || word.id,
        level: level,
      },
    }));
  };

  // Check if all words have a selected level
  const allWordsSelected = state.estonianWords.every(
    (word) => selectedLevels[word.estonian]
  );

  const handleSubmit = async () => {
    if (!allWordsSelected) return;

    const wordsList = Object.values(selectedLevels);
    try {
      const response = await fetch(
        "http://localhost:8080/api/game/finishGame",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token in Authorization header
          },
          body: JSON.stringify({
            wordsList: wordsList, // Send the selected word levels
          }),
        }
      );

      // Handle different response scenarios
      const text = await response.text(); // Read the response as text

      if (!response.ok) {
        // Handle error response
        throw new Error(`Failed to update personal words: ${text}`);
      }

      // Attempt to parse JSON only if the response is not empty
      const result = text ? JSON.parse(text) : {}; // Safely parse if there's content
      console.log("Words updated successfully:", result);

      // Reset step to 0 after successful submission
      state.setStep(0);
    } catch (error) {
      console.error("Error updating words:", error);
    }
  };

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
          <h1>Aftermatch</h1>
          <h2>Game Summary</h2>
          <p>
            <strong>Type:</strong> {state.type}
          </p>
          <p>
            <strong>Word Length:</strong> {state.wordLength}
          </p>
          <p>
            <strong>Initial Sentence:</strong> {state.initialSentence}
          </p>
          <p>
            <strong>Your Response:</strong> {state.humanResponse}
          </p>
          <p>
            <strong>Translation:</strong> {state.translation}
          </p>
          <p>
            <strong>Total Points:</strong> {state.totalPoints}
          </p>
          <p>Step: {state.step}</p>

          <h2>Estonian Words</h2>
          {state.estonianWords && state.estonianWords.length > 0 ? (
            <ul>
              {state.estonianWords.map((word, index) => (
                <li
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "5px 0",
                  }}
                >
                  <strong>English Translation:</strong>{" "}
                  {word.englishTranslation}
                  <br />
                  <strong>Parts:</strong> {word.parts}
                  <br />
                  <strong>Estonian:</strong> {word.estonian}
                  <br />
                  <strong>Type:</strong> {word.type}
                  <br />
                  <strong>Case:</strong> {word.case_D}
                  <br />
                  <strong>Number:</strong> {word.number}
                  <br />
                  <strong>Basic Form:</strong> {word.basicForm}
                  <br />
                  <strong>Tense:</strong> {word.tense}
                  <br />
                  <strong>Person:</strong> {word.person}
                  <br />
                  <strong>Degree:</strong> {word.degree}
                  <br />
                  <div style={{ marginTop: "10px" }}>
                    {/* Buttons for score selection */}
                    {["50", "100", "500", "1000", "1000+", "1000lock"].map(
                      (value) => (
                        <button
                          key={value}
                          onClick={() => handleButtonClick(value, word)}
                          style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                            backgroundColor:
                              selectedLevels[word.estonian]?.level ===
                              (value === "50"
                                ? 1
                                : value === "100"
                                ? 2
                                : value === "500"
                                ? 3
                                : value === "1000"
                                ? 4
                                : value === "1000+"
                                ? 5
                                : 6)
                                ? "#4CAF50"
                                : "#ccc",
                            color: "white",
                          }}
                        >
                          {value}
                        </button>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Estonian words to display.</p>
          )}

          {/* Submit button at the end of the page */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handleSubmit}
              disabled={!allWordsSelected}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: allWordsSelected ? "#4CAF50" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: allWordsSelected ? "pointer" : "not-allowed",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
