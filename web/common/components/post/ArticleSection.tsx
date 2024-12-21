"use client";
import { type ReactNode, createContext, useContext, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Footnotes } from "./blocks";

/**
 * ArticleSection component expects children to render and a function to be called when the section becomes active
 */
type ArticleSectionProps = {
  children: ReactNode;
  "data-section": string; // slug
};

const ArticleSection = ({
  children,
  "data-section": section,
}: ArticleSectionProps) => {
  const isFootnotes =
    section === undefined &&
    Array.isArray(children) &&
    children[0]?.props?.id === "footnotes";
  if (isFootnotes) {
    const footnotesListOl = children[2];
    return <Footnotes>{footnotesListOl}</Footnotes>;
  }

  return <ArticleSectionShown {...{ children, "data-section": section }} />;
};

const ArticleSectionShown = ({
  children,
  "data-section": section,
}: ArticleSectionProps) => {
  const { setSectionActive } = useActiveSections();
  const { ref } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      setSectionActive(section, inView);
    },
    initialInView: false,
  });

  return <section ref={ref} className="my-10">{children}</section>;
};

type ArticleSectionContextType = {
  activeSections: string[];
  setSectionActive: (sectionSlug: string, active: boolean) => void;
};

// context for active section
// Used when not in an article
const ArticleSectionContext = createContext<ArticleSectionContextType>({
  activeSections: [],
  setSectionActive: () => {},
});

// provider for active section
export const ArticleSectionProvider = ({
  children,
}: { children: ReactNode }) => {
  const [activeSections, setActiveSections] = useState<string[]>([]);

  const setSectionActive = (sectionSlug: string, active: boolean) => {
    if (active) {
      setActiveSections((prev) => [...prev, sectionSlug]);
    } else {
      setActiveSections((prev) =>
        prev.filter((index) => index !== sectionSlug),
      );
    }
  };

  return (
    <ArticleSectionContext.Provider
      value={{ activeSections, setSectionActive }}
    >
      {children}
    </ArticleSectionContext.Provider>
  );
};

// hook to get active sections
export const useActiveSections = () => {
  return useContext(ArticleSectionContext);
};

export default ArticleSection;
