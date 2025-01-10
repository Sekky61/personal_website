"use client"; // useTheme

import { cn } from "@common/utils/cn";
import { useTheme } from "next-themes";
import type React from "react";

interface MenuProps {
  className?: string;
}

export const ToolMenu: React.FC<MenuProps> = ({ className }) => {
  const { themes, resolvedTheme, setTheme } = useTheme();

  return (
    <div className={cn(className)}>
      <button
        type="button"
        id="menu-toggle"
        className="primary-container p-3 aspect-square"
      >
        <span className="material-symbols-outlined">settings</span>
      </button>
      <ul className="menu-options">
        {themes.map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              id={theme}
              name="theme"
              value={theme}
              checked={resolvedTheme === theme}
              onChange={() => setTheme(theme)}
            />
            <label htmlFor={theme}>{theme}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
