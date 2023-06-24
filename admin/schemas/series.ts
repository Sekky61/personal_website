import { defineType, defineField } from "sanity";

export const series = defineType({
    name: 'series',
    title: 'Series',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Series title',
            type: 'string',
            validation: (Rule: any) => [
                Rule.required(),
                Rule.max(120).warning(`A title shouldn't be more than 120 characters.`)
            ]
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule: any) => Rule.required(),
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'tags',
        }),
        defineField({
            name: 'posts',
            title: 'Posts',
            type: 'array',
            of: [{
                name: 'post',
                title: 'Series',
                type: 'reference',
                to: [{ type: 'post' }]
            }]
        })
    ],
    initialValue: { // This works, but putting initialValue in the fields doesn't.
        posts: [],
    },
    preview: {
        select: {
            title: 'title',
            posts: 'posts',
        },
        prepare(selection: any) {
            const { title, posts } = selection;

            const plural = posts.length > 1 || posts.length === 0;
            return {
                title: title,
                subtitle: `${posts.length} blogpost${plural ? `s` : ``}`
            }
        }
    }
})
