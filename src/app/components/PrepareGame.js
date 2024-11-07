"use client"; // Indicate it's a Client Component

import React, { useCallback, useState } from "react";
import { useGameStore } from "../_lib/stores/gameStore";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"

const ESTONIAN = "ESTONIAN";
const ENGLISH = "ENGLISH";

export default function PrepareGame() {
  const [length, setLength] = useState(4); // Default length is 4
  const [language, setLanguage] = useState(ESTONIAN); // Default language
  const setGameData = useGameStore((state) => state.setGameData);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === ESTONIAN ? ENGLISH : ESTONIAN
    );
  };

  const handlePlay = useCallback(async () => {
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
  }, [language, length, setGameData]);

  const handleCardClick = (number) => () => {
    setLength(number);
  }


  return (
    <>
      <div className="flex-grow">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Prepare Game</h2>
          <h3>Choose length</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[4, 5, 6, 7].map((number) => (
            <Card key={number} className="bg-primary text-white number-card hover:bg-primary/90" onClick={handleCardClick(number)}>
              <CardContent className="flex items-center justify-center h-32">
                <span className="text-4xl font-bold">{number}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90" onClick={handlePlay}>
            Play
          </Button>
        </div>
      </div>

      <footer className="p-4">
        <div className="container mx-auto flex justify-end">
          <Toggle aria-label="Toggle Language" onClick={toggleLanguage}>
            <span class={language === ESTONIAN? "fi fi-ee": "fi fi-us"}></span>
            Toggle Language
          </Toggle>
        </div>
      </footer>
    </>
  )
}
