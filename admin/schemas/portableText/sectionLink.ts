import { ArrowRightIcon } from "@sanity/icons";
import { defineField } from "sanity";

// Not a type, so no defineType
export const sectionLink = {
	name: "sectionLink",
	type: "object",
	title: "Section link",
	icon: ArrowRightIcon,
	description: "Link outside the blog",
	fields: [
		defineField({
			name: "href",
			type: "string",
			title: "Section link",
			description: "Link to a section in the same page (e.g. #section)",
		}),
	],
};
