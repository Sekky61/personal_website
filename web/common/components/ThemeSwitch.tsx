"use client";

import { MoonIcon, SunIcon } from "@common/svg/LightSwitch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  // Prerender nothing
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return null;
  }

  const { resolvedTheme, setTheme } = useTheme();
  const usesLight = resolvedTheme === "light";

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      type="button"
      aria-label="Change theme"
      className="focus:ring focus:ring-primary-70 text-primary-40 dark:text-primary-40 hover:bg-primary-95 dark:hover:bg-primary-15 focus:outline-none rounded-full text-sm p-1.5"
    >
      {usesLight ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
