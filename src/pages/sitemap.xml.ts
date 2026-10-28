import type { APIRoute } from 'astro';
import { publishedPosts, postUrl } from '../lib/posts';
export const GET: APIRoute = async ({ site }) => {
  const pages = ['/', '/blog', '/contact', '/faq', '/privacy', '/terms'].map(path => `<url><loc>${new URL(path, site)}</loc></url>`);
  const posts = (await publishedPosts()).map(post => `<url><loc>${new URL(postUrl(post), site)}</loc><lastmod>${(post.data.updated || post.data.lastModified || post.data.date).toISOString()}</lastmod></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...pages, ...posts].join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
