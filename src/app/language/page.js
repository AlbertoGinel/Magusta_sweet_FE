'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { useGameStore } from "../_lib/stores/gameStore";

const ESTONIAN = "ESTONIAN";
const ENGLISH = "ENGLISH";

export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const router = useRouter();

  const {
    updateGameSettings,
  } = useGameStore();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)

    // Update Zustand store with the game data
    updateGameSettings({
      type: language === 'English' ? ENGLISH : ESTONIAN
    });

    if (language === 'English' || language === 'Estonian') {
      router.push('/creategame');
    } 
  }

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center">
  //     <h1 className="text-4xl text-primary-foreground font-bold mb-8">Choose the language</h1>
  //     <div className="flex space-x-4 mb-8">
  //       <Button
  //         onClick={() => handleLanguageSelect('English')}
  //         variant={selectedLanguage === 'English' ? 'default' : 'outline'}
  //       >
  //         English to Estonian
  //       </Button>
  //       <Button
  //         onClick={() => handleLanguageSelect('Estonian')}
  //         variant={selectedLanguage === 'Estonian' ? 'default' : 'outline'}
  //       >
  //         Estonian to English
  //       </Button>
  //     </div>

  //   </main>
  // )

  return (<div className="flex-1 flex flex-col items-center justify-center space-y-8">
    <div className="text-center space-y-2 justify-end pb-6">
      <h1 className="text-3xl font-bold text-primary">Choose the language</h1>
      <p className="text-slate-600">Here, you can decide what you want to practise</p>
    </div>

    <div className="w-full space-y-4">
      <Button
        onClick={() => handleLanguageSelect('English')}
        className="w-full h-14 text-lg bg-primary text-white"
        variant={selectedLanguage === 'English' ? 'default' : 'outline'}
      >
        English to Estonian
      </Button>
      <Button
        onClick={() => handleLanguageSelect('Estonian')}
        className="w-full h-14 text-lg bg-primary text-white"
        variant={selectedLanguage === 'Estonian' ? 'default' : 'outline'}
      >
        Estonian to English
      </Button>
    </div>
  </div>)
}