import LinkChain from "@common/svg/LinkChain";
import { Blogpost } from "@common/utils/blogpost";

// LinkHeading takes its text value and adds id and href to itself
// TODO should this be a method on Blogpost?
export default function LinkHeading(p: any) {
    const text = Blogpost.childrenToPlainText(p.children)
    const text_slug = Blogpost.makeSlug(text);
    return (
        <h2 className="group -ml-4 pl-4 flex">
            <a id={text_slug} href={"#" + text_slug} aria-label="Anchor">
                <div className="absolute w-8 h-8 -ml-8 flex items-center opacity-0 group-hover:opacity-100">
                    <LinkChain></LinkChain>
                </div>
                <span>
                    {p.children}
                </span>
            </a>
        </h2>
    );
};
