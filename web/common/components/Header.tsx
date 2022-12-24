import Link from "next/link";

import useDarkMode from "../hooks/useDarkMode";
import ActiveLink from "./ActiveLink";
import GithubLogo from "@common/svg/GithubLogo";
import LightSwitch from "@common/svg/LightSwitch";

const ThemeSwitch = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const uses_light = colorTheme === "light";

    return (
        <button onClick={() => { uses_light ? setTheme("dark") : setTheme("light") }} type="button" className="mr-5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-1.5">
            <LightSwitch uses_light={uses_light}></LightSwitch>
        </button>
    );
}

// todo mobile sizes
const Header = () => {
    return (
        <div className="sticky top-0 w-full px-4 border-b divide-slate-500 dark:text-white bg-white dark:bg-dark">
            <div className="small-container mx-auto py-3">
                <div className="flex gap-3 items-center">
                    <Link href="/">
                        <span className="whitespace-nowrap hidden sm:block text-2xl">Michal Majer</span>
                        <span className="whitespace-nowrap sm:hidden text-2xl">Majer</span>
                    </Link>
                    <div className="flex items-center ml-auto text-sm leading-7 overflow-x-auto">
                        <ThemeSwitch></ThemeSwitch>
                        <nav>
                            <ul className="flex space-x-5">
                                <li>
                                    <ActiveLink href="/about">
                                        <span className="navlink">About me</span>
                                    </ActiveLink>
                                </li>
                                <li>
                                    <ActiveLink href="/blog">
                                        <span className="navlink">Blog</span>
                                    </ActiveLink>
                                </li>
                                <li>
                                    <ActiveLink href="/portfolio">
                                        <span className="navlink">Portfolio</span>
                                    </ActiveLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="pl-8 ml-8 border-l">
                            <a target="_blank" href="https://github.com/Sekky61" rel="noreferrer noopener" title="Personal GitHub page">
                                <GithubLogo></GithubLogo>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header