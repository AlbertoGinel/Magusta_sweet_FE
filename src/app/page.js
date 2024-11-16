"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "./_lib/stores/gameStore";
import EstonianWord from "./components/EstonianWord";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useRouter } from "next/navigation";

const ESTONIAN = "ESTONIAN";
const ENGLISH = "ENGLISH";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState("noGame");
  const [language, setLanguage] = useState("ESTONIAN");
  const [length, setLength] = useState(4);
  const [text, setText] = useState("");
  const [userSentenceAnswer, setUserSentenceAnswer] = useState("")

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

  const handleLengthChange = (num) => () => {
    setLength(num); // Update the state with the new value
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "ESTONIAN" ? "ENGLISH" : "ESTONIAN"
    );
  };
  const router = useRouter()


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
      router.push("/resolver")

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
        <>
          <div>
            <div className="flex-grow">

              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold">No Game Available</h2>
                <h3>Choose length</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <Card key={number} className={length === number ? "bg-primary/95" : "bg-primary"
                    + " text-white number-card hover:bg-primary/90 "
                  }
                    onClick={handleLengthChange(number)}
                  >
                    <CardContent className="flex items-center justify-center h-32">
                      <span className="text-4xl font-bold">{number}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90"
                          onClick={createGame} disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Game"}
                  </Button>
              </div>
            </div>
          </div>
          <footer className="p-4">
            <div className="container mx-auto flex justify-end">
              <Toggle aria-label="Toggle Language" onClick={toggleLanguage}>
                <span class={language === ESTONIAN ? "fi fi-ee" : "fi fi-us"}></span>
                {language}
              </Toggle>
            </div>
          </footer>
        </>
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
