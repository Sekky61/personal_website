export default {
    title: 'Source',
    name: 'source',
    type: 'object',
    fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'link', type: 'url', title: 'Link' },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'link'
        }
    }
}