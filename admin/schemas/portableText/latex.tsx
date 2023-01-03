import { defineField } from "sanity";

const mathInlineIcon = () => (
    <span>
        <span style={{ fontWeight: 'bold' }}>∑</span>b
    </span>
)

const mathIcon = () => <span style={{ fontWeight: 'bold' }}>∑</span>

export const latexInline = {
    type: 'latex',
    icon: mathInlineIcon,
    title: 'Inline LaTeX'
};


export const latexBlock = {
    type: 'latex',
    icon: mathIcon,
    title: 'LaTeX Block',
};
