---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the bundled rules in `guidelines.md` (next to this file)
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in `guidelines.md`
4. Output findings in the terse `file:line` format described there

## Guidelines Source

The rules are a pinned snapshot of Vercel's Web Interface Guidelines, reviewed before
being bundled here. Upstream originally has this skill download the latest rules from
the network on every run; this copy deliberately does not, so the instructions it follows
cannot change without a commit.

- Upstream: https://github.com/vercel-labs/web-interface-guidelines (`command.md`)
- Pinned commit: 434b7f91364665f2f733b310ec54809bf8f37937
- To update, diff the new `command.md` against `guidelines.md`, review it, and commit it.

## Usage

When a user provides a file or pattern argument:
1. Read `guidelines.md`
2. Read the specified files
3. Apply all rules from `guidelines.md`
4. Output findings using the format specified there

If no files specified, ask the user which files to review.
