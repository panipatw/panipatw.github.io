# Portfolio Website Guide

A reference for understanding and customizing this Jekyll-based portfolio site.

---

## Project Overview

This is the **Feeling Responsive** Jekyll theme, forked as the base for a personal portfolio at `https://panipatw.github.io`. Jekyll is a static site generator: you write content in Markdown files with some configuration, and it builds plain HTML/CSS that gets served on GitHub Pages.

---

## The Mental Model: Data → Templates → Pages

```
_data/         ← site-wide settings (nav, social links, footer)
_config.yml    ← global site settings (title, author, URL)
pages/         ← static pages (About, Contact, etc.)
_posts/        ← blog posts and project write-ups
      ↓ fed into ↓
_layouts/      ← page skeletons (HTML wrappers)
_includes/     ← reusable HTML fragments
_sass/         ← styling (colors, fonts, layout)
      ↓ builds into ↓
_site/         ← final HTML output (DON'T edit — it's auto-generated)
```

---

## File-by-File Breakdown

### `_config.yml` — The master control file

The most important file. It sets:
- `title`, `slogan`, `description` — shown in the header/footer/SEO
- `author: panipatw` — links to your profile in `_data/authors.yml`
- `url` — your live site URL
- `socialmedia` — your LinkedIn/GitHub handles
- `paginate: 5` — how many blog posts per page
- `plugins` — jekyll-paginate (blog pagination), jekyll-gist (embed GitHub gists), jekyll-asciidoc

---

### `_data/` — Structured content that drives navigation and footer

| File | Controls |
|---|---|
| `authors.yml` | Your name, role, website shown on posts |
| `navigation.yml` | Every link in the top navigation bar |
| `socialmedia.yml` | Social icons in the footer (LinkedIn, GitHub, etc.) |
| `services.yml` | Left footer column (Contact, RSS links) |
| `network.yml` | Right footer column (credits/attributions) |
| `language.yml` | All UI text strings ("Read more", "New blog entries", etc.) |

---

### `pages/` — Your static pages

Each `.md` file here becomes a page on the site. The important ones:

| File | URL |
|---|---|
| `pages/pages-root-folder/index.md` | `/` (the homepage) |
| `pages/contact.md` | `/contact/` |
| `pages/info.md` | `/info/` |
| `pages/getting-started.md` | `/getting-started/` |

The homepage uses `layout: frontpage` and defines three "widgets" (the three content cards on the front page) entirely in the front matter — the `---` block at the top of the file.

---

### `_posts/` — Blog posts and project entries

Posts live in subdirectories by category. The filename format is mandatory:

```
_posts/design/2014-07-10-page.md  →  /design/page/
```

For a portfolio, create a category like `_posts/projects/` and each file inside is one project write-up.

---

### `_layouts/` — Page skeletons

Every page picks one with `layout:` in its front matter:

| Layout | Use it for |
|---|---|
| `frontpage` | The homepage only |
| `page` | Standard content page with optional sidebar |
| `page-fullwidth` | Full-width content, no sidebar |
| `blog` | The paginated blog listing |
| `video` | Pages with an embedded video hero |
| `redirect` | Redirects to another URL |

You rarely edit layouts directly unless you want to change the global page structure.

---

### `_includes/` — Reusable HTML fragments

**Two categories:**

**Prefixed with `_`** — layout partials (used automatically by layouts):
- `_head.html` — `<head>` tag, meta tags, CSS links
- `_masthead.html` — the top navigation bar
- `_footer.html` — the footer with social icons
- `_sidebar.html` — sidebar content (currently placeholder — put your bio here)

**Without `_`** — shortcodes you call inside Markdown content:
```liquid
{% include alert success="Great job!" %}
{% include gallery %}
{% include list-posts entries='5' %}
```

---

### `_sass/` — Styling

The numbered files load in order:

| File | Controls |
|---|---|
| `_01_settings_colors.scss` | **All site colors** as variables |
| `_02_settings_typography.scss` | Fonts and sizes |
| `_04_settings_global.scss` | Spacing, border radius, global variables |
| `_07_layout.scss` | Page structure |
| `foundation-components/` | The CSS grid system — don't edit these |

To change colors sitewide, only edit `_01_settings_colors.scss`.

---

### `images/` — All your images

Header images, gallery images, thumbnails. Referenced in front matter using just the filename (e.g., `header_unsplash_1.jpg`) — the `urlimg` config variable provides the full URL prefix automatically.

---

## Key Front Matter Options

Every `.md` file starts with a `---` block. The most useful options:

```yaml
---
layout: page                      # which layout to use
title: "My Project"               # page title
subheadline: "A subtitle"         # smaller text under the title
teaser: "Short description"       # shown in blog/project listings
header:
  image_fullwidth: my-image.jpg   # full-width header image
  background-color: "#EFC94C"     # OR use a solid color instead
sidebar: right                    # show sidebar: left or right
image:
  thumb: my-thumb.jpg             # thumbnail for listings
  title: my-title.jpg             # image in the post header area
permalink: /projects/my-project/
---

Your content here in Markdown...
```

---

## Where to Start Editing (in priority order)

### Step 1 — Establish your identity

**`_config.yml`**
```yaml
title: 'Your Name'
slogan: 'Your tagline'
description: 'A short bio for SEO and the footer.'
```

**`_data/authors.yml`**
```yaml
panipatw:
  name: "Your Full Name"
  siterole: "Software Engineer"
  uri: https://panipatw.github.io/
  email: your@email.com
```

### Step 2 — Customize the homepage

**`pages/pages-root-folder/index.md`**

Replace the three widgets with your own sections (e.g., "My Projects", "About Me", "Contact"). Each widget takes a `title`, `text`, `url`, and optionally an `image`. Also swap the `header.image_fullwidth` to one of your own images.

### Step 3 — Fix the navigation

**`_data/navigation.yml`**

Remove the theme-demo links (Templates, Header Styles, etc.) and replace with your actual pages: About, Projects, Blog, Contact.

### Step 4 — Update the footer

- **`_data/socialmedia.yml`** — already has LinkedIn/GitHub; uncomment others if needed
- **`_data/services.yml`** — rename the "Services" heading and links to match your site
- **`_data/network.yml`** — currently theme credits; keep or replace with your own

### Step 5 — Write your content

- **About page**: edit `pages/info.md`
- **Project posts**: create `_posts/projects/YYYY-MM-DD-project-name.md` using `layout: page`
- **Sidebar**: edit `_includes/_sidebar.html` to show a short bio instead of lorem ipsum

### Step 6 — Adjust colors (optional)

Open `_sass/_01_settings_colors.scss` and change the color variables. The whole site updates.

---

## The Build Flow

When you push to the `gh-pages` branch, GitHub Actions automatically runs:
```
bundle exec jekyll build
```
It reads your content, layouts, and styles, then outputs static HTML into `_site/`. That folder is what gets served as your live website. You never edit `_site/` directly.

**Local development:**
```bash
# Install dependencies (first time only)
bundle install

# Serve locally — always use both config files
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

The `_config_dev.yml` overrides the URL to `localhost:4000` so images and links work correctly on your machine. The site will be at `http://localhost:4000`.
