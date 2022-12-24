import { defineField } from "sanity";
import { ImageIcon } from '@sanity/icons';

// Not a type, so no defineType
export const image = {
    type: 'image',
    icon: ImageIcon,
    fields: [
        defineField({
            name: 'caption',
            type: 'string',
            title: 'Caption',
            initialValue: '',
            description: "Caption, displayed under the image",
        }),
        defineField({
            name: 'alt',
            type: 'string',
            title: 'Alt text',
            initialValue: '',
            description: "Replacement text for use when images are not available. Leave empty if image is decorative.",
        }),
    ]
}
