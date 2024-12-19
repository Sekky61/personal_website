import {MetaBlock, MetaBlockHeading} from "./MetaBlock";

// Renders the footnotes of a post
export const Footnotes = ({ children }: any) => {
  // Do not render if there are no footnotes
  if (children.length === 0) {
    return null;
  }

  return (
    <MetaBlock>
      <MetaBlockHeading>Footnotes</MetaBlockHeading>
      {children}
    </MetaBlock>
  );
};
