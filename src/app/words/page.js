"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Words() {

    const [result, setResult] = useState([])

    async function getWord() {
        const data = await axios.post("http://localhost:8080/api/game/finishGame")
        setResult(data.data)
    }

    useEffect(() => {
        getWord()
    }, [])

    const router = useRouter()

    return (
        <div className={'flex flex-col items-center justify-center'}>
            {result?.wordList?.map((r, idx) =>
                <div onClick={() => router.push(`/word/${r.id}`)} className={'text-xl border shadow-md w-11/12 m-4 text-center flex justify-center items-center'} key={idx}>
                    {r.estonian}
                </div>
            )}
        </div>
    )
}