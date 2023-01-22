import { defineField } from "sanity";
import { TriangleOutlineIcon } from '@sanity/icons';

const AbbrIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-type">
        <polyline points="4 7 4 4 20 4 20 7"></polyline>
        <line x1="9" y1="20" x2="15" y2="20"></line>
        <line x1="12" y1="4" x2="12" y2="20"></line>
    </svg>
)

// Inline text of edit
export const abbr = {
    name: 'abbr',
    title: 'Abbreviation',
    type: 'object',
    icon: TriangleOutlineIcon,
    description: "Define an abbreviation.",
    fields: [
        defineField({
            name: 'text',
            title: 'Explanation of the abbreviation',
            type: 'string',
            initialValue: '',
            description: "Explanation of the abbreviation. Will be displayed when hovering over the abbreviation.",
        }),
    ],
}
