import { defineType, defineField } from "sanity";

export const tag = defineType({
    name: 'tag',
    title: 'Tag',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            type: 'string',
            title: 'Label'
        }),
        defineField({
            name: 'value',
            type: 'string',
            title: 'Value'
        }),
    ],
})

export const tags = defineType({
    name: 'tags',
    title: 'Tags',
    type: 'array',
    of: [{ type: 'tag' }]
})