# Maximize 1031

A small, static Astro website. Articles are plain Markdown in `content/posts/`.
No database, CMS subscription, React runtime, HubSpot, or form backend is required.

## Publish an article through GitHub

1. Open `content/posts` on GitHub and choose **Add file → Create new file**.
2. Name it `2026-10-28-your-article-title.md`. The filename becomes the public URL.
3. Copy the frontmatter and structure from [`templates/article.md`](templates/article.md).
4. Write the article using Markdown. Change `draft: true` to `draft: false` when ready.
5. Commit to a branch, check the build, then merge. A connected hosting service rebuilds automatically.

The template supplies the heading, author, dates, reading time, table of contents, related articles,
canonical URL, social metadata, and structured data. Do not repeat the article title as a Markdown H1.
Existing article filenames preserve the original public URLs, including capitalization. Do not rename
published files without configuring permanent redirects on your host.

For images, upload to `public/images/` and reference them as
`![A meaningful description](/images/your-image.jpg)`. Optimize image sizes before uploading.
Markdown supports headings, lists, links, blockquotes, and tables.

## Local development

Use Node 24 LTS or newer.

```sh
npm ci
npm run dev
```

## Check and build

```sh
npm run build
npm test
npm run preview
```

The output is `dist/`. It is ordinary HTML, CSS, font files, and a small amount of JavaScript for
navigation and filtering. It can be served by any static host. The site does not run Node in production.
Draft and future-dated articles are excluded from pages, related links, sitemap, and RSS. Future posts
appear on the next build after their publication date; scheduling requires a host rebuild.

## Deploy from GitHub

On the existing hosting project, change the framework preset from **Next.js** to **Astro** (or **Other**),
build command to `npm run build`, and publish/output directory to `dist`. Install command: `npm ci`.
Remove any Next.js runtime/adapter setting. Use Node 24. Configure a preview deployment first.

Keep `maximize1031.com` as the primary domain and configure a permanent redirect from
`www.maximize1031.com` to `maximize1031.com` at the host. `astro.config.mjs` defines the canonical domain.
For a preview hostname, set the host's `X-Robots-Tag: noindex` header or preview access protection.

The included `netlify.toml` and `vercel.json` supply static build settings for those hosts. Choose
one host; neither file creates an account or changes a live deployment. GitHub Pages can also serve
`dist`, but use an external GitHub Actions deployment workflow for that host's specific setup.

Before switching production: verify the 12 existing article URLs, contact links, legal pages, the 404,
`/sitemap.xml`, and the canonical-domain redirect. Then submit `/sitemap.xml` in Google Search Console.
Monitor indexing, search clicks, and the host's request logs after launch. No ranking improvement is guaranteed.

## Editing the site

- Homepage and contact: `src/pages/index.astro`, `src/pages/contact.astro`
- Navigation, footer, site-wide metadata: `src/layouts/Layout.astro`
- Article formatting and design tokens: `src/styles/global.css`
- Blog metadata requirements: `src/content.config.ts`
- SEO migration notes: [`docs/migration.md`](docs/migration.md)

HubSpot embeds and Google Analytics scripts from the previous version have been removed. This code
sets no analytics cookies and does not load a tracking service. Hosting and email providers may keep
operational logs. Removing the embed does not cancel any HubSpot plan or delete historical data.
The legal pages retain existing terms, with privacy language adjusted for direct email/phone contact.

The existing articles were migrated, not substantively fact-checked or updated. Publication dates
remain original. Review tax-sensitive content and add primary sources when making editorial updates.
