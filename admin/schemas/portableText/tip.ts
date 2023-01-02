import { defineField } from "sanity";
import { BulbOutlineIcon } from '@sanity/icons';

export const tip = {
    name: 'tip',
    title: 'Tip',
    type: 'object',
    icon: BulbOutlineIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title of tip',
            type: 'string',
            initialValue: '',
            description: "Title of the tip",
        }),
        defineField({
            name: 'text',
            title: 'Text of tip',
            type: 'portableText',
            initialValue: '',
            description: "Content of the tip",
        }),
    ],
}
