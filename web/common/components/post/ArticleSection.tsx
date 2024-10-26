"use client";
import { type ReactNode, createContext, useContext, useState } from "react";
import { useInView } from "react-intersection-observer";

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
  const { setSectionActive } = useActiveSections();
  const { ref } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      setSectionActive(section, inView);
    },
    initialInView: false,
  });

  return <section ref={ref}>{children}</section>;
};

type ArticleSectionContextType = {
  activeSections: string[];
  setSectionActive: (sectionSlug: string, active: boolean) => void;
};

// context for active section
const ArticleSectionContext = createContext<ArticleSectionContextType>({
  activeSections: [],
  setSectionActive: () => {
    console.error("setSectionActive not implemented");
  },
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
