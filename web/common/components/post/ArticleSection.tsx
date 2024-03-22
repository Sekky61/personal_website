import { ReactNode } from "react";
import { useInView } from 'react-intersection-observer';

/**
 * ArticleSection component expects children to render and a function to be called when the section becomes active
 */
type ArticleSectionProps = {
    children: ReactNode;
    sectionIndex: number;
    active: (active: boolean) => void;
}

const ArticleSection = ({ children, sectionIndex, active }: ArticleSectionProps) => {
    const { ref, inView, entry } = useInView({
        threshold: 0.1,
        onChange: (inView, entry) => {
            active(inView);
        },
        initialInView: sectionIndex === 0
    });

    return (
        <div ref={ref} className="article-section">
            {children}
        </div>
    );
}

export default ArticleSection;
