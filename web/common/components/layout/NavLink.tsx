"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
	href: string;
	children: React.ReactNode;
};

// NavLink must have single child
// src: https://frontend-digest.com/how-to-create-navlink-component-in-nextjs-586052e39ba7
export const NavLink = ({ href, children }: NavLinkProps) => {
	const path = usePathname();
	const isActive = path === href;
	const cls = clsx("navlink", isActive && "navlink-active");

	return (
		<Link className={cls} href={href}>
			{children}
		</Link>
	);
};
