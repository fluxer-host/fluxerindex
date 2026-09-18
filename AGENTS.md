# AGENTS.md — FluxerIndex theme

Zola theme behind fluxer.how: a flat, borderless listing of link cards and docs with per-section accent colors, a content-driven navbar, and client-side search. The theme's display name is FluxerIndex; the repo, theme directory and `theme = "fluxerindex"` key stay lowercase. This directory is the theme repo in staging: it is both the theme and its own demo site (`zola.toml` + `content/`), so `zola serve` works right here.

## Commands

Run at the repo root (this repo is both the theme and its own demo site):

- `zola check` — link/asset validation; the external link to `https://index.fluxer.host` fails until that domain is live, that's expected
- `zola build` / `zola serve` — demo build / dev server

Theme mechanics to know:

- `theme.toml` `[extra]` only merges into `config.extra` when the theme is consumed via `theme = "..."`. Standalone (this demo) it is ignored, so templates carry `| default(value=...)` fallbacks matching the `theme.toml` values; don't remove them.
- Sites override theme files by path: same-named files in the site's `templates/`/`static/` win. Brand assets (favicon, OG image, badge icon) work this way.

## Layout

- `theme.toml` — theme metadata, GPL-3.0, author AshtakaOOf, `[extra]` defaults: `footer`, `official_icon = "assets/fluxer.svg"`, `official_label = "Official"`
- `zola.toml` — demo site config, `base_url = "https://index.fluxer.host"`, demo `[extra] footer`
- `content/` — demo content: root `_index.md` (`template = "home.html"`, `sort_by = "weight"`), `documentation/` (weight 10, accent blue), `tutorials/` (weight 20, accent yellow), `about.md` (weight 30, accent green), plus sample entries exercising cards, tags, badge and search
- `templates/` — `base.html` (head/feed logic + blocks), `section.html`, `home.html`, `content.html` (entry detail), `about.html`, `404.html`, `rss.xml`, `anchor-link.html` (renders `icons/link.svg`; `_markdown.scss` stretches the anchor over the whole heading so the text is clickable too, and reveals the icon to the left of the heading on hover), and `partials/`: `head.html` (static head tags, fed `description_text`/`og_title_text` via `set` from `base.html`, since blocks don't inherit through includes), `navbar.html`, `footer.html`, `section-content.html` (listing markup, shared by `section.html` and `home.html`), `card.html`. This Tera predates `{% import %}`, so there are no macro files: shared markup stays as includes or small inline duplication
- `sass/` — `style.scss` pulls in, in order: `_colors.scss` (all color variables, the `bg-light-text`/`bg-dark-text` mixins and the `bg-*` accent classes; imported first so every file sees the colors), `_base.scss` (layout tokens + `$breakpoint`, `pixel-icon`, font, reset, scrollbar, content shell), `_chrome.scss` (navbar, rss, footer), `_listing.scss` (section headers, search, cards, badges, empty states), `_markdown.scss` (prose), `_pages.scss` (entry detail, about, 404). Each component file ends with its own `@media (max-width: $breakpoint)` block for the single mobile breakpoint, so responsive rules stay after the rules they override
- `static/icons/` — MIT licensed 24×24 pixel-art SVGs from [halfmage/pixelarticons](https://github.com/halfmage/pixelarticons)
- `static/assets/` — default brand assets: favicon, icon, OG image, apple-touch-icon, official badge icon; sites override by filename
- `static/fonts/Lexend/` — self-hosted variable TTF from [Google Fonts](https://fonts.google.com/specimen/Lexend), SIL OPEN FONT LICENSE Version 1.1
- `static/_headers` — cache headers (Netlify/Cloudflare Pages); fonts cached 1 year `immutable`
- `static/search.js` — client-side card filtering (title/tags, optionally descriptions)

## Theme contract

- Navbar tabs are content-driven: the root section's `subsections` (weight-sorted) followed by direct root pages (`page.components | length == 1`, which filters out transparent-inherited entries). Root `_index.md` needs `sort_by = "weight"`. Labels are `title`, colors are `extra.accent`, hrefs are `permalink`.
- Active tab: first path segment match (`current_path | split(pat="/")`, then `path_parts[1]`; this Tera rejects `is starting_with(...)` test arguments). Empty segment = first tab. 404 has no `current_path`: the navbar defaults the segment to `"/404"`, which matches nothing.
- RSS is derived from content: the button and `base.html`'s `<link rel="alternate">` appear only when the current segment's section has `generate_feeds = true`; on the homepage they fall back to the first subsection. Feed filename comes from `config.feed_filenames | first`.
- `home.html` paints the page background with the first subsection's accent, so the homepage follows the first navbar tab.
- Footer text: `config.extra.footer` (markdown). Official badge: `config.extra.official_icon` + `official_label`, shown on entries with `official = true`.
- The navbar brand is a `<span>` with `config.title`, not a link: the homepage is already the first tab's listing.
- Browser tab titles use the format `Page - Site` (page title first, ASCII hyphen). The 404 page is the playful exception: `404 ~ Site`.

## Conventions

### Templates (Tera)

- Inline SVG icons with `{{ load_data(path="icons/name.svg") | safe }}`, never `<img>`, so `fill="currentColor"` inherits the CSS color. The path must NOT start with `static/`: Zola's file search checks the site's `static/` before the theme's, and a `static/`-prefixed path never reaches the theme's `static/` dir.
- `base.html` computes `feed_href`/`feed_title` once (whitespace-controlled with `{%-`) and both the `<link rel="alternate">` and the navbar button reuse them.
- `base.html` provides a `{% block body_class %}`; every page template sets it from the section's `extra.accent` (`bg-<accent>`; `404.html` sets it empty). Entry pages (`content.html`) look the accent up via the page's parent section.

### Styles (Sass, compiled by Zola)

- Comments are single-line lowercase: `// navbar`, never multi-line banner comments.
- No borders, no outlines, no box-shadows-on-white: flat fills and rounded corners (`$border-radius`, `$card-radius`) only.
- `.bg-<name>` classes in `_colors.scss` define `--accent`/`--accent-contrast` custom properties plus a light-text or dark-text mixin for text-on-color; `body` paints its background with `var(--accent)`. Navbar tabs carry the same `bg-<accent>` class, so their active and hover colors follow each tab's own section accent.
- Pixel-art icons render at integer scales of their 24px source (24 or 12) with `image-rendering: pixelated`, never 14px etc.
- New icons go in `static/icons/` with `fill="currentColor"`.

### Scrolling architecture (deliberate, don't revert)

The viewport never scrolls. `body` is a fixed-height flex column (`100dvh`, `overflow: hidden`); `.page-scroll` is the only scroll container. This exists so the scrollbar can never overlap the navbar or displace layout. Inside it:

- Chromium: `overflow-y: overlay` (floats, takes no space). Firefox: `scrollbar-width: thin` fallback.
- The footer lives inside `.page-scroll` (appears only at scroll-bottom) with side-only margins and top-rounded corners so the scrollbar lane passes through page background, never the black footer.
- Trade-off: keyboard scrolling needs the content area focused first.

### RSS

- Feeds are enabled per-section (`generate_feeds = true` in each section's `_index.md`), never globally: a root feed breaks because `section` is undefined there.
- `templates/rss.xml` overrides Zola's built-in feed because the built-in only includes pages with a `date`. Ours iterates `section.pages` directly and omits `pubDate`. Keep entries date-free.
