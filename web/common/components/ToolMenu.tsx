"use client"; // useTheme

import { cn } from "@common/utils/cn";
import { useTheme } from "next-themes";
import type React from "react";

interface MenuProps {
  className?: string;
}

const theme_icons = {
  light: "light_mode",
  dark: "dark_mode",
  system: "contrast",
} as Partial<Record<string, string>>;
const default_theme_icon = "question_mark";

export const ToolMenu: React.FC<MenuProps> = ({ className }) => {
  const { themes, resolvedTheme, setTheme } = useTheme();

  return (
    <div className={className}>
      <div className="tertiary-container rounded-full p-2 flex flex-col gap-2">
        {themes.map((theme) => (
          <div
            key={theme}
            className="flex justify-center items-center rounded-full aspect-square w-9 has-checked:primary-container has-checked:elevation-2"
          >
            <input
              type="radio"
              id={theme}
              name="theme"
              value={theme}
              checked={resolvedTheme === theme}
              onChange={() => setTheme(theme)}
              hidden
            />
            <label htmlFor={theme} className="w-full h-full">
              <ToolMenuButton icon={theme_icons[theme] ?? default_theme_icon} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ButtonProps {
  icon: string;
}

const ToolMenuButton: React.FC<ButtonProps> = ({ icon }) => {
  return (
    <div id="menu-toggle" className="cursor-pointer hover:elevation-1 w-full h-full rounded-full flex justify-center items-center">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
  );
};
