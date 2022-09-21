import { Dispatch, SetStateAction, useEffect, useState } from "react";

function get_dark_mode_preference(): string {
    if (typeof window !== "undefined") {
        // In browser
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return "dark";
        } else {
            return "light";
        }
    } else {
        // On server, return default
        return "light";
    }
}

// TailwindCSS uses class tactic when dark mode is to be toggled manually
// https://tailwindcss.com/docs/dark-mode
// When class 'dark' is added to an element, all children are styled in dark mode
function useDarkMode(): [string, Dispatch<SetStateAction<string>>] {
    const theme_pref = get_dark_mode_preference();

    // Initial value
    const [theme, setTheme] = useState(theme_pref);
    const colorTheme = theme === "dark" ? "light" : "dark";

    // By using setTheme, theme gets changed, which triggers useEffect
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        if (typeof window !== "undefined") {
            // Save preference
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return [theme, setTheme];
}

export default useDarkMode;