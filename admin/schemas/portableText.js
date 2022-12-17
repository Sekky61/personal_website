export default {
    name: 'portableText',
    type: 'array',
    title: 'Content',
    of: [
        {
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' }
            ],
            marks: {
                annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        title: 'External link',
                        fields: [
                            {
                                name: 'href',
                                type: 'url',
                                title: 'URL'
                            },
                            {
                                title: 'Open in new tab',
                                name: 'blank',
                                description: 'Read https://css-tricks.com/use-target_blank/',
                                type: 'boolean'
                            }
                        ]
                    },
                    {
                        name: 'internalLink',
                        type: 'object',
                        title: 'Internal link',
                        fields: [
                            {
                                name: 'reference',
                                type: 'reference',
                                title: 'Reference',
                                to: [
                                    { type: 'post' },
                                    // other types you may want to link to
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            type: 'image',
            fields: [
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                    initialValue: '',
                },
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt text',
                    initialValue: '',
                },
            ]
        }
    ]
}
