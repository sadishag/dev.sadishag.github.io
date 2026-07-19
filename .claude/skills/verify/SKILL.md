---
name: verify
description: Build, run, and drive sadishagalappatti.ca (Vite + React SPA) in a headless browser to verify changes at the rendered-page surface.
---

# Verify sadishagalappatti.ca

## Build & launch

- `npm run lint && npm run build` — CI gate (QA workflow runs both).
- Dev server: `npm run dev` (port 5173, base `/` because `.env` has `BASE_URL=""`).
- Deploy-realistic build: `BASE_URL="dev.sadishag.github.io" npm run build` then
  `BASE_URL="dev.sadishag.github.io" npx vite preview --port 4173` and browse
  `http://localhost:4173/dev.sadishag.github.io/`. This mirrors the QA GitHub
  Pages deployment, which serves the site under that subpath (BASE_URL comes
  from a repo Actions variable). Always check asset paths in `dist/index.html`
  are prefixed with `/dev.sadishag.github.io/` after a build-config change.

## Drive

No Playwright on this machine. Use `puppeteer-core` (install in the scratchpad,
not the repo) with the system Chrome:

```js
executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
```

Gotchas learned the hard way:

- This machine's OS reports `prefers-color-scheme: dark`, so headless Chrome
  loads the site in dark mode. Call
  `page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }])`
  before `goto` for a deterministic baseline.
- `body` background has a 0.3s theme transition — wait ~500ms after clicking
  the theme toggle before reading computed colors.
- Theme toggle selector: `button[aria-label^="Switch to"]`. Theme state lives
  in `<html data-theme>` and `localStorage.theme`.
- Smooth scrolling: wait ~1200ms after clicking a nav anchor before asserting
  `scrollY` / active link (`nav a[aria-current="true"]`).
- Mobile menu (viewport ≤ 639px): open with `button[aria-label="Open menu"]`,
  links live in `nav[aria-label="Mobile"]`.
- `fullPage: true` screenshots stitch scroll segments, duplicating the sticky
  nav and misplacing the fixed skip link mid-page. Don't treat those as layout
  bugs — re-check with a normal-viewport screenshot at that scroll position.

## Flows worth driving

1. Light/dark toggle + persistence across reload + OS-preference fallback
   (clear `localStorage.theme`, emulate the media feature, reload).
2. Nav anchors: sticky header stays at top 0; target section heading lands
   ~56px (nav height) below viewport top via `scroll-margin-top`.
3. First Tab focuses the "Skip to content" link (position: fixed — must be
   visible even when the page loads scrolled to a hash).
4. Preview build at the QA base path with a `response`/`requestfailed`
   listener — zero 4xx/failed requests.
5. Blog: list → `/blog/:slug` route, Shiki token colors flip with the theme
   (spans carry `--shiki-light`/`--shiki-dark` vars), deep link to a post, and
   the 404-decoder path (`/?/blog/<slug>` must restore the URL and render —
   test at the subpath too: `/dev.sadishag.github.io/?/blog/<slug>`).
6. Lightbox: open from a tile, ArrowLeft/Right navigate, Escape closes,
   `body` overflow restores, focus returns to the triggering tile.
