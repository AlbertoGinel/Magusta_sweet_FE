"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/app/_lib/stores/gameStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Volume2 } from 'lucide-react';
import { useTTS } from "../hooks/useTTS";

const ESTONIAN = "ESTONIAN";

export default function ResolverPage() {
    const {
        initialSentence,
        updateGameSettings,
        setHumanResponse,
        type,
    } = useGameStore();
    const [text, setText] = useState("");
    const [_, setLoading] = useState(false);

    const speak = useTTS(initialSentence)

    const handleTextChange = (e) => {
        setText(e.target.value); // Update state with the new text value
    };

    const router = useRouter()

    // useEffect(() => {
    //     if (initialSentence === "") {
    //         router.push("/")
    //     }
    // }, [initialSentence, router]);

    const solveGame = async () => {
        setLoading(true);
        try {
            const res = await fetch(process.env.BE_URL + "/api/game/resolve", {
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
            router.push("/result")
        }
    };

    return (
        <div>
            <div className="flex-grow">
                <div className="text-center flex flex-col flex-grow justify-end">
                    <h2 className="text-4xl font-bold mb-20">Game In Progress</h2>
                </div>

                <div className="p-4 h-[400px]">
                    <Card className="p-4 shadow-sm mb-10">
                        <p className="text-2xl text-center break-words">{initialSentence}

                            {type === ESTONIAN &&
                                (
                                    <Button onClick={speak} className="ml-2">
                                        <Volume2 style={{ marginRight: '8px' }} />
                                    </Button>
                                )
                            }
                        </p>

                    </Card>


                    <div className="relative flex flex-col">
                        <Input
                            type="text"
                            placeholder="Enter your translation"
                            value={text}
                            onChange={handleTextChange}
                            className="w-full bg-white"
                            id="textInput"
                            name="textInput"
                        />

                        <Button size="lg" className="m-8 bg-primary text-white hover:bg-primary/90"
                            onClick={solveGame}
                        >
                            Solve Game
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}