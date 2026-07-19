/* eslint-env node */
import { Marked } from "marked";
import { codeToHtml } from "shiki";

// Transforms src/content/blog/*.md into JS modules at build time:
//   export const frontmatter = { title, date, excerpt };
//   export const html = "<h2>…</h2>…";
// Code blocks are highlighted with Shiki here so no parser or grammar
// ships to the client. Dual-theme colors ride on CSS variables
// (--shiki-light/--shiki-dark) that global.css switches on data-theme.

const BLOG_PATH = /src[\\/]content[\\/]blog[\\/].+\.md$/;

function parseFrontmatter(src) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!match) return { data: {}, content: src };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^(\w+):\s*(.*)$/.exec(line.trim());
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { data, content: src.slice(match[0].length) };
}

function createRenderer() {
  return new Marked({
    async: true,
    async walkTokens(token) {
      if (token.type !== "code") return;
      const lang = (token.lang || "").split(/\s+/)[0] || "text";
      let highlighted;
      try {
        highlighted = await codeToHtml(token.text, {
          lang,
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        });
      } catch {
        // unknown language — fall back to plain text
        highlighted = await codeToHtml(token.text, {
          lang: "text",
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        });
      }
      token.type = "html";
      token.block = true;
      token.text = highlighted;
    },
  });
}

export default function blogPlugin() {
  const marked = createRenderer();
  return {
    name: "blog-md",
    async transform(src, id) {
      if (!BLOG_PATH.test(id)) return null;
      const { data, content } = parseFrontmatter(src);
      const html = await marked.parse(content);
      return {
        code:
          `export const frontmatter = ${JSON.stringify(data)};\n` +
          `export const html = ${JSON.stringify(html)};\n`,
        map: null,
      };
    },
  };
}
