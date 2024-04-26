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
            validation: (Rule: any) => Rule.required().custom((link: string) => {
                // The link must be to `github.com`
                if (!link.includes('github.com')) {
                    return 'Link must be to GitHub';
                }
                return true;
            }),
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
        defineField({
          name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        }),
    ],
})
