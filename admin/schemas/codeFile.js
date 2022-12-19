export default {
    name: 'codeFile',
    title: 'Code File',
    type: 'object',
    fields: [
        {
            name: 'fileName',
            title: 'File Name',
            type: 'string',
        },
        {
            name: 'code',
            title: 'Code',
            type: 'code',
            options: {
                withFilename: true,
                language: 'js',
                languageAlternatives: [
                    { title: 'Javascript', value: 'js' },
                    { title: 'HTML', value: 'html' },
                    { title: 'CSS', value: 'css' },
                    { title: 'Rust', value: 'rust' },
                    { title: 'SASS', value: 'sass' },
                ]
            }
        },
    ],
}
