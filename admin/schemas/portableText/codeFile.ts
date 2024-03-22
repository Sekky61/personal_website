import { defineField } from "sanity";
import { CodeBlockIcon } from '@sanity/icons';

export const codeToken = {
    name: 'codeToken',
    title: 'Code Token',
    type: 'object',
    fields: [
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Error', value: 'error' },
                    { title: 'Warning', value: 'warning' },
                    { title: 'Info', value: 'info' },
                ],
                layout: 'radio',
            }
        }),
        defineField({
            name: 'line',
            title: 'Line',
            type: 'number',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'string',
            initialValue: '',
        }),
    ],
}

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
            description: "Name of the file, will be displayed. For example: 'index.js', 'Shell session'.",
        }),
        defineField({
            name: 'lineStart',
            title: 'Line Start',
            type: 'number',
            description: "The line number to start the code block at. Useful for code blocks that are part of a larger file.",
        }),
        defineField({
            // there is highlight lines support, data looks like: highlightedLines: [1, 2],
            name: 'code',
            title: 'Code',
            type: 'code',
            options: {
                language: 'javascript',
                languageAlternatives: [
                    // Only these will appear
                    { title: 'text', value: 'text' },
                    { title: 'Javascript', value: 'javascript' },
                    { title: 'HTML', value: 'html' },
                    { title: 'CSS', value: 'css' },
                    { title: 'Rust', value: 'rust' },
                    { title: 'Python', value: 'python' },
                    { title: 'SASS', value: 'sass' },
                    { title: 'typescript', value: 'typescript' },
                    { title: 'jsx', value: 'jsx' },
                    { title: 'tsx', value: 'tsx' },
                    { title: 'sh', value: 'sh' },
                    { title: 'json', value: 'json' },
                    { title: 'yaml', value: 'yaml' },
                    { title: 'markdown', value: 'markdown' },
                    { title: 'graphql', value: 'graphql' },
                    { title: 'Go', value: 'go', mode: 'golang' },
                    { title: 'java', value: 'java' },
                    { title: 'php', value: 'php' },
                    { title: 'C#', value: 'csharp' },
                    { title: 'C++', value: 'cpp' },
                    { title: 'groq', value: 'groq' },
                    { title: 'xml', value: 'xml' },
                    { title: 'yaml', value: 'yaml' },
                    /* The following languages do not have Sanity highlighting, but do have React (Prism) highlighting */
                    { title: '* C', value: 'c' },
                    { title: '* docker', value: 'docker' },
                    { title: '* glsl', value: 'glsl' },
                    { title: '* haskell', value: 'haskell' },
                    { title: '* http', value: 'http' },
                    { title: '* latex', value: 'latex' },
                    { title: '* nasm', value: 'nasm' },
                    { title: '* regex', value: 'regex' },
                    { title: '* toml', value: 'toml' },
                    { title: '* zig', value: 'zig' },
                ]
            }
        }),
        defineField({
            name: 'output',
            title: 'Output',
            type: 'text',
            description: "Output of the code block. For example: 'Hello World!'.",
        }),
        defineField({
            name: 'tokens',
            title: 'Tokens',
            type: 'array',
            description: "",
            initialValue: [],
            of: [
                {
                    type: 'codeToken',
                }
            ],
        }),
    ],
}
