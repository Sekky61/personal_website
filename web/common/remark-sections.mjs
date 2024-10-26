// Source: https://github.com/jake-low/remark-sectionize

import { findAfter } from "unist-util-find-after";
import { visit } from "unist-util-visit";
import { makeSlug } from "./utils/makeSlug.mjs";

const MAX_HEADING_DEPTH = 6;

function plugin() {
  return transform;
}

function transform(tree) {
  for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
    visit(
      tree,
      (node) => node.type === "heading" && node.depth === depth,
      sectionize,
    );
  }
  console.dir(tree, { maxArrayLength: null, depth: null });
}

function sectionize(node, index, parent) {
  const start = node;
  const startIndex = index;
  const depth = start.depth;

  const headingSlug = makeSlug(start.children[0].value);
  console.log(`headingSlug: ${headingSlug}`);
  console.dir(start);

  const isEnd = (node) =>
    (node.type === "heading" && node.depth <= depth) || node.type === "export";
  const end = findAfter(parent, start, isEnd);
  const endIndex = parent.children.indexOf(end);

  const between = parent.children.slice(
    startIndex,
    endIndex > 0 ? endIndex : undefined,
  );

  // https://github.com/syntax-tree/mdast-util-to-hast?tab=readme-ov-file#fields-on-nodes
  const section = {
    type: "section",
    depth: depth,
    children: between,
    data: {
      hName: "section",
      hProperties: {
        className: `section section-${headingSlug}`,
        "data-section": headingSlug,
      },
    },
  };

  parent.children.splice(startIndex, section.children.length, section);
}

export default plugin;
