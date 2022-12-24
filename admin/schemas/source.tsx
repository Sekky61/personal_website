import React from 'react';
import { defineType, defineField } from "sanity";

// Item in a list of references -- a source to my claim or resource for learning more
export const source = defineType({
    title: 'Source',
    name: 'source',
    type: 'object',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
            description: "A sort of heading/name for a source",
        }),
        defineField({
            name: 'link',
            type: 'url',
            title: 'Link',
            description: "URL for the source",
        }),
        defineField({
            name: 'ref',
            type: 'string',
            title: 'Reference',
            description: "Longer reference/bibliography",
            validation: (Rule: any) => Rule.required()
        }),
    ],
    preview: {
        select: {
            name: 'name',
            link: 'link',
            ref: 'ref'
        },
        prepare(selection: any) {
            const { name, link, ref } = selection;
            return {
                title: `[${name}] - ${ref}`,
                subtitle: link,
                media: <span>REF</span>
            }
        }
    }
})