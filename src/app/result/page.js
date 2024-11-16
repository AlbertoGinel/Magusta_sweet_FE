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
    <div className="min-h-screen bg-none px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-4">
          <div className="bg-foreground rounded-lg p-4">
            <h2 className="text-white text-sm font-medium mb-2">Original sentence</h2>
            <Card className="p-3 bg-white shadow-sm">
              <p className="text-slate-900">{initialSentence}</p>
            </Card>
          </div>

          <div className="bg-foreground rounded-lg p-4">
            <h2 className="text-white text-sm font-medium mb-2">Your answer</h2>
            <Card className="p-3 bg-white shadow-sm">
              <p className="text-slate-900">{humanResponse}</p>
            </Card>
          </div>

          <div className="bg-foreground rounded-lg p-4">
            <h2 className="text-white text-sm font-medium mb-2">Solution</h2>
            <Card className="p-3 bg-white shadow-sm">
              <p className="text-slate-900">{translation}</p>
            </Card>
          </div>

          <Card className="p-4 bg-white shadow-sm">
            <div className="space-y-2">
              <div className={'flex flex-col items-center justify-center'}>
                {estonianWords.map((r, idx) =>
                  <div onClick={() => router.push(`/word/${r.id}`)} className={'text-xl border shadow-md w-11/12 m-4 text-center flex justify-center items-center'} key={idx}>
                    {r.estonian + " - " + r.englishTranslation}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}