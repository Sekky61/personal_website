interface MetaBlockProps {
  children: React.ReactNode;
}

export const MetaBlockHeading = ({ children }: MetaBlockProps) => {
  return <p className="title-large">{children}</p>;
};

export const MetaBlock = ({ children }: MetaBlockProps) => {
  return <div className="tertiary-container shape-large p-6">{children}</div>;
};
