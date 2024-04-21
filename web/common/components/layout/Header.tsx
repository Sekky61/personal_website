import Link from "next/link";

import { ThemeSwitch } from "@common/components/ThemeSwitch";
import { linksToDisplay } from "@common/static";
import GithubLogo from "@common/svg/GithubLogo";
import React from "react";
import { Hamburger } from "./Hamburger";
import { NavLink } from "./NavLink";

const Header = () => {
  return (
    <div className="neutral-bg sticky top-0 w-full border-b divide-slate-500 z-10 h-14">
      <div className="surface px-4 flex items-center h-full">
        <div className="small-container">
          <div className="flex gap-3 items-center">
            <Link href="/">
              <div className="whitespace-nowrap hidden sm:block text-2xl">
                Michal Majer
              </div>
              <div className="whitespace-nowrap sm:hidden text-2xl mt-1">
                Majer
              </div>
            </Link>
            <div className="flex-grow" />
            <div>
              <div className="md:hidden flex items-center justify-center">
                <Hamburger />
              </div>
              <div className="hidden md:flex items-center text-sm">
                <div className="mr-5">
                  <ThemeSwitch />
                </div>
                <nav>
                  <ul className="flex space-x-5">
                    {linksToDisplay.map((link) => {
                      return (
                        <li key={link.label}>
                          <NavLink href={link.href} label={link.label} />
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="pl-8 ml-8 border-l">
                  <a
                    target="_blank"
                    href="https://github.com/Sekky61"
                    rel="noreferrer noopener"
                    title="Personal GitHub page"
                  >
                    <GithubLogo />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
