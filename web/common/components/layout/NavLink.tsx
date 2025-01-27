"use client";

import { cn } from "@common/utils/cn";
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
  const cls = cn(
    "label-medium shape-full flex justify-center w-[80px] whitespace-nowrap easing-standard duration-short3 mx-2 px-3 py-1.5 group-hover:bg-secondary-90 dark:group-hover:bg-secondary-20 group-active:bg-secondary-80 dark:group-active:bg-secondary-30 group-focus-within:ring-2 group-focus-within:ring-primary-40",
    isActive && "secondary-container",
  );

  return (
    <Link
      className="group focus-visible:outline-none h-full flex items-center"
      href={href}
    >
      <div className={cls}>{label}</div>
    </Link>
  );
};
