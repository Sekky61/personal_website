import { defineField } from "sanity";
import { LinkIcon } from '@sanity/icons';

// Not a type, so no defineType
export const internalLink = {
    name: 'internalLink',
    type: 'object',
    title: 'Internal link',
    icon: LinkIcon,
    description: "Link for a post or series",
    fields: [
        defineField({
            name: 'reference',
            type: 'reference',
            title: 'Reference',
            to: [
                { type: 'post' },
                { type: 'series' },
                // other types you may want to link to
            ]
        })
    ]
}