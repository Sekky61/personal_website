import { Link } from "@tanstack/react-router";
import { Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { APP_DATA } from "../lib/metadata/app-data";
import HeaderLogo from "./HeaderLogo";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  {
    to: "/about",
    label: "About me",
  },
  {
    to: "/blog",
    label: "Blog",
  },
  {
    to: "/portfolio",
    label: "Portfolio",
  },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 surface border-b border-surface-variant/70 backdrop-blur-sm">
      <div className="small-container flex h-[56px] items-center justify-between gap-3 px-4">
        <HeaderLogo />

        <div className="hidden h-full items-center md:flex">
          <nav className="h-full">
            <ul className="flex h-full items-center">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="label-medium shape-full mx-2 flex h-full items-center px-3 py-1.5 no-underline transition-colors hover:bg-secondary-90 dark:hover:bg-secondary-20"
                    activeProps={{
                      className:
                        "label-medium shape-full mx-2 flex h-full items-center px-3 py-1.5 no-underline secondary-container",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            className="ml-2 flex h-[48px] w-[48px] items-center justify-center rounded-full hover:bg-secondary-90 dark:hover:bg-secondary-20"
            target="_blank"
            href={APP_DATA.githubUrl}
            rel="noreferrer noopener"
            title="Personal GitHub page"
          >
            <Github size={20} />
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full hover:bg-secondary-90 dark:hover:bg-secondary-20"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-surface-variant/70 px-4 py-4 md:hidden">
          <div className="small-container surface-container-low elevation-1 shape-medium p-4">
            <nav>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="label-large block rounded-xl px-4 py-3 no-underline hover:bg-secondary-90 dark:hover:bg-secondary-20"
                      activeProps={{
                        className:
                          "label-large block rounded-xl px-4 py-3 no-underline secondary-container",
                      }}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={APP_DATA.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label-large flex items-center gap-3 rounded-xl px-4 py-3 no-underline hover:bg-secondary-90 dark:hover:bg-secondary-20"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
