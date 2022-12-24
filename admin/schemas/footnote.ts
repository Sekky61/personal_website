import { defineType, defineField } from "sanity";

export const footnote = defineType({
    name: 'footnote',
    title: 'Footnote',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            type: 'string',
            title: 'Text'
        }),
    ]
})