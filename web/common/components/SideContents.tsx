"use client";
import type { Heading } from "@common/utils/blogpost";
import { useActiveSections } from "./post/ArticleSection";
import clsx from "clsx";

type SideContentsProps = {
  headings: Heading[];
};

export const SideContents = ({ headings }: SideContentsProps) => {
  const { activeSections } = useActiveSections();
  const heading_items = headings.map(({ text, slug }: Heading, index) => {
    const isActive = activeSections.includes(index);
    const cls = clsx(
      "hover:underline my-1.5 pl-3 transition-all duration-250 border-l-2",
      isActive && "border-white",
      !isActive && "border-transparent",
    );
    return (
      <li key={slug} className={cls}>
        <a href={`#${slug}`}>{text}</a>
      </li>
    );
  });

  return (
    <div className="pt-4">
      <h1 className="text-xl">Table of Contents</h1>
      <ul className="ml-4 border-l">{heading_items}</ul>
    </div>
  );
};
