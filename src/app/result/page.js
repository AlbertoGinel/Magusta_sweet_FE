"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGameStore } from "../_lib/stores/gameStore";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Result() {
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
    totalPoints
  } = useGameStore(); // Access all the needed values from Zustand

  const router = useRouter()

  const onGoToWords = useCallback(() => {
    router.push("/words")
  }, [router])

  return (
    <div className=" bg-gray-100 p-4 flex flex-col">
      <Card className="w-full max-w-md mx-auto flex-grow flex flex-col">
        <div className="p-4 flex-grow">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Original Sentence:</h2>
            <p className="text-gray-700">{initialSentence}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Correct Translation:</h2>
            <p className="text-green-600">{translation}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Your Translation:</h2>
            <p className="text-blue-600">{humanResponse}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Your Score:</h2>
            <div className="flex items-center">
              <span className="ml-2 text-lg font-semibold">{totalPoints}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 flex justify-end">
          <Button onClick={onGoToWords}>Show Words</Button>
        </div>
      </Card>
    </div>
  )
}