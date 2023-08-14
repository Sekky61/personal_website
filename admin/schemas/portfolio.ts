// Portfolio page schema

import { defineField } from "sanity";

export const portfolio = {
    name: 'portfolio',
    title: 'Portfolio',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            title: 'Text',
            type: 'portableText',
            description: 'Text to display on the portfolio page',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'projects',
            title: 'Projects',
            type: 'array',
            description: 'Projects to display on the portfolio page. These projects will be displayed in the order they are listed here.',
            validation: (Rule: any) => Rule.required(),
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'repository' },
                    ],
                },
            ],
        }),
    ],
    options: {
        disableNew: true,
    },
    preview: {
        select: {
            title: 'text',
        },
        prepare({ title }: any) {
            return {
                title: 'Portfolio singleton',
            }
        },
    },
}
