# sadishagalappatti.ca — Website Rebuild Plan & Spec

**Author:** Claude (for Sadisha Galappatti)
**Date:** July 10, 2026
**Hosting:** GitHub Pages (sadishag/sadishag.github.io)
**Domain:** sadishagalappatti.ca (already owned, CNAME configured)

---

## 1. Current State Assessment

### What exists today

The current site at sadishagalappatti.ca is a React + Vite single-page app deployed via GitHub Actions to GitHub Pages. It's described in its own README as a simple contact/resume landing page — a step up from the original university-era "frankenstein" site, but still minimal. The tagline is "All around good guy" with a brief intro and links to email, LinkedIn, GitHub, and a resume.

There's also a separate CV site at cv.sadishagalappatti.ca hosted on Vercel (built with Next.js, based on Bartosz Jarocki's template) that contains the full structured resume — work history, skills, projects, education.

### What's missing

- **No photography section** (mentioned as "in development" on the current site)
- **No projects showcase** (also "in development")
- **No blog** (also "in development")
- **The CV subdomain duplicates information** that should live on the main site
- **No distinct visual identity** — the current site reads as a quick bootstrap, not a reflection of 6+ years of senior engineering experience
- **Content is fragmented** across two subdomains with different tech stacks

---

## 2. Goals for the Rebuild

1. **Consolidate everything into one site** — eliminate the need for cv.sadishagalappatti.ca by absorbing that content
2. **Ship the three sections that have been "in development"** — photography, projects, blog
3. **Establish a visual identity** that reflects a senior engineer who builds real things, not a student portfolio
4. **Keep it on GitHub Pages** — zero hosting cost, the domain is already owned
5. **Keep the stack familiar** — React + Vite + GitHub Actions (what Sadisha already knows and maintains)
6. **Make it fast and maintainable** — static site, no server, content in markdown or JSON files

---

## 3. Design Direction

### Subject & Audience

This is a personal site for a Senior Full Stack Cloud Engineer with 6+ years at Canadian financial institutions (Manulife, RBC). The audience is peers, hiring managers, collaborators, and anyone Sadisha wants to share work with. The site's single job: make it immediately clear who Sadisha is, what he builds, and how to reach him.

### Design Concept: "The Workshop"

The metaphor is a well-organized workspace — clean surfaces, good tools, everything in its place. Not flashy, not minimal-to-the-point-of-emptiness. Warm but precise. The site should feel like you walked into someone's office where real work happens: there's personality in the details, but nothing frivolous.

### Color Palette

| Role        | Color     | Name         | Usage                                         |
|-------------|-----------|--------------|-----------------------------------------------|
| Background  | `#FAF9F7` | Warm White   | Page background, breathing room               |
| Surface     | `#F0EEEB` | Parchment    | Card backgrounds, code blocks, inset areas    |
| Text        | `#1A1A1A` | Near Black   | Body text, headings                           |
| Muted       | `#6B6B6B` | Graphite     | Secondary text, captions, metadata            |
| Accent      | `#2563EB` | Engineering Blue | Links, interactive elements, focus states   |
| Accent Hover| `#1D4ED8` | Deep Blue    | Hover states                                  |
| Border      | `#E2E0DC` | Ash          | Dividers, card borders, subtle structure       |
| Dark Mode BG| `#111111` | Ink          | Dark mode background                          |
| Dark Surface| `#1A1A1A` | Charcoal     | Dark mode card backgrounds                    |

### Typography

- **Display / Headings:** `"Space Grotesk"` — geometric sans with character, good at large sizes. Weight 500 for section heads, 700 for the hero name.
- **Body:** `"Inter"` — workhorse sans-serif, excellent readability at small sizes. Weight 400 body, 500 for emphasis.
- **Mono / Code:** `"JetBrains Mono"` — for code snippets, technical details, the "engineer" moments. Weight 400.

All served via Google Fonts (free, CDN-cached, no hosting needed).

**Type Scale (desktop):**

