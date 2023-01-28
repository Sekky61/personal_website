import Link, { LinkProps } from "next/link";

import GithubLogo from "@common/svg/GithubLogo";
import { useRouter } from "next/router";
import React, { Children } from "react";
import { ThemeSwitch } from "@common/components/ThemeSwitch";

const Hamburger = () => {
    return (
        <div className="w-8 h-8">
            <button className="relative group">
                <div className="relative flex overflow-hidden items-center justify-center rounded-full w-8 h-8 transform transition-all duration-200 shadow-md">
                    <div className="flex flex-col justify-between w-4 h-4 transform transition-all duration-300 origin-center overflow-hidden">
                        <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10"></div>
                        <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75"></div>
                        <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150"></div>
                        <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                            <div className="absolute bg-white h-[2px] w-4 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                            <div className="absolute bg-white h-[2px] w-4 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
                        </div>
                    </div>
                </div>
            </button>
            <input className="hidden" type="checkbox" name="" id="hamburger-checkbox" />
        </div>

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
        <div className="neutral-bg sticky top-0 w-full border-b divide-slate-500 z-10">
            <div className="bg-primary-40/[.08] px-4">
                <div className="small-container py-3">
                    <div className="flex gap-3 items-center">
                        <Link href="/">
                            <span className="whitespace-nowrap hidden sm:block text-2xl">Michal Majer</span>
                            <span className="whitespace-nowrap sm:hidden text-2xl">Majer</span>
                        </Link>
                        <div className="flex-grow">
                        </div>
                        <div>
                            <div className="md:hidden">
                                <Hamburger></Hamburger>
                            </div>
                            <div className="hidden md:flex items-center text-sm">
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
        </div>
    )
}

export default Header