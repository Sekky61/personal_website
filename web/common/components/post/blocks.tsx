import { Footnote, Heading, Source } from "@common/utils/blogpost";

interface Footnotes {
  footnotes: Footnote[];
}

// Renders the footnotes of a post
export const Footnotes = ({ footnotes }: Footnotes) => {
  // Do not render if there are no footnotes
  if (footnotes.length === 0) {
    return null;
  }

  const footnoteItems = footnotes.map(({ text, number }: Footnote) => (
    <li key={number} id={`#footnote-${number}`}>
      {text}
    </li>
  ));

  return (
    <div className="metablock">
      <div className="metablock-heading">Footnotes</div>
      <ol className="list-inside list-decimal">{footnoteItems}</ol>
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
