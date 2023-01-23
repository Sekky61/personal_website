import { defineType, defineField } from "sanity";
import { externalLink } from "./externalLink";
import { internalLink } from "./internalLink";
import { image } from "./image";
import { footnote } from "./footnote";
import { codeFile } from "./codeFile";
import { tip } from "./tip";
import { latexBlock, latexInline } from "./latex";
import { edit } from "./edit";
import { abbr } from "./abbr";
import { table } from "./table";

// TODO make a cutdown version - no headings - to use in tips
export const portableText = defineType({
    name: 'portableText',
    type: 'array',
    title: 'Content',
    of: [
        {
            type: 'block',
            title: 'Block',
            of: [
                // inline blocks
                footnote,
                latexInline,
                edit
            ],
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading', value: 'heading' }
            ],
            marks: {
                // Marks just mark a span
                // Annotations include associated data
                annotations: [
                    externalLink,
                    internalLink,
                    abbr,
                ]
            }
        },
        image,
        codeFile,
        tip,
        latexBlock,
        table
    ]
})