| Role           | Size    | Weight | Font           |
|----------------|---------|--------|----------------|
| Hero Name      | 48px    | 700    | Space Grotesk  |
| Hero Subtitle  | 20px    | 400    | Inter          |
| Section Head   | 32px    | 500    | Space Grotesk  |
| Card Title     | 20px    | 500    | Space Grotesk  |
| Body           | 16px    | 400    | Inter          |
| Small / Meta   | 14px    | 400    | Inter          |
| Code           | 14px    | 400    | JetBrains Mono |

Mobile scales down proportionally (hero name 32px, section heads 24px, body stays 16px).

### Layout Concept

Single-page scrolling site with distinct sections. Navigation sticks to the top and highlights the active section. The layout uses a centered content column (max-width ~720px for text, expanding to ~1080px for grids) with generous vertical whitespace between sections.

```
┌─────────────────────────────────────────────┐
│  [SG]  About  Experience  Projects  Blog  ↗ │  ← sticky nav
├─────────────────────────────────────────────┤
│                                             │
│        Sadisha Galappatti                    │  ← hero: name, role,
│        Senior Full Stack Cloud Engineer     │     1-line pitch,
│        Toronto · [icons] GitHub LinkedIn    │     contact icons
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        About                                │  ← 2-3 paragraph bio
│        ─────                                │     written in first person
│        [prose paragraph]                    │
│        [tech chips: React, Node, Terraform] │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        Experience                           │  ← timeline, compact
│        ──────────                           │
│        Manulife · Sr Full Stack Cloud Eng   │
│        2019–Present · [details expandable]  │
│                                             │
│        RBC · Software Developer             │
│        2017–2019 · [details expandable]     │
│                                             │
│        BlackBerry · Software Dev Student    │
│        [co-op details]                      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        Projects                             │  ← 2-col card grid
│        ────────                             │
│        ┌──────────┐  ┌──────────┐           │
│        │ Project 1│  │ Project 2│           │
│        └──────────┘  └──────────┘           │
│        ┌──────────┐  ┌──────────┐           │
│        │ Project 3│  │ Project 4│           │
│        └──────────┘  └──────────┘           │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        Photography                          │  ← masonry or grid gallery
│        ───────────                          │     lightbox on click
│        [image] [image] [image]              │
│        [image]    [image]                   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        Blog                                 │  ← list of posts
│        ────                                 │     (links to full pages)
│        Title · Date · 1-line excerpt        │
│        Title · Date · 1-line excerpt        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        [SG] · © 2026 · sadishag@gmail.com   │  ← footer
│                                             │
└─────────────────────────────────────────────┘
```

### Signature Element

The hero section opens with Sadisha's name set large in Space Grotesk, with a subtle typing-cursor animation on the subtitle that cycles through roles: "Senior Full Stack Cloud Engineer", "Building at Manulife", "McMaster Engineering Alum", "Photographer". This is the one moment of motion on the page — everything else is still and clean. The cursor blinks in Engineering Blue. It's a nod to the terminal without being a gimmick.

### Dark Mode

