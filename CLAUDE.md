# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for **Panipat W** — Machine Learning Engineer with a background in biomechanics research. Built on the [Feeling Responsive](https://github.com/Phlow/feeling-responsive) Jekyll theme, deployed to GitHub Pages at `https://panipatw.github.io`. The site is designed for job hunting: minimal style, focused on About, Publications, Projects, Blog, and Contact.

## Local Development

```bash
# Install dependencies (first time)
bundle install

# Serve locally with dev overrides (recommended — uses localhost URLs instead of production)
bundle exec jekyll serve --config _config.yml,_config_dev.yml

# Build for production
bundle exec jekyll build
```

The dev config (`_config_dev.yml`) overrides `url`, `baseurl`, and `urlimg` to point at `localhost:4000`, and enables expanded Sass output. Always use both config files when developing locally.

## Deployment

Pushing to the `gh-pages` branch triggers the GitHub Actions workflow (`.github/workflows/jekyll.yml`), which builds and deploys to GitHub Pages automatically. There is no staging environment — `gh-pages` is the production branch.

## Git Commit Practices

This is a **public repository** — commit messages are visible to anyone. Follow these rules for every commit:

- **No `Co-Authored-By` lines.** Never include `Co-Authored-By: Claude` or any AI attribution in commit messages.
- **No references to external sites or tools** used as design inspiration (e.g. do not name third-party sites in commit messages).
- **Generic messages for sensitive features.** Pages or assets that are intentionally hidden or unlisted must use non-revealing commit messages that give no hint of the feature's purpose or URL. Use messages like `Add site assets and pages` or `Update site configuration` instead of describing what was actually added.
- **Author identity:** The repo git config is set to `Panipat W <38853478+panipatw@users.noreply.github.com>`. All commits should appear under this identity only.

## Site Structure

### Pages (all use `layout: page-fullwidth`, no header images, no sidebar)

| File | URL | Purpose |
|---|---|---|
| `pages/pages-root-folder/index.md` | `/` | Minimal homepage: name, tagline, social links |
| `pages/info.md` | `/info/` | About page: bio, education, experience, skills, profile photo |
| `pages/publications.md` | `/publications/` | 4 publications listed by year with DOI links |
| `pages/projects.md` | `/projects/` | Auto-lists all posts in `_posts/projects/` as cards |
| `pages/contact.md` | `/contact/` | Email and social links |
| `blog/index.html` | `/blog/` | Paginated blog listing (5 per page) |

### Navigation (`_data/navigation.yml`)
Home · About · Publications · Projects · Blog (left side) · Contact (right side)

### Adding a new project
Create `_posts/projects/YYYY-MM-DD-title.md` — it appears on `/projects/` automatically. Use `_posts/projects/2025-01-01-example-project.md` as a template.

### Adding a blog post
Create `_posts/YYYY-MM-DD-title.md` (or in a subdirectory for categorisation). Post filenames follow `YYYY-MM-DD-title.md`; the category subdirectory becomes part of the URL permalink (`/:categories/:title/`).

### Legacy theme demo content
`_posts/design/` contains the original theme's demo posts. They are still published but not linked from navigation. Safe to delete when no longer needed as reference.

## Configuration and Data

- `_config.yml` — site title, slogan, description, author, plugins, pagination, SEO keys, social handles
- `_data/authors.yml` — author profile for `panipatw` (name, role, email, URI)
- `_data/navigation.yml` — top navigation bar links
- `_data/socialmedia.yml` — footer social icons (LinkedIn, GitHub)
- `_data/services.yml` — left footer column ("Quick Links")
- `_data/network.yml` — right footer column ("Connect")
- `_data/language.yml` — UI strings ("Read more", etc.)

## Key Assets

- `assets/img/logo.png` — banner image shown in the site masthead (600×80px). Replace this file to change the banner branding.
- `images/panipat-profile.jpg` — profile photo, referenced in `pages/info.md`
- `images/` — all other images (headers, thumbnails). Referenced in front matter by filename; `site.urlimg` provides the full URL prefix.

## Architecture

### Layouts and includes
- `_layouts/page-fullwidth.html` — used by all main portfolio pages (no sidebar, full-width content)
- `_layouts/page.html` — standard page with optional sidebar
- `_layouts/blog.html` — paginated blog index
- `_layouts/frontpage.html` — homepage with widget support (not currently used)
- `_includes/_masthead.html` — site banner/logo area
- `_includes/_navigation.html` — top navigation bar (reads from `_data/navigation.yml`)
- `_includes/_sidebar.html` — sidebar with bio and connect links (shown when `sidebar: left/right` is set in front matter)
- `_includes/_footer.html` — footer with description, services, network, and social icons

### Styling
- `_sass/_01_settings_colors.scss` — all site colors as variables; edit here to retheme
- `_sass/_02_settings_typography.scss` — fonts and sizes
- `_sass/foundation-components/` — Zurb Foundation 5 grid/component partials (do not edit)
- `assets/css/styles_feeling_responsive.scss` — SCSS entry point that imports all partials

### Key front matter options
- `layout: page-fullwidth` — preferred for portfolio pages (no sidebar, clean)
- `layout: page` — use when you want a sidebar (`sidebar: left` or `sidebar: right`)
- `header: image_fullwidth: filename.jpg` — adds a full-width header image (omit for no header)
- `teaser:` — short description used for SEO and post listings
- `author: panipatw` — links to profile in `_data/authors.yml`
- `comments: false` — Disqus is disabled (`disqus_shortname` unset); keep false
