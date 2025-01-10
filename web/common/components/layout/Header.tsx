import Link from "next/link";

import { linksToDisplay } from "@common/static";
import { GithubLogo } from "@common/svg/GithubLogo";
import React from "react";
import { Hamburger } from "./Hamburger";
import { NavLink } from "./NavLink";

const Header = () => {
  return (
    <header className="sticky top-0 w-full surface z-10 h-[48px]">
      <div className="px-4 gap-3 small-container flex justify-between items-center h-full">
        <Link href="/">
          <div className="whitespace-nowrap headline-small">
            <span className="hidden sm:block">Michal Majer</span>
            <span className="sm:hidden">Majer</span>
          </div>
        </Link>
        <div className="flex md:hidden justify-center items-center">
          <Hamburger />
        </div>
        <div className="h-full hidden md:flex items-center">
          <nav className="h-full">
            <ul className="flex h-full">
              {linksToDisplay.map((link) => {
                return (
                  <li key={link.label}>
                    <NavLink href={link.href} label={link.label} />
                  </li>
                );
              })}
            </ul>
          </nav>
          <a
            className="w-[48px] h-[48px] p-[12px] hover:fill-primary"
            target="_blank"
            href="https://github.com/Sekky61"
            rel="noreferrer noopener"
            title="Personal GitHub page"
          >
            <GithubLogo />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