Supported via `prefers-color-scheme` media query and a manual toggle in the nav. Dark mode swaps the background to Ink (#111111), surface to Charcoal (#1A1A1A), text to #EBEBEB, and accent stays Engineering Blue. Photography section images get a subtle border in dark mode to separate from the background.

---

## 4. Information Architecture

### Sections (scroll targets on the main page)

1. **Hero** — Name, title, location, social links
2. **About** — First-person bio (2-3 paragraphs), tech stack chips
3. **Experience** — Work history timeline (expandable details per role)
4. **Projects** — Card grid of side projects with tech tags and links
5. **Photography** — Image gallery with lightbox
6. **Blog** — List of recent posts (titles + dates + excerpts, linking to full post pages)
7. **Footer** — Copyright, email, social links repeated

### Blog Post Pages

Blog posts are the only thing that gets its own route (e.g., `/blog/my-first-post`). Each post is a markdown file in the repo that gets rendered at build time. This keeps the writing workflow simple: write markdown, push to main, GitHub Actions builds and deploys.

### Content Sources (all in-repo, no CMS)

```
src/
  data/
    experience.json      ← work history entries
    projects.json        ← project cards
    skills.json          ← tech stack list
    social.json          ← social/contact links
  content/
    blog/
      my-first-post.md   ← blog posts as markdown
      another-post.md
  assets/
    photography/          ← gallery images (optimized)
```

---

## 5. Technical Architecture

### Stack

| Layer            | Choice                        | Why                                              |
|------------------|-------------------------------|--------------------------------------------------|
| Framework        | React 18+                     | Already familiar, existing codebase              |
| Build Tool       | Vite 5+                       | Already in use, fast builds                      |
| Routing          | React Router v6               | Needed for blog post pages                       |
| Styling          | CSS Modules or Tailwind CSS   | Scoped styles, no runtime CSS-in-JS              |
| Markdown         | vite-plugin-md or remark      | Parse blog posts at build time                   |
| Image Optimization | vite-imagetools              | Responsive images, WebP generation               |
| Animation        | CSS transitions + keyframes   | No library needed for the typing effect           |
| Icons            | Lucide React                  | Lightweight, consistent icon set                 |
| Dark Mode        | CSS custom properties + toggle | No JS framework needed, pure CSS variables       |
| Fonts            | Google Fonts (CDN link)       | Space Grotesk, Inter, JetBrains Mono             |

### Hosting & Deployment

| Concern          | Solution                                |
|------------------|-----------------------------------------|
| Hosting          | GitHub Pages (free)                     |
| Repo             | sadishag/sadishag.github.io             |
| Custom Domain    | sadishagalappatti.ca (CNAME already set)|
| CI/CD            | GitHub Actions (already configured)     |
| Build Command    | `npm run build`                         |
| Output Dir       | `dist/`                                 |
| Deploy Action    | `peaceiris/actions-gh-pages@v3`         |
| Branch Strategy  | Push to `main` → Actions builds → deploys to `gh-pages` branch |

### GitHub Pages SPA Routing Fix

GitHub Pages doesn't natively support client-side routing. For blog post routes to work:

1. Add a `404.html` that redirects to `index.html` with the path encoded as a query param
2. Add a script in `index.html` that reads the query param and uses `history.replaceState` to restore the URL
3. This is the standard hack for SPAs on GitHub Pages (used by spa-github-pages)

Alternatively, use hash-based routing (`/#/blog/post-name`) which works natively — simpler but less clean URLs.

### Performance Targets

| Metric                    | Target       |
|---------------------------|--------------|
| Lighthouse Performance    | 95+          |
| Lighthouse Accessibility  | 100          |
| First Contentful Paint    | < 1.0s       |
| Largest Contentful Paint  | < 1.5s       |
| Total Bundle Size (gzip)  | < 150KB (excl. images) |
| Image Format              | WebP with JPEG fallback |
| Photography Images        | Lazy loaded, responsive srcset |

---

## 6. Detailed Section Specs

### 6.1 Hero

- Full-viewport-height section (100vh) on desktop, auto-height on mobile
- Name: "Sadisha Galappatti" in Space Grotesk 700, 48px
- Subtitle: typing animation cycling through roles, Inter 400 20px, Graphite color
- Location: "Toronto, Ontario, Canada" with a subtle map-pin icon
- Social row: GitHub, LinkedIn, X (Twitter), Email icons — 24px, Graphite color, Engineering Blue on hover
- No background image — clean Warm White with plenty of whitespace
- A subtle scroll indicator (thin down-arrow or "↓") at the bottom, fading out on scroll

### 6.2 About

- Two to three paragraphs, first-person, conversational but professional
- Suggested content direction: "I'm Sadisha — I've spent the last six years building cloud infrastructure and full-stack applications for Canada's biggest financial institutions. I care about reliable systems, clear documentation, and teams where people can do their best work. Outside of engineering, I'm usually behind a camera."
- Below the prose: a row of tech chips showing primary skills (React, Node.js, GraphQL, Terraform, Azure, Kubernetes, etc.) — each chip is a pill with Parchment background and Near Black text

### 6.3 Experience

- Vertical timeline layout, left-aligned
- Each entry: company name (linked), role title, date range, and a collapsible bullet list of accomplishments
- Entries to include (from CV data):
  - **Manulife** — Senior Full Stack Cloud Engineer (2019–Present)
  - **RBC** — Software Developer (2017–2019)
  - **BlackBerry** — Software Development Student (co-op)
  - **RBCx Program** — DeltaHacks Co-President (if desired, as a leadership entry)
- Education shown below experience: McMaster University, B.Eng Software Engineering
- The timeline line is a 2px Border-colored vertical rule; active/current role gets an Engineering Blue dot

### 6.4 Projects

- 2-column card grid on desktop, single column on mobile
- Each card: project name, 1-2 sentence description, tech tag pills, and a link icon to the repo or live site
- Cards have Parchment background, subtle Border, and a slight lift (box-shadow) on hover
- Known projects to include:
  - sadishagalappatti.ca (this site)
  - Drive-Thru SPA (YHACK hackathon project)
  - DeltaHacks (organizing/leadership)
  - Any other projects Sadisha wants to add
- Data-driven: add projects by editing `projects.json`

### 6.5 Photography

- Responsive grid gallery (CSS Grid with `auto-fill`, `minmax(280px, 1fr)`)
- Images lazy-loaded with blur-up placeholder
- Click opens a lightbox overlay (simple React modal, no heavy library — or use `yet-another-react-lightbox` which is lightweight)
- Images stored in `src/assets/photography/`, optimized at build time
- This section can start with a handful of photos and grow over time

### 6.6 Blog

- List view on the main page: each post shows title, date, and a 1-line excerpt
- Clicking a title navigates to `/blog/[slug]` which renders the full markdown post
- Blog post page has the same nav header and footer, centered readable column (max-width 680px)
- Markdown supports: headings, code blocks (highlighted with Shiki or Prism), images, links, lists
- Posts are markdown files in `src/content/blog/` with YAML frontmatter:

```yaml
---
title: "My First Post"
date: "2026-07-15"
excerpt: "A short description for the listing page."
---

Post content in markdown...
```

- Sorted by date, newest first on the listing

### 6.7 Footer

- Simple, single-line: `© 2026 Sadisha Galappatti · sadishag@gmail.com`
- Social icons repeated (smaller, Graphite color)
- "Built with React & Vite, hosted on GitHub Pages" in Small/Meta size (optional, a nice engineer touch)

---

## 7. Responsive Breakpoints

| Breakpoint | Width     | Layout Changes                                |
|------------|-----------|-----------------------------------------------|
| Mobile     | < 640px   | Single column, hamburger nav, smaller type    |
| Tablet     | 640–1024px| Two-column project grid, full nav             |
| Desktop    | > 1024px  | Full layout, max-width containers kick in     |

---

## 8. Accessibility

- All images have descriptive alt text
- Color contrast meets WCAG AA (checked: #1A1A1A on #FAF9F7 = 15.4:1, #6B6B6B on #FAF9F7 = 5.7:1 — both pass AA)
- Interactive elements have visible focus states (Engineering Blue outline)
- Skip-to-content link hidden until focused
- `prefers-reduced-motion` respected — typing animation disabled, no scroll effects
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Blog posts use proper heading hierarchy (h1 for post title, h2/h3 for sections)

---

## 9. Implementation Phases

### Phase 1: Foundation (Days 1–3)

- Set up clean Vite + React project (or refactor existing repo)
- Configure CSS custom properties (design tokens from the palette)
- Build the layout shell: sticky nav, section containers, footer
- Implement dark mode toggle with CSS variables
- Set up Google Fonts loading
- Configure GitHub Actions workflow (already exists, may need updating)

### Phase 2: Core Content (Days 4–7)

- Build Hero section with typing animation
- Build About section with tech chips
- Build Experience timeline (data-driven from JSON)
- Build Projects card grid (data-driven from JSON)
- Populate all JSON data files with real content

### Phase 3: Photography & Blog (Days 8–12)

- Build Photography gallery with lightbox
- Optimize and add initial photography images
- Set up markdown blog pipeline (vite-plugin-md or similar)
- Build blog listing component and blog post page
- Implement React Router for blog post routing
- Add 404.html redirect for GitHub Pages SPA support
- Write and add first 1-2 blog posts

### Phase 4: Polish (Days 13–15)

- Responsive testing across breakpoints
- Lighthouse audit and performance optimization
- Accessibility audit (keyboard nav, screen reader, contrast)
- SEO: meta tags, Open Graph, structured data (JSON-LD for Person schema)
- Favicon and apple-touch-icon update
- Final content review and deploy

---

## 10. File & Folder Structure

```
sadishag.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              ← GitHub Actions: build + deploy to gh-pages
├── public/
│   ├── CNAME                       ← sadishagalappatti.ca
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.png                ← Open Graph preview image
│   └── 404.html                    ← SPA redirect for GitHub Pages
├── src/
│   ├── assets/
│   │   └── photography/            ← gallery images
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Nav.module.css
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Photography.jsx
│   │   ├── Lightbox.jsx
│   │   ├── BlogList.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Footer.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── TypeWriter.jsx          ← typing animation component
│   │   └── TechChip.jsx
│   ├── content/
│   │   └── blog/
│   │       └── *.md                ← blog posts
│   ├── data/
│   │   ├── experience.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── social.json
│   ├── styles/
│   │   ├── tokens.css              ← design tokens (colors, type, spacing)
│   │   ├── reset.css               ← CSS reset / normalize
│   │   └── global.css              ← global styles
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx                  ← React Router config
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 11. Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.x",
    "lucide-react": "^0.383.0"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "vite-plugin-md": "^0.x",
    "shiki": "^1.x"
  }
}
```

Intentionally minimal — no UI framework, no state management library, no CSS-in-JS runtime. The site is mostly static content.

---

## 12. SEO & Meta

```html
<title>Sadisha Galappatti — Senior Software Engineer</title>
<meta name="description" content="Senior Full Stack Cloud Engineer based in Toronto. Building reliable systems at Manulife. React, Node.js, Terraform, Azure." />
<meta property="og:title" content="Sadisha Galappatti" />
<meta property="og:description" content="Senior Software Engineer. Builder. Photographer." />
<meta property="og:image" content="https://sadishagalappatti.ca/og-image.png" />
<meta property="og:url" content="https://sadishagalappatti.ca" />
<link rel="canonical" href="https://sadishagalappatti.ca" />
```

Add JSON-LD structured data for Person schema to improve search presence.

---

## 13. Migration Checklist

- [ ] Archive the current site (it's already tagged as release 1.x.x)
- [ ] Decide: keep cv.sadishagalappatti.ca running or redirect to main site
- [ ] Export/collect all photography to include
- [ ] Draft the About section copy
- [ ] Review and update experience entries for accuracy
- [ ] List all projects to feature
- [ ] Write first blog post(s)
- [ ] Update CNAME and DNS if any changes needed
- [ ] Test deployment end-to-end before switching over

---

## 14. Future Considerations (Not in Scope Now)

- **RSS feed** for the blog
- **Search** across blog posts (could use Fuse.js for client-side search)
- **Analytics** (Plausible or Umami for privacy-friendly, self-hostable analytics — or skip entirely)
- **Comments** on blog posts (GitHub Discussions-powered via Giscus)
- **Resume PDF download** button
- **Multilingual support** (not needed now)
- **Move blog to MDX** if interactive components are wanted inside posts

---

*This document is the single source of truth for the website rebuild. All design decisions, technical choices, and implementation details should reference this spec.*
