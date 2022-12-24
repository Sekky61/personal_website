import { defineType, defineField } from "sanity";
import { externalLink } from "./externalLink";
import { internalLink } from "./internalLink";
import { image } from "./image";
import { footnote } from "./footnote";
import { codeFile } from "./codeFile";

export const portableText = defineType({
    name: 'portableText',
    type: 'array',
    title: 'Content',
    of: [
        {
            type: 'block',
            of: [
                // inline blocks
                footnote
            ],
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' }
            ],
            marks: {
                // Marks just mark a span
                // Annotations include associated data
                annotations: [
                    externalLink,
                    internalLink
                ]
            }
        },
        image,
        codeFile
    ]
})
