---
title: "How I Deploy This Site: a Dev Subsite on GitHub Pages"
date: "2026-07-18"
excerpt: "Two repos, one custom domain, and a manual promotion step that keeps the live site boring."
---

GitHub Pages gives you one site per repo. This site needs two: a live one
on my custom domain, and a staging one I can break without anyone noticing.
So I run two repos and a promotion step between them. Here's the whole
setup.

## Two repos, two jobs

- **`dev.sadishag.github.io`** — the repo you're reading from. Every push
  to `main` builds and deploys here. Because it's a *project* repo, GitHub
  serves it under a subpath: `sadishag.github.io/dev.sadishag.github.io/`.
- **`sadishag.github.io`** — the user Pages repo. It owns the custom
  domain, `www.sadishagalappatti.ca`, and only ever updates through a
  deliberate promotion.

Same source in both places. The only thing that differs is where the site
thinks it lives.

## The subpath problem

A Vite app bakes its asset paths in at build time. On the dev site those
paths sit under `/dev.sadishag.github.io/`; on the live domain they sit at
`/`. Get this wrong and every script and stylesheet 404s.

I drive it from a single `BASE_URL` env var:

```js
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [blogPlugin(), react()],
    base: encodeURI(`/${env.BASE_URL}`),
  };
});
```

On the dev repo, `BASE_URL` is a repository Actions variable set to the
repo name, so `base` becomes `/dev.sadishag.github.io/`. The promotion
workflow sets it to `/`. Local dev leaves it empty. One knob, three
environments.

## The CNAME trap

The `CNAME` file that claims `www.sadishagalappatti.ca` lives at the repo
**root** — deliberately not in `public/`. If it were in `public/`, Vite
would copy it into `dist/`, the dev site's Pages deploy would try to claim
the custom domain, and it would fight the production repo for it.

Kept at the root, it's excluded from the build entirely. Only the
production repo configures the domain.

## Deploying the dev site

Every push to `main` runs the QA workflow — lint, build, and hand the
`dist/` folder to the official GitHub Pages actions. No third-party deploy
action, no `gh-pages` branch.

```yaml
on:
  push:
    branches: ["main"]
  workflow_dispatch:

env:
  BASE_URL: ${{ vars.BASE_URL }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: "npm" }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: "./dist" }
      - uses: actions/deploy-pages@v4
```

If the lint step fails, nothing ships. The dev site is a real, browsable
staging environment, not a preview I have to squint at.

## Promoting to production

Production never auto-deploys. Promotion is a button I press — a
`workflow_dispatch` job that rsyncs the dev working tree into the
production repo, minus the plumbing:

```bash
rsync -av \
  --exclude '.github' \
  --exclude '.git' \
  --exclude 'sadishag.github.io' \
  ./ ./sadishag.github.io/
```

Then it commits the copy onto a branch in the production repo and opens a
pull request:

```bash
git checkout -b feature/prod-deployment
git commit -am "feat: match dev.sadishag.github.io"
git push --set-upstream origin feature/prod-deployment
gh pr create --base main --head feature/prod-deployment
```

Merging that PR is what actually ships the live site — the production
repo runs its own Pages build (with `BASE_URL=/`) on the custom domain.

## Why bother

Every path to the live domain is a reviewable diff. Nothing reaches
`sadishagalappatti.ca` without me merging a pull request I can read line by
line, and I always have a working copy of the exact same code sitting at a
public URL to test first. The dev site absorbs all the risk; the
production site stays boring. That's the whole point.
