# Suganeshwaran R: portfolio

Personal portfolio for Suganeshwaran R, a Data Engineer. Live at https://ragusugu.github.io/Suganeshwaran-Resume/

The page is built around one idea: a data pipeline. The hero shows a pipeline running from sources through
Bronze, Silver and Gold to serving, and each stage shows what was built there.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4 and [Motion](https://motion.dev) for animation. Fonts
(Bricolage Grotesque, IBM Plex Sans and Mono) are self-hosted, icons are inline SVG, and nothing loads from a CDN.

## Run it locally

Requires Node 20.19 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000/Suganeshwaran-Resume/ (the path matters: the site is served from a sub-path on GitHub Pages).

Other commands:

```bash
npm run typecheck   # strict TypeScript check
npm run build       # production build into dist/
npm run preview     # serve the production build locally
```

## Editing the content

All text lives in [`src/content.ts`](src/content.ts): profile, stats, pipeline stages, experience, projects, stack,
education and certifications. Edit it and the page updates; no component changes needed.

- Design tokens (colors, fonts, light and dark) are at the top of [`src/index.css`](src/index.css).
- Sections are in [`src/components/`](src/components).
- The downloadable résumé is `public/Suganeshwaran-R-Data-Engineer-Resume.pdf`. Replace the file, keeping the name.
- The social preview image is `public/og.png` (1200×630).

## Accessibility and motion

Animations respect the visitor's reduced-motion setting: loops stop and content appears without transitions.
The site opens in light mode; the toggle switches to dark and remembers the choice. There is a skip link, visible
focus styles, and the pipeline diagram is fully keyboard operable.

## Deploying

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to the
`claude/optimistic-meitner-ttk7qy` branch (or by hand from the Actions tab). It runs on Node 22 because
Tailwind v4 requires Node 20 or newer.

To host from a different branch, change `on.push.branches` in that file. If the deploy step is refused with
"not allowed to deploy to github-pages", add the branch under Settings, Environments, github-pages,
Deployment branches.
