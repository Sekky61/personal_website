"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};

// NavLink must have single child
// src: https://frontend-digest.com/how-to-create-navlink-component-in-nextjs-586052e39ba7
export const NavLink = ({ href, label }: NavLinkProps) => {
  const path = usePathname();
  const isActive = path === href;
  const cls = clsx(
    "font-semibold duration-150 px-3 py-1.5 rounded-md hover:bg-secondary-90 dark:hover:bg-secondary-20 active:bg-secondary-80 dark:active:bg-secondary-30 whitespace-nowrap focus-within:ring-2 focus-within:ring-primary-40",
    isActive && "bg-secondary-90 dark:bg-secondary-20",
  );

  return (
    <Link className={cls} href={href}>
      {label}
    </Link>
  );
};
