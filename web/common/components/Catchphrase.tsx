"use client";

import { useEffect, useState } from "react";

const catchPhrases = [
  "Coconut connoisseur by day, code wizard by night!",
  "Turning coconuts into code, one byte at a time!",
  "Now with extra quirkiness!",
  "Now available with a lifetime supply of innovation!",
  "Just build, lol",
  "Now with 20% fewer bugs!*",
  "Now with 20% more bugs!*",
  "'Prolog is my passion' - someone, probably",
];

/** Client component so that it is random each time */
export const Catchphrase = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const randomCatchPhrase =
    catchPhrases[Math.floor(Math.random() * catchPhrases.length)];

  return (
    <div className="min-w-16 text-2xl slanted ml-8 p-4 tertiary-cont rounded-bl-xl font-semibold">
      {client ? randomCatchPhrase : null}
    </div>
  );
};
