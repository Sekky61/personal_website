import Link from "next/link"
import { NextPage } from "next/types"
import useDarkMode from "../hooks/useDarkMode";
import ActiveLink from "./ActiveLink"

const Header: NextPage = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const uses_light = colorTheme === "light";

    return (
        <div className="sticky top-0 w-full border-b divide-slate-500 dark:bg-gray-800">
            <div className="max-w-5xl mx-auto py-3 px-6">
                <div className="flex gap-3 items-center">
                    <Link href="/">
                        <a className="mr-4">
                            <h2>Michal Majer</h2>
                        </a>
                    </Link>
                    <div className="flex items-center ml-auto text-sm leading-7">
                        <button type="button" className="mr-5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-1.5">
                            {uses_light ? (
                                <svg onClick={() => { setTheme("dark") }} id="theme-toggle-dark-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            ) : (
                                <svg onClick={() => { setTheme("light") }} id="theme-toggle-light-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            )}
                        </button>
                        <nav>
                            <ul className="flex space-x-5">
                                <li>
                                    <ActiveLink href="/about">
                                        <a className="navlink">About me</a>
                                    </ActiveLink>
                                </li>
                                <li>
                                    <ActiveLink href="/blog">
                                        <a className="navlink">Blog</a>
                                    </ActiveLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="pl-8 ml-8 border-l">
                            <a target="_blank" href="https://github.com/Sekky61" rel="noreferrer noopener" title="Personal GitHub page">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-black dark:fill-white hover:fill-primary-800">
                                    <path d="M12 0a12 12 0 0 0-3.8 23.39c.6.1.8-.26.8-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.09-.72.09-.72 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.94 0-1.3.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.33 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17a4.63 4.63 0 0 1 1.24 3.22c0 4.61-2.81 5.63-5.48 5.92.43.38.82 1.1.82 2.23v3.29c0 .32.2.7.8.58A12 12 0 0 0 12 0z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header