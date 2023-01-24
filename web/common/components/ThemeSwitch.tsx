import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@common/svg/LightSwitch";

export const ThemeSwitch = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true) }, []);

    if (!mounted) return <></>;

    const usesLight = resolvedTheme === "light";

    return (
        <button onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }} type="button" className="mr-5 focus:ring focus:ring-primary-70 text-primary-40 dark:text-primary-40 hover:bg-gray-100 dark:hover:bg-primary-20 focus:outline-none rounded-full text-sm p-1.5">
            {usesLight ? <SunIcon /> : <MoonIcon />}
        </button>
    );
}