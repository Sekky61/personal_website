import LinkChain from "@common/svg/LinkChain";
import { childrenToPlainText, makeSlug } from "@common/utils/blogpost";

// LinkHeading takes its text value and adds id and href to itself
// so that it can be linked to from elsewhere in the page.
const LinkHeading = ({ children }: any) => {
  const text = childrenToPlainText(children);
  const textSlug = makeSlug(text);
  return (
    <h2 className="group -ml-4 pl-4 flex pt-8">
      <a
        id={textSlug}
        href={`#${textSlug}`}
        aria-label="Anchor"
        className="scroll-mt-20"
      >
        <div className="absolute w-8 h-8 -ml-8 flex items-center opacity-0 group-hover:opacity-100">
          <LinkChain />
        </div>
        <span className="text-2xl">{children}</span>
      </a>
    </h2>
  );
};

export default LinkHeading;
