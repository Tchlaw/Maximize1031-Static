import type { APIRoute } from 'astro';
import { publishedPosts, postUrl, description } from '../lib/posts';
const escape = (s: string) => s.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export const GET: APIRoute = async ({ site }) => {
  const items = (await publishedPosts()).map(p => `<item><title>${escape(p.data.title)}</title><link>${new URL(postUrl(p), site)}</link><guid>${new URL(postUrl(p), site)}</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${escape(description(p))}</description></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Maximize 1031 journal</title><link>${site}</link><description>Practical guides for investment property owners.</description><language>en-us</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/xml' } });
};
