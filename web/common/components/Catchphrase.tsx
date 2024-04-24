"use client";

import { useEffect, useState } from "react";

const catchPhrases = [
  "Coconut Connoisseur by Day, Code Wizard by Night!",
  "Turning Coconuts into Code, One Byte at a Time!",
  "Now with Extra Quirkiness!",
  "Now Available with a Lifetime Supply of Innovation!",
  "Just build lol",
  "Now with 20% less bugs!*",
  "Now with 20% more bugs!*",
  '"Prolog is my passion" - Someone, probably',
];

export const Catchphrase = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const randomCatchPhrase =
    catchPhrases[Math.floor(Math.random() * catchPhrases.length)];

  return (
    <>
      {client ? (
        <div className="text-2xl ml-8 p-4 tertiary-cont rounded-bl-xl font-semibold">
          {randomCatchPhrase}
        </div>
      ) : null}
    </>
  );
};
