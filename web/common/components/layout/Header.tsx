import Link, { LinkProps } from "next/link";

import GithubLogo from "@common/svg/GithubLogo";
import { useRouter } from "next/router";
import React, { Children } from "react";
import { ThemeSwitch } from "@common/components/ThemeSwitch";

const linksToDisplay = [
    {
        href: "/about",
        label: "About me",
    },
    {
        href: "/blog",
        label: "Blog",
    },
    {
        href: "/portfolio",
        label: "Portfolio",
    },
];

const Hamburger = () => {
    // State for opening menu
    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const links = linksToDisplay.map((link) => {
        return (
            <li key={link.href} className="font-bold">
                <a href={link.href}>{link.label}</a>

            </li>
        );
    });

    return (
        <>
            <button className="w-8 h-8 relative group" onClick={openModal}>
                <div className="relative flex overflow-hidden items-center justify-center rounded-full w-8 h-8 shadow-md">
                    <div className="flex flex-col justify-between w-4 h-4 overflow-hidden">
                        <div className="bg-white h-[2px] w-7 origin-left"></div>
                        <div className="bg-white h-[2px] w-7 rounded"></div>
                        <div className="bg-white h-[2px] w-7 origin-left"></div>
                        <div className="absolute items-center justify-between top-2.5 -translate-x-10 flex w-0">
                            <div className="absolute bg-white h-[2px] w-4"></div>
                            <div className="absolute bg-white h-[2px] w-4"></div>
                        </div>
                    </div>
                </div>
            </button>
            <input className="hidden" type="checkbox" name="displayDropdown" id="hamburger-checkbox" />
            {open &&
                <div className="fixed z-50 inset-0 md:hidden">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
                        <div className="fixed w-full top-4 right-4 bg-neutral-99 dark:bg-neutral-10 rounded-lg max-w-xs shadow-lg p-6 pt-8">
                            <button onClick={closeModal} className="absolute top-4 right-4">
                                <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <ul className="space-y-6 pb-5">
                                {links}
                            </ul>
                            <div className="pt-4 mt-4 border-t border-neutral-10 dark:border-neutral-99 flex items-center">
                                <span className="pr-2">Switch theme</span>
                                <ThemeSwitch></ThemeSwitch>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
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

    const navLinks = linksToDisplay.map((link) => {
        return (
            <li>
                <NavLink href={link.href}>
                    <span className="navlink">{link.label}</span>
                </NavLink>
            </li>
        );
    });


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
                                        {navLinks}
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