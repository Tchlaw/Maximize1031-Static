# Migration and SEO notes

## Preserved

All 12 original blog filenames, capitalization, publication dates, and article bodies are preserved.
MDX files are now Markdown; their bodies used no React components. Existing `slug` aliases remain
available for resolving related-post references but do not change public URLs.

Existing `/blog`, `/contact`, `/faq`, `/privacy`, and `/terms` routes remain available. Homepage
`#about` and `#contact` anchors remain. The FAQ page now points readers to the primary guides.

## Corrected

- Unified `description`, `summary`, and `excerpt` handling for article previews.
- Canonical URLs consistently use `https://maximize1031.com` and the actual filename URL.
- Removed stale frontmatter canonicals pointing at nonexistent category paths.
- Fixed the malformed `2026-104-09` update date and `yupdated` field typo.
- Removed references to missing article header images; all pages use a branded social image.
- Updated embedded article contact links to the new direct-contact page.
- Added sitemap, robots, RSS, article and breadcrumb schema, accessible navigation, and branded 404.
- Draft and future posts are omitted from all public discovery surfaces at build time.
- Removed HubSpot, duplicate Analytics snippets, unused UI components, and the application runtime.

## Production handoff

This branch changes the build system from Next.js to Astro. Adjust the current hosting project's
framework/build/output settings before merging to production. Preview the branch first. No live host,
DNS, Search Console property, paid subscription, or billing setting was changed by this code change.

The host must serve nested `index.html` files at existing extensionless article URLs and return
`404.html` with HTTP 404 for missing routes. Both common static hosting configurations are included.
Configure permanent www-to-apex redirection at the hosting/domain level. Do not redirect every old
article to the homepage. If you later rename an article, add a specific 301/308 redirect.

Submit the sitemap in Search Console and inspect representative URLs after launch. The redesign
improves crawlability, consistency, and usability; traffic and lead effects require measurement.

## Editorial review

Existing financial/tax claims were not independently verified in this migration. Dates were not
artificially refreshed. Review older articles and cite IRS and California FTB sources before making
substantive updates. Do not add testimonials or credentials without evidence.
