export default {
    name: 'series',
    title: 'Series',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Series title',
            type: 'string',
            validation: (Rule: any) => [
                Rule.required(),
                Rule.max(120).warning(`A title shouldn't be more than 120 characters.`)
            ]
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule: any) => Rule.required(),
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'tags',
            initialValue: []
        },
        {
            name: 'posts',
            title: 'Posts',
            type: 'array',
            of: [{
                name: 'post',
                title: 'Series',
                type: 'reference',
                to: [{ type: 'post' }]
            }]
        }
    ],
    preview: {
        select: {
            title: 'title',
            posts: 'posts',
        },
        prepare(selection: any) {
            const { title, posts } = selection;
            const plural = posts.length > 1;
            return {
                title: title,
                subtitle: `${posts.length} blogpost${plural ? `s` : ``}`
            }
        }
    }
};
