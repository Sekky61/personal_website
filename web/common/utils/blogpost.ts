import { PortableTextBlock, TypedObject } from "@portabletext/types";
import readingTime, { ReadTimeResults } from "reading-time";
import type * as Schema from "@common/sanityTypes"

export type Footnote = {
    text: string;
    number: number;
};

export type Heading = {
    text: string;
    slug: string;
};

export type Source = {
    name: string;
    link: string;
};

export function getBeginningOfArticle(post: Schema.Post, length: number = 100) {
    const text = blocksToPlainText(post.content);
    return text.slice(0, length);
}

function isBlock(block: any): block is PortableTextBlock {
    return block._type == "block";
}

function isHeading(block: PortableTextBlock): boolean {
    return block.style == "heading";
}

function isFootnote(block: TypedObject): block is Schema.FootnoteInlineBlock {
    return block._type == "footnote";
}

export function getFootnotes(post: Schema.Post): Footnote[] {
    let counter = 0;
    return post.content
        .filter(isBlock)
        .filter(block => !isHeading(block))
        .flatMap((block) => {
            return block.children.filter(isFootnote).map((child) => {
                counter += 1;
                return { text: child.text, number: counter };
            });
        });
}

export function getHeadings(post: Schema.Post): Heading[] {
    return post.content
        .filter(isBlock)
        .filter(isHeading)
        .map((block: PortableTextBlock) => {
            const text = blocksToPlainText([block]);
            const slug = makeSlug(text);
            return { text, slug };
        })
}

export function blocksToPlainText(blocks: PortableTextBlock[] = []) {
    return blocks
        // loop through each block
        .map((block) => {
            // if it's not a text block with children, 
            // return nothing
            if (!isBlock(block) || !block.children) {
                return ''
            }
            // loop through the children spans, and join the
            // text strings
            return block.children.map((child) => {
                // if it's a footnote, do not render
                if (isFootnote(child)) {
                    return '';
                }
                return child.text;
            }).join('')
        })
        // join the paragraphs leaving split by two linebreaks
        .join('\n\n')
}

export function postReadingTime(post: Schema.Post): ReadTimeResults {
    const text = blocksToPlainText(post.content);
    return readingTime(text);
}

export function isPartOfSeries(post: Schema.PostWithSeries) {
    return post.series && post.series.length > 0;
}

export function getSeriesPart(post: Schema.PostWithSeries) {
    if (!isPartOfSeries(post)) {
        return null;
    }

    if (post.series.length < 1) {
        throw new Error("Post is part of series, but series is empty.");
    }

    return post.series[0].posts!.findIndex((el: any) => {
        return el._ref == post._id;
    }) + 1;
}

export function getSerieSlug(post: Schema.PostWithSeries) {
    if (isPartOfSeries(post)) {
        return post.series[0].slug.current;
    }
    return null;
}

// Make a slug from a string.
export function makeSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Works on different format than `blocksToPlainText`
export function childrenToPlainText(children: any[] = []) {
    return children.map((child: any) => {
        if (typeof (child) == "string") {
            return child;
        } else {
            // Object
            return child.props.text;
        }
    }).join('')
}
