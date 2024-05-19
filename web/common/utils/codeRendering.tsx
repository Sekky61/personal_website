import type { ReactNode } from "react";
import { createElement } from "react-syntax-highlighter";

// One piece of line styling information, eg. make line 5 a warning
export type Token = {
  type: TokenType;
  line: number;
  message: string;
};

// Styles for each type of token
const lineStyle = {
  highlighted: {
    line: ["bg-lime-700/30", "rounded"],
    text: ["token-message", "highlight-token"],
  },
  error: {
    line: ["bg-red-700/25", "rounded"],
    text: ["token-message", "error-token"],
  },
  warning: {
    line: ["bg-yellow-700/25", "rounded"],
    text: ["token-message", "warning-token"],
  },
  info: {
    line: ["bg-blue-700/25", "rounded"],
    text: ["token-message", "info-token"],
  },
};

type TokenType = keyof typeof lineStyle;

interface Renderer {
  props: (rendererProps: rendererProps) => ReactNode;
}

// Returns a renderer function that will accept a row and outputs a ReactNode for that row
// The row will be styled according to the tokens passed in tokens and highlightedLines
export function getRenderer(
  highlightedLines: number[],
  tokens?: Token[],
): Renderer {
  // Closure to keep track of the tokens and highlighted lines
  const rowRenderer = (props: any, row: rendererNode, rowNumber: number) => {
    const { stylesheet, useInlineStyles } = props;
    // find if there is a token for this line
    if (!row.properties) {
      row.properties = {
        className: [],
      };
    }
    const token = tokens?.find((t) => t.line === rowNumber);
    if (token) {
      const tokenType = token.type as TokenType;
      const style = lineStyle[tokenType];
      row.properties.className = style.line;

      const child: rendererNode = {
        type: "element",
        tagName: "span",
        properties: {
          className: style.text,
        },
        children: [
          {
            type: "text",
            value: token.message,
          },
        ],
      };

      if (row.children) {
        row.children.push(child);
      } else {
        row.children = [child];
      }
    } else if (highlightedLines.includes(rowNumber)) {
      row.properties.className = lineStyle.highlighted.line;
    } else {
      // It needs to be reset
      row.properties.className = [];
    }

    const rowElement = createElement({
      node: row,
      stylesheet,
      useInlineStyles,
      key: rowNumber,
    });

    return rowElement;
  };

  // Return the renderer function
  return (props: rendererProps): ReactNode => {
    const renderedLines = props.rows.map((row: rendererNode, number) => {
      const lineNumber = number + 1;
      return rowRenderer(props, row, lineNumber);
    });
    return <div>{renderedLines}</div>;
  };
}
