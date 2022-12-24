import { defineField } from "sanity";
import { CodeBlockIcon } from '@sanity/icons'

export const codeFile = {
    name: 'codeFile',
    title: 'Code File',
    type: 'object',
    icon: CodeBlockIcon,
    fields: [
        defineField({
            name: 'fileName',
            title: 'File Name',
            type: 'string',
            initialValue: '',
            description: "Name of the file, will be displayed",
        }),
        defineField({
            // there is highlight lines support, data looks like: highlightedLines: [1, 2],
            name: 'code',
            title: 'Code',
            type: 'code',
            options: {
                language: 'js',
                languageAlternatives: [
                    // Only these will appear
                    { title: 'Javascript', value: 'javascript' },
                    { title: 'HTML', value: 'html' },
                    { title: 'CSS', value: 'css' },
                    { title: 'Rust', value: 'rust' },
                    { title: 'Python', value: 'python' },
                    { title: 'SASS', value: 'sass' },
                ]
            }
        }),
    ],
}
