import React from 'react';

export default {
    title: 'Source',
    name: 'source',
    type: 'object',
    fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'link', type: 'url', title: 'Link' },
        {
            name: 'ref',
            type: 'string',
            title: 'Reference',
            validation: Rule => Rule.required()
        },
    ],
    preview: {
        select: {
            name: 'name',
            link: 'link',
            ref: 'ref'
        },
        prepare(selection) {
            const { name, link, ref } = selection;
            return {
                title: `[${ref}] - ${name}`,
                subtitle: link,
                media: <span>REF</span>
            }
        }
    }
}