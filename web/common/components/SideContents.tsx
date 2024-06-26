"use client";
import type { Heading } from "@common/utils/blogpost";
import { useActiveSections } from "./post/ArticleSection";

type SideContentsProps = {
  headings: Heading[];
};

/**
 * Part of rendering is done from css (data-active)
 */
export const SideContents = ({ headings }: SideContentsProps) => {
  const { activeSections } = useActiveSections();

  const heading_items = headings.map(({ text, slug }: Heading, index) => {
    const isActive = activeSections.includes(index);
    return (
      <li
        key={slug}
        className="hover:underline py-1 pl-3 border-l-2"
        data-active={isActive}
      >
        <a href={`#${slug}`}>{text}</a>
      </li>
    );
  });

  return <ul className="ml-4 table-of-contents-animation">{heading_items}</ul>;
};
