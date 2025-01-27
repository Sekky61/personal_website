import { cn } from "@common/utils/cn";

interface MetaBlockProps {
  children: React.ReactNode;
  className?: string;
}

export const MetaBlockHeading = ({ children }: MetaBlockProps) => {
  return <p className="title-large">{children}</p>;
};

export const MetaBlock = ({ children, className }: MetaBlockProps) => {
  return (
    <div className={cn("tertiary-container shape-large p-6", className)}>
      {children}
    </div>
  );
};
