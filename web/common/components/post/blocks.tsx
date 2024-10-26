interface Footnotes {
  footnotes: Footnote[];
}

// Renders the footnotes of a post
export const Footnotes = ({ children }: any) => {
  // Do not render if there are no footnotes
  if (children.length === 0) {
    return null;
  }

  return (
    <div className="footnotes">
      <div className="metablock-heading">Footnotes</div>
      {children}
    </div>
  );
};

interface Sources {
  sources: Source[];
}

// Renders the sources of a post
export const Sources = ({ sources }: Sources) => {
  // Do not render if there are no sources
  if (sources.length === 0) {
    return null;
  }

  const sourceItems = sources.map(({ link, name }: any) => (
    <li key={name}>
      <span className="mr-4">{name}</span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className="hover:underline"
      >
        {link}
      </a>
    </li>
  ));

  return (
    <div className="metablock">
      <div className="metablock-heading">Sources</div>
      <ol className="list-decimal ml-8">{sourceItems}</ol>
    </div>
  );
};
