import { CustomComponent } from "./CustomComponent";

// A dictionary with the components that can be used in the content
// of a post. The keys are the names of the components in Sanity.
// The values are the components themselves.
export const contentComponents: { [name: string]: ({ args }: any) => JSX.Element } = {
    "CustomComponent": CustomComponent,
};

interface Component {
    tag: string;
    args: string;
}

interface ContentComponentRendererProps {
    value: Component;
    index: number;
}

// A function that renders the components in the content of a post.
//
// Security: This function is safe if the components are
// using the args property properly.
export const ContentComponentsRender = ({ value, index }: ContentComponentRendererProps) => {
    const { tag, args } = value;
    const Component = contentComponents[tag];
    return <Component content={args} />;
};