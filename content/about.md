+++
title = "About"
weight = 30
template = "about.html"
description = "About this demo site"

[extra]
accent = "rose"
+++

# FluxerIndex

FluxerIndex is a flat, borderless [Zola](https://www.getzola.org/) theme for listing libraries of links and docs: card grids, per-section accent colors, a content-driven navbar, official badges and client-side search. It powers [FluxerHow](https://fluxer.how), the community knowledge hub for Fluxer, and this site is its demo.

## What it does

- **Card listing** — every entry is a markdown file with a title, description, tags, an external url and an optional official badge. Sections render as a searchable card grid, entries render as detail pages.
- **Content-driven navbar** — tabs come straight from your content: each section's `_index.md` provides its title, weight and accent color, no theme config needed.
- **Accent colors** — each section paints the whole page in its accent defined in the `sass/_colors.scss`, with text contrast handled automatically.
- **Feeds** — sections opt into RSS with `generate_feeds`, the navbar and page head pick the right feed from wherever you are.
- **Search** — a tiny dependency-free script filters cards by title and tags, optionally by description.

## The Fluxer ecosystem

FluxerIndex is community projects around [Fluxer](https://fluxer.app/), the open-source chat platform. [FluxerHost](https://fluxer.host/) offers free community hosting for Fluxer instances, bots and projects. Neither is affiliated with Fluxer Platform AB.

## Credits

Designed by [AshtakaOOf](https://github.com/AshtakaOOf), licensed GPL-3.0. Icons are [pixelarticons](https://github.com/halfmage/pixelarticons) (MIT), the body font is [Lexend](https://fonts.google.com/specimen/Lexend) (SIL OFL 1.1). Built with Zola.
