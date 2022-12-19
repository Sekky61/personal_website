import React from 'react';

// Item in a list of references -- a source to my claim or resource for learning more
export default {
    title: 'Source',
    name: 'source',
    type: 'object',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
            description: "A sort of heading/name for a source",
        },
        {
            name: 'link',
            type: 'url',
            title: 'Link',
            description: "URL for the source",
        },
        {
            name: 'ref',
            type: 'string',
            title: 'Reference',
            description: "Longer reference/bibliography",
            validation: (Rule: any) => Rule.required()
        },
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
                title: `[${ref}] - ${name}`,
                subtitle: link,
                media: <span>REF</span>
            }
        }
    }
}