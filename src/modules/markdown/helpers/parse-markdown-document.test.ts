import { describe, expect, it } from "vitest";
import { parseMarkdownDocument } from "./parse-markdown-document";

describe("parseMarkdownDocument", () => {
  it("normalizes supported frontmatter values with ArkType", () => {
    const document = parseMarkdownDocument(`---
title: Test article
published: true
releaseDate: 2024-01-02
summary: Short summary
titleImage: /cover.png
extraField: ignored
---

Body copy
`);

    expect(document.frontmatter).toEqual({
      title: "Test article",
      published: true,
      releaseDate: "2024-01-02",
      summary: "Short summary",
      titleImage: "/cover.png",
    });
  });

  it("throws for unsupported frontmatter types", () => {
    expect(() =>
      parseMarkdownDocument(`---
title: 123
---

Body copy
`),
    ).toThrowError();
  });
});
