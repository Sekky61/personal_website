import { defineType, defineField, defineArrayMember } from "sanity";

export const repo = defineType({
    name: 'repository',
    title: 'Repository',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name'
        }),
        defineField({
            name: 'link',
            type: 'url',
            title: 'GitHub link'
        }),
        defineField({
            name: 'description',
            type: 'string',
            title: 'Description'
        }),
        defineField({
            name: 'technologies',
            type: 'array',
            title: 'Technologies',
            of: [
                defineArrayMember({
                    type: 'string',
                    title: 'Technology'
                })
            ]
        }),
    ],
})
