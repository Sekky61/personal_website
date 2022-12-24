import { defineField } from "sanity";
import { EarthAmericasIcon } from '@sanity/icons';

// Not a type, so no defineType
export const externalLink = {
    name: 'externalLink',
    type: 'object',
    title: 'External link',
    icon: EarthAmericasIcon,
    description: "Link outside the blog",
    fields: [
        defineField({
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            title: 'Open in new tab',
            name: 'blank',
            description: 'Read https://css-tricks.com/use-target_blank/',
            type: 'boolean',
            initialValue: true,
        })
    ]
}
