import { useEffect, useState } from 'react'

const catchPhrases = [
  'Coconut connoisseur by day, code wizard by night!',
  'Turning coconuts into code, one byte at a time!',
  'Now with extra quirkiness!',
  'Now available with a lifetime supply of innovation!',
  'Just build, lol',
  'Now with 20% fewer bugs!*',
  'Now with 20% more bugs!*',
  "'Prolog is my passion' - someone, probably",
]

export function Catchphrase() {
  const [phrase, setPhrase] = useState('')

  useEffect(() => {
    const randomPhrase =
      catchPhrases[Math.floor(Math.random() * catchPhrases.length)]

    setPhrase(randomPhrase)
  }, [])

  return (
    <div className="tertiary-container font-slanted ml-8 min-w-16 rounded-bl-xl p-4 text-2xl font-semibold">
      {phrase}
    </div>
  )
}
