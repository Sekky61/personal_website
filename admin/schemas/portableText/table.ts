import { ThLargeIcon } from '@sanity/icons';

export const table = {
    name: 'table',
    type: 'object',
    icon: ThLargeIcon,
    title: 'Table',
    fields: [
        {
            name: 'tableData',
            type: 'table',
            title: 'Table Data',
        },
        {
            name: 'caption',
            type: 'string',
            title: 'Caption',
            initialValue: '',
        },
        {
            name: "style",
            type: "boolean",
            title: "Style",
            description: "Style first row differently",
            initialValue: true,
        }
    ],
};