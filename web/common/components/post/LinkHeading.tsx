import LinkChain from "@common/svg/LinkChain";
import { makeSlug } from "@common/utils/blogpost";
import {
  type PortableTextBlockComponent,
  toPlainText,
} from "@portabletext/react";

type LinkHeadingProps = {
  children: string;
};

// LinkHeading takes its text value and adds id and href to itself
// so that it can be linked to from elsewhere in the page.
const LinkHeading = ({children}: LinkHeadingProps) => {
  const textSlug = makeSlug(children);
  return (
    <a
      id={textSlug}
      href={`#${textSlug}`}
      aria-label="Anchor"
      className="scroll-mt-20"
    >
      <h2 className="group text-2xl">
        <div className="absolute w-8 h-8 -ml-7 items-center hidden group-hover:flex">
          <LinkChain />
        </div>
        {children}
      </h2>
    </a>
  );
};

export default LinkHeading;
