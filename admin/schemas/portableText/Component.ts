import { defineField } from "sanity";
import { BarChartIcon } from '@sanity/icons';

export const component = {
    name: 'component',
    title: 'Component',
    type: 'object',
    icon: BarChartIcon,
    fields: [
        defineField({
            name: 'tag',
            title: 'Tag',
            type: 'string',
            initialValue: '',
        }),
        defineField({
            name: 'args',
            title: 'Arguments',
            type: 'string',
            description: 'Arguments to pass to the component. A single string.',
        }),
    ],
}
