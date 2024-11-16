'use client'

import { useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from "axios";

export default function Component({params: { id }}) {
    const [rating, setRating] = useState(0)
    const [result, setResult] = useState({})

    async function getWord() {
        const data = await axios.post("http://localhost:8080/api/game/finishGame")
        setResult(data.data.wordList.filter(w => w.id === id))
    }

    useEffect(() => {
        getWord()
    }, [])

    useEffect(() => {
        console.log(result)
    }, [result]);

    const handleRating = (value) => {
        setRating(value)
    }

    return (
        <div className="bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col justify-between p-6">
            <div className=" flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-blue-800">{result[0]?.estonian}</h1>
            </div>

            <div className="">
                <div className="flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                            key={star}
                            variant="ghost"
                            size="sm"
                            className="p-0 w-8 h-8"
                            onClick={() => handleRating(star)}
                        >
                            <Star
                                className={`w-8 h-8 ${
                                    star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                            />
                            <span className="sr-only">Rate {star} stars</span>
                        </Button>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous word</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next word</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}