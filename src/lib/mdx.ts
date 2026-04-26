import { evaluate } from "@mdx-js/mdx";
import { useMDXComponents } from "@mdx-js/react";
import type { ComponentType } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

export type MdxComponent = ComponentType<Record<string, never>>;

export async function compileMdx(source: string): Promise<MdxComponent> {
  const module = await evaluate(source, {
    ...runtime,
    useMDXComponents,
    remarkPlugins: [remarkGfm],
  });

  return module.default as MdxComponent;
}
