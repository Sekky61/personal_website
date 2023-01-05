import Link, { LinkProps } from "next/link";

import GithubLogo from "@common/svg/GithubLogo";
import LightSwitch from "@common/svg/LightSwitch";
import { useRouter } from "next/router";
import React, { Children } from "react";
import useDarkMode from "@common/hooks/useDarkMode";

const ThemeSwitch = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const uses_light = colorTheme === "light";

    return (
        <button onClick={() => { uses_light ? setTheme("dark") : setTheme("light") }} type="button" className="mr-5 focus:ring focus:ring-primary-20 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-1.5">
            <LightSwitch uses_light={uses_light}></LightSwitch>
        </button>
    );
}

// Argument for component creation, with added props
type NavLinkProps = React.PropsWithChildren<LinkProps> & {
    activeClassName?: string;
};

// NavLink must have single child
// src: https://frontend-digest.com/how-to-create-navlink-component-in-nextjs-586052e39ba7
const NavLink = ({
    children,
    activeClassName = "navlink-active",
    ...props
}: NavLinkProps) => {
    const { asPath } = useRouter();
    const child = Children.only(children) as React.ReactElement;
    const childClassName = child.props.className || "";

    const isActive = asPath === props.href || asPath === props.as;

    const className = `${childClassName} ${isActive ? activeClassName : ""}`;

    return (
        <Link {...props}>
            {React.cloneElement(child, {
                className: className || null
            })}
        </Link>
    );
};

const Header = () => {
    return (
        <div className="neutral-bg sticky top-0 w-full border-b divide-slate-500 ">
            <div className="bg-primary-40/[.08] px-4">
                <div className="small-container py-3">
                    <div className="flex gap-3 items-center">
                        <Link href="/">
                            <span className="whitespace-nowrap hidden sm:block text-2xl">Michal Majer</span>
                            <span className="whitespace-nowrap sm:hidden text-2xl">Majer</span>
                        </Link>
                        <div className="flex overflow-visible items-center ml-auto text-sm leading-7 overflow-x-auto">
                            <ThemeSwitch></ThemeSwitch>
                            <nav>
                                <ul className="flex space-x-5">
                                    <li>
                                        <NavLink href="/about">
                                            <span className="navlink">About me</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/blog">
                                            <span className="navlink">Blog</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/portfolio">
                                            <span className="navlink">Portfolio</span>
                                        </NavLink>
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
        </div>
    )
}

export default Header