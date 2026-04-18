export type ThemeMode = "light" | "dark" | "auto";

export const LEGACY_THEME_STORAGE_KEY = "theme";
export const THEME_COLLECTION_ID = "theme-preferences";
export const THEME_PREFERENCE_ID = "theme";
export const THEME_STORAGE_KEY = "personal-website-theme-preferences";

const THEME_STORAGE_ITEM_KEY = `s:${THEME_PREFERENCE_ID}`;

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "auto";
}

function getModeFromCollectionStorage(
  storageValue: string | null,
): ThemeMode | null {
  if (!storageValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(storageValue);
    const mode =
      typeof parsed === "object" && parsed !== null
        ? (parsed as Record<string, { data?: { mode?: unknown } }>)[
            THEME_STORAGE_ITEM_KEY
          ]?.data?.mode
        : undefined;

    return isThemeMode(mode) ? mode : null;
  } catch {
    return null;
  }
}

function getModeFromLegacyStorage(
  storageValue: string | null,
): ThemeMode | null {
  return isThemeMode(storageValue) ? storageValue : null;
}

export function getLegacyStoredThemeMode(): ThemeMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  return getModeFromLegacyStorage(
    window.localStorage.getItem(LEGACY_THEME_STORAGE_KEY),
  );
}

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "auto";
  }

  return (
    getModeFromCollectionStorage(
      window.localStorage.getItem(THEME_STORAGE_KEY),
    ) ??
    getModeFromLegacyStorage(
      window.localStorage.getItem(LEGACY_THEME_STORAGE_KEY),
    ) ??
    "auto"
  );
}

function getResolvedThemeMode(mode: ThemeMode): "light" | "dark" {
  if (mode !== "auto") {
    return mode;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyThemeMode(mode: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  const resolved = getResolvedThemeMode(mode);
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolved);

  if (mode === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", mode);
  }

  root.style.colorScheme = resolved;
}

export const THEME_INIT_SCRIPT = `(function(){try{var raw=window.localStorage.getItem('${THEME_STORAGE_KEY}');var parsed=raw?JSON.parse(raw):null;var stored=parsed&&typeof parsed==='object'?parsed['${THEME_STORAGE_ITEM_KEY}']?.data?.mode:null;var legacy=window.localStorage.getItem('${LEGACY_THEME_STORAGE_KEY}');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:(legacy==='light'||legacy==='dark'||legacy==='auto')?legacy:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;
