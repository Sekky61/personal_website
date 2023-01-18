import { defineField } from "sanity";
import { CommentIcon } from '@sanity/icons'

// Inline text of edit
export const edit = {
    name: 'edit',
    title: 'Edit',
    type: 'object',
    icon: CommentIcon,
    fields: [
        defineField({
            name: 'text',
            title: 'Text of the edit',
            type: 'string',
            initialValue: '',
            description: "Content of the edit. Do not include the words 'Edit:' or 'Edits:'",
        }),
    ],
    preview: {
        select: {
            text: 'text',
        },
        prepare({ text }: any) {
            let title = "Edit";
            if (text === undefined || text.length == 0) {
                title += " (empty)";
            }
            return {
                title: title,
            };
        }
    },
}
