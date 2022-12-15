export default {
    name: 'series',
    title: 'Series',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Series title',
            type: 'string',
            validation: (Rule) => [
                Rule.required(),
                Rule.max(120).warning(`A title shouldn't be more than 120 characters.`)
            ]
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule) => Rule.required(),
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
    ]
};
