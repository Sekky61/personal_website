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
                        name: 'externalLink',
                        type: 'object',
                        title: 'External link',
                        description: "Link outside the blog",
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
                                type: 'boolean',
                                initialValue: true,
                            }
                        ]
                    },
                    {
                        name: 'internalLink',
                        type: 'object',
                        title: 'Internal link',
                        description: "Link for a post or series",
                        fields: [
                            {
                                name: 'reference',
                                type: 'reference',
                                title: 'Reference',
                                to: [
                                    { type: 'post' },
                                    { type: 'series' },
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
                    description: "Caption, displayed under the image",
                },
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt text',
                    initialValue: '',
                    description: "Replacement text for use when images are not available. Leave empty if image is decorative.",
                },
            ]
        },
        {
            type: 'codeFile',
        },
    ]
}
