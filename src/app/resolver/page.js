"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/app/_lib/stores/gameStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResolverPage() {
    const {
        initialSentence,
        updateGameSettings,
        setHumanResponse
    } = useGameStore();
    const [text, setText] = useState("");
    const [_, setLoading] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value); // Update state with the new text value
    };

    const router = useRouter()

    useEffect(() => {
        if (initialSentence === "") {
            router.push("/")
        }
    }, [initialSentence, router]);

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

            // for mock
            setHumanResponse(text)

            console.log("Game solved:", data);
        } catch (error) {
            console.error("Error creating game:", error);
        } finally {
            setLoading(false);
            router.push("/solved")
        }
    };

    return (
        <div>
            <div className="flex-grow">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">Game In Progress</h2>
                </div>

                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <p className="text-2xl mb-8 text-center">{initialSentence}</p>

                    <Input
                        type="text"
                        placeholder="Enter your translation"
                        value={text}
                        onChange={handleTextChange}
                        className="max-w-md w-full"
                        id="textInput"
                        name="textInput"
                    />

                       <Button size="lg" className="m-8 bg-primary text-white hover:bg-primary/90"
                               onClick={solveGame}
                       >
                           Solve Game
                       </Button>
                </main>
            </div>
        </div>
    )
}