"use client";

import { MoonIcon, SunIcon } from "@common/svg/LightSwitch";
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const usesLight = resolvedTheme === "light";

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      type="button"
      aria-label="Change theme"
      className="focus:ring focus:ring-primary-70 text-primary-40 dark:text-primary-40 hover:bg-gray-100 dark:hover:bg-primary-20 focus:outline-none rounded-full text-sm p-1.5"
    >
      {usesLight ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
