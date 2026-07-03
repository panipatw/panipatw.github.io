---
name: run-panipatw-github-io
description: Build, serve, and screenshot the panipatw.github.io Jekyll portfolio site. Use when asked to run the site, start the dev server, build it, take a screenshot of a page, or verify a page/layout/copy change actually renders.
---

This is a static Jekyll site (no client-side app logic). "Running" it
means `jekyll serve` with the dev config, then driving headless
Chromium via `.claude/skills/run-panipatw-github-io/driver.mjs` to load
every top-level page, click through nav, and save screenshots that
prove it actually renders (fonts, images, layout — not just HTTP 200).

All paths below are relative to the repo root.

## Prerequisites

Ruby/Bundler and Node/npm must be present. Node is only needed for the
screenshot driver, not for the site itself.

```bash
sudo apt-get update
sudo apt-get install -y nodejs npm
```

Playwright needs a real Chromium plus its OS-level shared libraries
(fonts, GTK, NSS, etc.) — a plain `npm install` is not enough:

```bash
cd .claude/skills/run-panipatw-github-io
npm install
sudo npx playwright install-deps chromium   # OS libs, needs root
npx playwright install chromium              # downloads the browser, no root
```

## Setup

```bash
bundle install
```

## Run (agent path)

1. Start Jekyll with the dev config in the background (dev config
   points urls at `localhost:4000` instead of production):

```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml > /tmp/jekyll.log 2>&1 &
echo $! > /tmp/jekyll.pid
timeout 30 bash -c 'until curl -sf http://localhost:4000 >/dev/null; do sleep 1; done'
```

2. Run the driver. It loads `/`, `/info/`, `/publications/`,
   `/projects/`, `/blog/`, `/contact/`, screenshots each (full page),
   clicks the "About" nav link as a representative interaction, and
   fails (`exit 1`) if any page threw a console error.

```bash
cd .claude/skills/run-panipatw-github-io
node driver.mjs /tmp/panipatw-site-shots
```

Screenshots land in `/tmp/panipatw-site-shots/` (`home.png`,
`info.png`, `publications.png`, `projects.png`, `blog.png`,
`contact.png`, `nav-click-about.png`). **Actually view them** — a
missing image or wrong layout won't show up as a curl 200 or a
console error, only in the screenshot.

3. Stop the server when done:

```bash
kill $(cat /tmp/jekyll.pid)
```

## Run (human path)

```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml
# → opens on http://localhost:4000, live-reloads on file changes. Ctrl-C to stop.
```

## Test

There is no test suite. `driver.mjs`'s "no console errors + all
screenshots produced" is the correctness check for this site.

---

## Gotchas

- **`bundle exec jekyll serve` alone uses production URLs.** Always
  pass both configs (`--config _config.yml,_config_dev.yml`) or
  internal links/images point at `panipatw.github.io` instead of
  `localhost:4000`.
- **`npx playwright install-deps chromium` switches to root and
  prompts for a password** even when run via `sudo` from a non-tty
  context (e.g. piped through an agent's shell tool) — it fails with
  `sudo: a terminal is required to read the password`. It has to be
  run from a real interactive terminal the first time. Once the OS
  libs are installed, this step is not needed again on the same
  machine.
- **`playwright install chromium` downloads to `~/.cache/ms-playwright/`**,
  shared across projects — if it's already there from another project
  on the same machine, `npm install` in this skill dir won't
  re-download anything.
- **`node_modules/` here is gitignored** (18MB, reproducible via
  `npm install`) — don't commit it.
- **The `/projects/` page legitimately says "Projects coming soon."**
  when `_posts/projects/` is empty — that's not a bug, it's the
  theme's empty-state copy.

## Troubleshooting

- **`sudo: a terminal is required to read the password`** on
  `playwright install-deps`: run that one command yourself in an
  actual terminal (not through an agent's non-interactive shell tool),
  then hand control back.
- **`curl: (7) Failed to connect` polling `localhost:4000`**: check
  `/tmp/jekyll.log` — usually a Sass/Liquid syntax error from a page
  edit, printed near the top of the log.
