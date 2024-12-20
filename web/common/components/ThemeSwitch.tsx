"use client";

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
      className="group easing-standard duration-short3 w-[48px] h-[48px] p-[6px] text-primary-40 dark:text-primary-40"
    >
      <span className="material-symbols-outlined p-[6px] group-focus:ring-3 group-focus:ring-primary-70 hover:bg-primary-95 dark:hover:bg-primary-15 focus:outline-hidden rounded-full">
        {usesLight ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};
