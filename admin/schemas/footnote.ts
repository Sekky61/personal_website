import { defineType, defineField } from "sanity";
import { NumberIcon } from '@sanity/icons';

export const footnote = defineType({
    name: 'footnote',
    title: 'Footnote',
    type: 'object',
    icon: NumberIcon,
    fields: [
        defineField({
            name: 'text',
            type: 'string',
            title: 'Text'
        }),
    ]
})