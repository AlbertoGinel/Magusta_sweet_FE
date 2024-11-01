"use client";

import { useState } from "react";
import { useGameStore } from "./_lib/stores/gameStore";
import EstonianWord from "./components/EstonianWord";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState("noGame");
  const [language, setLanguage] = useState("ESTONIAN");
  const [length, setLength] = useState(4);
  const [text, setText] = useState("");

  const {
    initialSentence,
    openTime,
    type,
    wordLength,
    seeds,
    updateGameSettings,
    translation,
    estonianWords,
    closeTime,
    humanResponse,
  } = useGameStore(); // Access all the needed values from Zustand

  const handleTextChange = (e) => {
    setText(e.target.value); // Update state with the new text value
  };

  const handleLengthChange = (e) => {
    setLength(Number(e.target.value)); // Update the state with the new value
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "ESTONIAN" ? "ENGLISH" : "ESTONIAN"
    );
  };

  const createGame = async () => {
    setText("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/game/creategame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: language,
          length: length,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create game");
      }

      const data = await res.json();

      // Update Zustand store with the game data
      updateGameSettings({
        initialSentence: data.initialSentence,
        openTime: data.openTime,
        type: data.type,
        wordLength: data.wordLength,
        seeds: data.seeds,
      });

      // Set game state to "gameCreated"
      setGameState("gameCreated");

      console.log("Game created:", data);
    } catch (error) {
      console.error("Error creating game:", error);
    } finally {
      setLoading(false);
    }
  };

  const solveGame = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/game/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          human_response: text,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to resolve the game");
      }

      const data = await res.json();

      updateGameSettings({
        translation: data.translation,
        estonianWords: data.estonianWords,
        closeTime: data.closeTime,
        humanResponse: text,
      });

      // Set game state to "gameCreated"
      setGameState("gameSolved");

      console.log("Game solved:", data);
    } catch (error) {
      console.error("Error creating game:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Conditionally render divs based on the gameState */}
      {gameState === "noGame" && (
        <div>
          <h1>No Game Available</h1>

          <label htmlFor="length">Length</label>
          <input
            type="number"
            id="length"
            name="length"
            min="3"
            max="10"
            value={length}
            onChange={handleLengthChange} // Update state on user input
          />

          <button onClick={toggleLanguage}>
            {language === "ESTONIAN" ? "ENGLISH" : "ESTONIAN"}
          </button>

          <button onClick={createGame} disabled={loading}>
            {loading ? "Creating..." : "Create Game"}
          </button>
        </div>
      )}

      {gameState === "gameCreated" && (
        <div>
          <h1>Game In Progress</h1>
          <div>
            <p>Seeds: {seeds}</p>
            <p>Type: {type}</p>
            <p>Initial Sentence: {initialSentence}</p>
            <p>Word Length: {wordLength}</p>
          </div>

          <div>
            <label htmlFor="textInput">Text Input</label>
            <input
              type="text"
              id="textInput"
              name="textInput"
              value={text} // Controlled value
              onChange={handleTextChange} // Update state on user input
            />
          </div>
          <button onClick={solveGame}>Solve Game</button>
        </div>
      )}

      {gameState === "gameSolved" && (
        <div>
          <h1>Game Solved</h1>
          <p>Initial: {initialSentence}</p>
          <p>You said: {humanResponse}</p>
          <p>Solution: {translation}</p>
          {estonianWords.map((estonianWords, index) => (
            <EstonianWord
              key={index}
              word={estonianWords.word}
              basicForm={estonianWords.basicForm}
              achieved={estonianWords.achieved}
            />
          ))}

          <button onClick={() => setGameState("noGame")}>Reset Game</button>
        </div>
      )}
    </>
  );
}
