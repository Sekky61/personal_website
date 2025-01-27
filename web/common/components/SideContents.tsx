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

  const heading_items = headings.map(({ value, slug }: Heading) => {
    const isActive = activeSections.includes(slug);
    return (
      <li
        key={slug}
        className="content-item hover:underline py-1 pl-3"
        data-active={isActive}
      >
        <a href={`#${slug}`}>{value}</a>
      </li>
    );
  });

  return <ul className="ml-4">{heading_items}</ul>;
};
