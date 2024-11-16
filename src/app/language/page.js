'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const router = useRouter();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)

    if (language === 'English') {
        router.push('/creategame');
      } else if (language === 'Estonian') {
        router.push('/creategame');
      }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl text-blue-500 font-bold mb-8">Please choose language to play</h1>
      <div className="flex space-x-4 mb-8">
        <Button
          onClick={() => handleLanguageSelect('English')}
          variant={selectedLanguage === 'English' ? 'default' : 'outline'}
        >
          English to Estonian
        </Button>
        <Button
          onClick={() => handleLanguageSelect('Estonian')}
          variant={selectedLanguage === 'Estonian' ? 'default' : 'outline'}
        >
          Estonian to English
        </Button>
      </div>
      
    </main>
  )
}