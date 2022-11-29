export function getH2Headings(source: string) {
    // Get each line individually, and filter out anything that
    // isn't a h2 heading.
    const headingLines = source.split("\n").filter((line) => {
        return line.match(/^##\s/);
    });
    return headingLines.map((raw) => {
        const text = raw.replace(/^##\s/, "");

        const slug = makeSlug(text);

        return { text, slug };
    });
}

export function makeSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
