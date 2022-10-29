
export default function LinkHeading(p: any) {
    const text = p.children;
    const text_slug = makeSlug(text);
    return (<h2>
        <a id={text_slug} href={"#" + text_slug}>{text}</a>
    </h2>);
};

export function makeSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
