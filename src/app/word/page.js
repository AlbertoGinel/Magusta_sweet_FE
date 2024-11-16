'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Component() {
  const [rating, setRating] = useState(0)

  const handleRating = (value) => {
    setRating(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col justify-between p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-800">Bonjour</h1>
        <p className="text-2xl text-blue-600">Hello</p>
      </div>
      
      <div className="space-y-8">
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