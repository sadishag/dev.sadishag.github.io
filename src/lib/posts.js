// All blog posts, newest first. Each .md in src/content/blog/ becomes a
// module (see vite-plugin-blog.js) exporting { frontmatter, html }.
const modules = import.meta.glob("../content/blog/*.md", { eager: true });

export const posts = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split("/").pop().replace(/\.md$/, ""),
    title: mod.frontmatter.title,
    date: mod.frontmatter.date,
    excerpt: mod.frontmatter.excerpt,
    html: mod.html,
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

// "2026-07-10" → "July 10, 2026" (parsed as local time, not UTC,
// so the displayed day never shifts by timezone)
export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
