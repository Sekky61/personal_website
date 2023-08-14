import { defineType, defineField, defineArrayMember } from "sanity";

export const repo = defineType({
    name: 'repository',
    title: 'Repository',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'link',
            type: 'url',
            title: 'GitHub link',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'string',
            title: 'Description',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'technologies',
            type: 'array',
            title: 'Technologies',
            initialValue: [],
            of: [
                defineArrayMember({
                    type: 'string',
                    title: 'Technology'
                })
            ]
        }),
    ],
})
