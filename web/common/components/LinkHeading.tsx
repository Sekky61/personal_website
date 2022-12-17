import LinkChain from "@common/svg/LinkChain";
import article from "@common/utils/article";

// LinkHeading takes its text value and adds id and href to itself
export default function LinkHeading(p: any) {
    console.dir(p);
    const text = article.childrenToPlainText(p.children)
    console.log("Text be");
    console.log(text);
    const text_slug = article.makeSlug(text);
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
