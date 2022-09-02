// src: https://frontend-digest.com/how-to-create-navlink-component-in-nextjs-586052e39ba7

import React, { Children } from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";

// Argument for component creation, with added props
type NavLinkProps = React.PropsWithChildren<LinkProps> & {
    activeClassName?: string;
};

// NavLink must have single child (probably <a> tag; textNode does not count)
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

export default NavLink