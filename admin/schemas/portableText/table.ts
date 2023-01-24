import { ThLargeIcon } from '@sanity/icons';

export const table = {
    name: 'richTable', // Should not be the same as a global type name
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