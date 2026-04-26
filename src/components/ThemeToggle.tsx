import { useLiveQuery } from "@tanstack/react-db";
import { ClientOnly } from "@tanstack/react-router";
import { Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { themeCollection } from "#/db-collections";
import {
  applyThemeMode,
  getLegacyStoredThemeMode,
  getStoredThemeMode,
  LEGACY_THEME_STORAGE_KEY,
  THEME_PREFERENCE_ID,
  type ThemeMode,
} from "#/lib/theme";

export default function ThemeToggle() {
  return (
    <ClientOnly
      fallback={<ThemeToggleButton label="Theme mode: auto." mode="auto" />}
    >
      <ThemeToggleContent />
    </ClientOnly>
  );
}

function ThemeToggleContent() {
  const { data: themePreference } = useLiveQuery((q) =>
    q.from({ themePreference: themeCollection }).findOne(),
  );
  const [fallbackMode] = useState<ThemeMode>(() => getStoredThemeMode());
  const mode = themePreference?.mode ?? fallbackMode;

  useEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  useEffect(() => {
    if (themePreference) {
      return;
    }

    const legacyMode = getLegacyStoredThemeMode();
    if (!legacyMode) {
      return;
    }

    themeCollection.insert({ id: THEME_PREFERENCE_ID, mode: legacyMode });
    window.localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
  }, [themePreference]);

  useEffect(() => {
    if (mode !== "auto") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [mode]);

  function toggleMode() {
    const nextMode: ThemeMode =
      mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";

    if (themePreference) {
      themeCollection.update(THEME_PREFERENCE_ID, (draft) => {
        draft.mode = nextMode;
      });
      return;
    }

    themeCollection.insert({ id: THEME_PREFERENCE_ID, mode: nextMode });
  }

  const label =
    mode === "auto"
      ? "Theme mode: auto (system). Click to switch to light mode."
      : `Theme mode: ${mode}. Click to switch mode.`;

  const icon =
    mode === "auto" ? (
      <Laptop size={18} />
    ) : mode === "dark" ? (
      <Moon size={18} />
    ) : (
      <Sun size={18} />
    );

  return (
    <ThemeToggleButton
      label={label}
      mode={mode}
      onClick={toggleMode}
      icon={icon}
    />
  );
}

function ThemeToggleButton({
  icon,
  label,
  mode,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  mode: ThemeMode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      data-theme-toggle-mode={mode}
      className="group easing-standard duration-short3 flex h-[48px] w-[48px] items-center justify-center rounded-full text-primary-40 transition hover:bg-primary-95 dark:text-primary-80 dark:hover:bg-primary-15"
    >
      {icon ?? <Laptop size={18} />}
    </button>
  );
}
