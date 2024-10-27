"use client";
import type { Heading } from "@common/mdxLoader";
import { useActiveSections } from "./post/ArticleSection";

type SideContentsProps = {
  headings: Heading[];
};

/**
 * Part of rendering is done from css (data-active)
 */
export const SideContents = ({ headings }: SideContentsProps) => {
  const { activeSections } = useActiveSections();

  const heading_items = headings.map(({ value, slug }: Heading, index) => {
    const isActive = activeSections.includes(slug);
    return (
      <li
        key={slug}
        className="hover:underline py-1 pl-3 border-l-2"
        data-active={isActive}
      >
        <a href={`#${slug}`}>{value}</a>
      </li>
    );
  });

  return <ul className="ml-4 table-of-contents-animation">{heading_items}</ul>;
};
