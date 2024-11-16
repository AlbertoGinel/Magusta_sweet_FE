"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlignLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useGameStore } from "../_lib/stores/gameStore";


const NewStyleCreateGame = () => {
    const [selectedLength, setSelectedLength] = useState(null)
    const [loading, setLoading] = useState(false);
    const [gameState, setGameState] = useState("noGame");
    const [language, setLanguage] = useState("ESTONIAN");
    const [text, setText] = useState("");

    const router = useRouter();

    const {
      updateGameSettings,
    } = useGameStore();


    const lengths = [3, 4, 5, 6]
    const colors = [
        'bg-red-500 hover:bg-red-600',
        'bg-blue-500 hover:bg-blue-600',
        'bg-green-500 hover:bg-green-600',
        'bg-yellow-500 hover:bg-yellow-600',
        'bg-purple-500 hover:bg-purple-600',
        'bg-pink-500 hover:bg-pink-600',
        'bg-indigo-500 hover:bg-indigo-600',
        'bg-teal-500 hover:bg-teal-600'
    ]

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




    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center shadow-none bg-none border-none">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Choose a Number</CardTitle>
          <p className="text-muted-foreground">Select the number of words in a sentense</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {lengths.map((length) => (
              <Button
                key={length}
                className={`h-28 w-28 text-lg hover:scale-105 transition-transform text-white border-none rounded-[20px] ${selectedLength === length ? 'ring-4 ring-white ring-opacity-60' : ''}`}
                onClick={() => setSelectedLength(length)}
              >
                <div className="space-y-2">
                  <span>{length}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-6">
          <Button 
            size="lg" 
            className="w-full md:w-auto px-8"
            disabled={!selectedLength}
            onClick={createGame}
          >
            Start Game
          </Button>
        </CardFooter>
      </div>
    );
}

export default NewStyleCreateGame;