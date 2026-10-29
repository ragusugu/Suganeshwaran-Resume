# Project skills

UI and design skills for working on this portfolio (React 19 + Vite + Tailwind v3 via CDN,
dark/light mode, mobile-first, deployed to GitHub Pages). They were found through the
Skill Issue catalogue (https://skill-issue.in/api/mcp). Each skill was read in full before
being added, and all of them are documentation only (no scripts or binaries).

| Skill | What it is for | Upstream | Pinned commit | License |
| --- | --- | --- | --- | --- |
| `frontend-design` | Distinctive, intentional visual design instead of generic AI styling | https://github.com/anthropics/skills/tree/main/skills/frontend-design | `ca45fc4` | Apache-2.0 |
| `web-design-guidelines` | Audit UI code against Vercel's Web Interface Guidelines (a11y, focus, forms, animation) | https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines | `1a2c79d` (skill), `434b7f9` (rules) | MIT |
| `accessibility-compliance` | WCAG 2.2, ARIA patterns, keyboard and screen-reader support | https://github.com/wshobson/agents/tree/main/plugins/ui-design/skills/accessibility-compliance | `0874a27` | MIT |
| `responsive-design` | Mobile-first layouts, fluid type, container queries | https://github.com/wshobson/agents/tree/main/plugins/ui-design/skills/responsive-design | `0874a27` | MIT |
| `make-interfaces-feel-better` | Polish: radii, shadows, motion, hit areas, typography details | https://github.com/jakubkrehel/make-interfaces-feel-better | `35545ea` | MIT |

## Changes from upstream

- `web-design-guidelines`: upstream tells the agent to download its rules from a URL on
  every run. This copy bundles a reviewed snapshot (`guidelines.md`) and reads that instead,
  so its instructions cannot change without a commit. All other skills are verbatim copies.

## Removing or updating

Delete a skill's folder to remove it. To update one, compare it against the upstream link
above, review the diff, and commit it.
