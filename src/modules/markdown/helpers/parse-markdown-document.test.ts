import { describe, expect, it } from "vitest";
import { parseMarkdownDocument } from "./parse-markdown-document";

describe("parseMarkdownDocument", () => {
  it("returns the full body when no frontmatter is present", () => {
    const document = parseMarkdownDocument("Body copy");

    expect(document.body).toBe("Body copy");
    expect(document.frontmatter).toEqual({});
  });

  it("removes the frontmatter block from the body", () => {
    const document = parseMarkdownDocument(`---
title: Test article
---

# Heading

Body copy
`);

    expect(document.body).toBe("# Heading\n\nBody copy");
  });

  it("normalizes supported frontmatter values with ArkType", () => {
    const document = parseMarkdownDocument(`---
title: Test article
published: true
releaseDate: 2024-01-02
summary: Short summary
titleImage: /cover.png
tags:
  - Security
  - Intel SGX
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
      tags: ["Security", "Intel SGX"],
    });
  });

  it("preserves YAML timestamps as strings when they are not plain dates", () => {
    const document = parseMarkdownDocument(`---
releaseDate: 2024-01-02T03:04:05.000Z
---

Body copy
`);

    expect(document.frontmatter).toEqual({
      releaseDate: "2024-01-02T03:04:05.000Z",
    });
  });

  it("treats explicit null frontmatter as empty metadata", () => {
    const document = parseMarkdownDocument(`---
null
---

Body copy
`);

    expect(document.frontmatter).toEqual({});
  });

  it("throws for unsupported frontmatter types", () => {
    expect(() =>
      parseMarkdownDocument(`---
title: 123
---

Body copy
`),
    ).toThrow();
  });

  it("throws when the YAML frontmatter root is an array", () => {
    expect(() =>
      parseMarkdownDocument(`---
- title: Test article
---

Body copy
`),
    ).toThrow();
  });

  it("throws when the YAML frontmatter root is a scalar", () => {
    expect(() =>
      parseMarkdownDocument(`---
title
---

Body copy
`),
    ).toThrow();
  });
});
