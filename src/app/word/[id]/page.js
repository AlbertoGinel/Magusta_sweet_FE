'use client'

import { useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Link } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from "axios";
import { useGameStore } from "../../_lib/stores/gameStore";
import { useParams, useRouter } from 'next/navigation'

const userID = "c38f66aa-d08c-464d-9471-53b2f81c081f"; // User ID

export default function Component({ params: { id } }) {
    const [rating, setRating] = useState(0)
    const [result, setResult] = useState({})

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
    const params = useParams();

    const word = estonianWords.find(({ id }) => id === params.id)

    const router = useRouter()

    const pre = estonianWords[estonianWords.findIndex(({ id }) => id === params.id) - 1]
    const next = estonianWords[estonianWords.findIndex(({ id }) => id === params.id) + 1]
    const [selectedLevels, setSelectedLevels] = useState({}); // Stores the selected level for each word



    // async function getWord() {
    //     const data = await axios.post("http://localhost:8080/api/game/finishGame")
    //     setResult(data.data.wordList.filter(w => w.id === id))
    // }

    // useEffect(() => {
    //     getWord()
    // }, [])

    // useEffect(() => {
    //     console.log(result)
    // }, [result]);

    const handleRating = (value) => {
        setRating(value)

        setSelectedLevels((prevLevels) => ({
            ...prevLevels,
            [word.estonian]: {
                estonian: word.basicForm,
                id: word.basicWordId || word.id,
                level: value,
            },
        }));
    }

    const handleSubmit = async () => {
    
        const wordsList = Object.values(selectedLevels);
        try {
          const response = await fetch(
            process.env.BE_URL + "/api/game/finishGame",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userID: userID,
                wordsList: wordsList,
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

        } catch (error) {
          console.error("Error updating word:", error);
        }
      };

    const handleLeftClick = () => {
        pre && router.push(`/word/${pre.id}`)
    }

    const handleRightClick = () => {
        next && router.push(`/word/${next.id}`)
    }

    return (
        <div className="flex flex-col justify-between p-6">
            <div className=" flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-primary">{word?.estonian}</h1>
                <p className="text-2xl text-foreground">{word?.englishTranslation}</p>
            </div>

            <div className="">
                <div className="flex justify-center">
                    {[1, 2, 3, 4, 5, 6].map((star) => (
                        <Button
                            key={star}
                            variant="ghost"
                            size="sm"
                            className="p-0 w-8 h-8"
                            onClick={() => handleRating(star)}
                        >
                            <Star
                                className={`w-20 h-20 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'
                                    }`}
                            />
                            <span className="sr-only">Rate {star} stars</span>
                        </Button>
                    ))}
                </div>


                <div className="flex justify-between items-center">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={handleLeftClick}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous word</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={handleRightClick}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next word</span>
                    </Button>
                </div>

                <div className='pt-20'>

                    <Button
                        onClick={handleSubmit}
                        className="w-full h-14 text-lg bg-primary text-white"
                    >
                        save
                    </Button>
                </div>
            </div>
        </div>
    )
}