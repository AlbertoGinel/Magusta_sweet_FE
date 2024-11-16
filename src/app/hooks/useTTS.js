import { useState, useEffect } from "react"

export function useTTS(content) {
    const [speechSynthesis, setSpeechSynthesis] = useState(null)

    useEffect(() => {
        setSpeechSynthesis(window.speechSynthesis)
    }, [setSpeechSynthesis])

    const speakEstonian = () => {
        if (speechSynthesis) {
            const msg = new SpeechSynthesisUtterance()
            const voices = window.speechSynthesis.getVoices()
            const voice = voices.find(voice => /et/.test(voice.lang))

            if (voice) {
                msg.voice = voice
                msg.volume = 1
                msg.rate = 1
                msg.pitch = 1
                msg.text = content
                msg.lang = 'et_EE'
                speechSynthesis.speak(msg)
                return
            } else {
                // TODO: find an Estonian TTS
                msg.text = content
                msg.lang = 'fi_FI'
                speechSynthesis.speak(msg)
            }
        }
    }

    return speakEstonian
}