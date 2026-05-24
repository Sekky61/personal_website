import { Link } from "@tanstack/react-router";
import { APP_DATA } from "../lib/metadata/app-data";

export default function HeaderLogo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-0 no-underline text-on-surface transition-colors hover:text-primary"
      aria-label={`${APP_DATA.authorName} home`}
    >
      <svg
        className="h-8 w-[23px] shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-px"
        viewBox="166 211 84 116"
        role="img"
        aria-hidden="true"
      >
        <g transform="translate(250 250) scale(0.35) translate(-250 -250)">
          <path
            d="M 79 400 L 79 253 L 144 322 L 215 248 L 215 400 L 242 400 L 242 168 L 145 270 L 43 163 L 43 400 Z"
            fill="currentColor"
          />
        </g>
      </svg>
      <span className="headline-small -my-1 hidden max-w-0 overflow-hidden whitespace-nowrap py-1 font-semibold tracking-tight transition-[max-width] duration-500 ease-out group-hover:max-w-24 sm:block">
        <span className="inline-block translate-y-1 opacity-0 transition-[translate,opacity] delay-75 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          i
        </span>
        <span className="inline-block translate-y-1 opacity-0 transition-[translate,opacity] delay-100 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          c
        </span>
        <span className="inline-block translate-y-1 opacity-0 transition-[translate,opacity] delay-150 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          h
        </span>
        <span className="inline-block translate-y-1 opacity-0 transition-[translate,opacity] delay-200 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          a
        </span>
        <span className="inline-block translate-y-1 pr-0.5 opacity-0 transition-[translate,opacity] delay-300 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          l
        </span>
      </span>
      <svg
        className="h-8 w-[23px] shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-px"
        viewBox="250 211 84 116"
        role="img"
        aria-hidden="true"
      >
        <g transform="translate(250 250) scale(0.35) translate(-250 -250)">
          <path
            d="M 457 400 L 457 163 L 356 270 L 259 168 L 259 400 L 286 400 L 286 248 L 355 322 L 421 253 L 421 400 Z"
            fill="currentColor"
          />
        </g>
      </svg>
      <span className="headline-small -my-1 hidden max-w-0 overflow-hidden whitespace-nowrap py-1 font-semibold tracking-tight transition-[max-width] delay-100 duration-500 ease-out group-hover:max-w-20 sm:block">
        <span className="inline-block translate-y-1 opacity-0 transition-[translate,opacity] delay-200 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          a
        </span>
        <span className="inline-block translate-y-1 opacity-0 transition-[translate,opacity] delay-300 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          j
        </span>
        <span className="inline-block translate-y-1 opacity-0 transition-[translate,opacity] delay-400 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          e
        </span>
        <span className="inline-block translate-y-1 pr-1 opacity-0 transition-[translate,opacity] delay-500 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          r
        </span>
      </span>
    </Link>
  );
}
