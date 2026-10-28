import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { isPublished } from '../src/lib/publication.ts';

const root = path.resolve('dist');
const htmlFiles = fs.readdirSync(root, { recursive: true }).filter(f => String(f).endsWith('.html'));
const files = htmlFiles.map(f => ({ path: path.join(root, f), html: fs.readFileSync(path.join(root, f), 'utf8') }));
const resolvePage = pathname => path.join(root, pathname.endsWith('.html') ? pathname : `${pathname}/index.html`);

test('all original article URL paths still have a built page', () => {
  const originals = [
    '2025-07-09-reverse-1031-exchange-guide-california',
    '2025-10-26-bona-fide-1031-failed-exchange-tax-deferral',
    '2025-10-26-deferring-gains-fire-damaged-lot',
    '2025-10-26-selling-fire-damaged-lot-after-buying-new-home',
    '2025-10-26-understanding-1031-exchange-basics',
    '2025-11-13-What-You-Can-Actually-Buy-In-a-1031-Exchange',
    '2025-11-26-How-to-Invest-in-REITs',
    '2025-11-29-when-not-to-do-a-1031-exchange-cost-seg-vs-deferral',
    '2025-12-03-charitable-remainder-trust-basics',
    '2026-04-09-permissible-use-of-exchange-funds',
    '2026-04-15-selling-california-property-and-buying-out-of-state',
    '2026-04-27-how-to-structure-partner-owned-real-estate-for-1031-flexibility',
  ];
  originals.forEach(id => assert.ok(fs.existsSync(resolvePage(`/blog/${id}`)), id));
});

test('draft and future posts stay private until a build after publication', () => {
  const now = new Date('2026-10-28T12:00:00Z');
  assert.equal(isPublished({draft:true, date:new Date('2025-01-01')}, now), false);
  assert.equal(isPublished({draft:false, date:new Date('2026-10-29')}, now), false);
  assert.equal(isPublished({draft:false, date:new Date('2026-10-28')}, now), true);
});

test('internal links and article table-of-contents fragments resolve', () => {
  for (const file of files) {
    for (const [, href] of file.html.matchAll(/href="([^"\s]+)"/g)) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      if (href.startsWith('/_astro/')) continue;
      const url = new URL(href, `https://maximize1031.com${file.path.slice(root.length).replace(/index\.html$/, '')}`);
      const target = url.pathname.endsWith('.xml') || url.pathname.endsWith('.svg') ? path.join(root, url.pathname) : resolvePage(url.pathname);
      assert.ok(fs.existsSync(target), `${file.path}: ${href}`);
      if (url.hash && target.endsWith('.html')) {
        const content = fs.readFileSync(target, 'utf8');
        assert.ok(content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file.path}: missing ${href}`);
      }
    }
  }
});

test('SEO metadata uses one canonical host and valid structured data', () => {
  for (const {path:file, html} of files) {
    assert.match(html, /<title>[^<]+<\/title>/, file);
    assert.match(html, /name="description" content="[^"]+"/, file);
    assert.match(html, /rel="canonical" href="https:\/\/maximize1031\.com\//, file);
    assert.match(html, /property="og:image" content="https:\/\/maximize1031\.com\/social.jpg"/, file);
    for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) assert.doesNotThrow(() => JSON.parse(json), file);
  }
  assert.ok(fs.statSync(path.join(root,'social.jpg')).size > 1000);
  const sitemap = fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 18);
  assert.match(fs.readFileSync(path.join(root,'404.html'),'utf8'), /noindex, follow/);
});

test('no HubSpot, tracking scripts, or intake forms ship', () => {
  for (const {html,path:file} of files) {
    assert.doesNotMatch(html, /hsforms\.net|hs-form-frame|googletagmanager\.com|hubspot\.com|<iframe/i, file);
    assert.doesNotMatch(html, /<form(?![^>]*role="search")/i, file);
  }
});
