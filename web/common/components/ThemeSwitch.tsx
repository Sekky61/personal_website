"use client";

import { MoonIcon, SunIcon } from "@common/svg/LightSwitch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  // Prerender nothing
  const [client, setClient] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return null;
  }

  const usesLight = resolvedTheme === "light";

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      type="button"
      aria-label="Change theme"
      className="easing-standard duration-short3 focus:ring-3 focus:ring-primary-70 text-primary-40 dark:text-primary-40 hover:bg-primary-95 dark:hover:bg-primary-15 focus:outline-hidden rounded-full text-sm p-1.5"
    >
      {usesLight ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
