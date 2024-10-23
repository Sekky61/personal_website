"use client";
import { useInView } from "react-intersection-observer";
import { type ReactNode, createContext, useState, useContext } from "react";

/**
 * ArticleSection component expects children to render and a function to be called when the section becomes active
 */
type ArticleSectionProps = {
  children: ReactNode;
  sectionIndex: number;
};

const ArticleSection = ({ children, sectionIndex }: ArticleSectionProps) => {
  const { setSectionActive } = useActiveSections();
  const { ref } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      setSectionActive(sectionIndex, inView);
    },
    initialInView: sectionIndex === 0,
  });

  return <section ref={ref}>{children}</section>;
};

type ArticleSectionContextType = {
  activeSections: number[];
  setSectionActive: (sectionIndex: number, active: boolean) => void;
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
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const setSectionActive = (sectionIndex: number, active: boolean) => {
    if (active) {
      setActiveSections((prev) => [...prev, sectionIndex]);
    } else {
      setActiveSections((prev) =>
        prev.filter((index) => index !== sectionIndex),
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
