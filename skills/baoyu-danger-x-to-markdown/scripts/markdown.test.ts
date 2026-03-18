import { expect, test } from "bun:test";

import { formatArticleMarkdown } from "./markdown.js";

test("formatArticleMarkdown renders MARKDOWN entities from atomic blocks", () => {
  const article = {
    title: "Atomic Markdown Example",
    content_state: {
      blocks: [
        {
          type: "unstyled",
          text: "Before the snippet.",
          entityRanges: [],
        },
        {
          type: "atomic",
          text: " ",
          entityRanges: [{ key: 0, offset: 0, length: 1 }],
        },
        {
          type: "unstyled",
          text: "After the snippet.",
          entityRanges: [],
        },
      ],
      entityMap: {
        "0": {
          key: "5",
          value: {
            type: "MARKDOWN",
            mutability: "Mutable",
            data: {
              markdown: "```python\nprint('hello from x article')\n```\n",
            },
          },
        },
      },
    },
  };

  const { markdown } = formatArticleMarkdown(article);

  expect(markdown).toContain("Before the snippet.");
  expect(markdown).toContain("```python\nprint('hello from x article')\n```");
  expect(markdown).toContain("After the snippet.");
  expect(markdown).toBe(`# Atomic Markdown Example

Before the snippet.

\`\`\`python
print('hello from x article')
\`\`\`

After the snippet.`);
});
