import { makeSlug } from "@common/utils/article";

export default function LinkHeading(p: any) {
    const text = p.children;
    const text_slug = makeSlug(text);
    return (<h2>
        <a id={text_slug} href={"#" + text_slug}>{text}</a>
    </h2>);
};
