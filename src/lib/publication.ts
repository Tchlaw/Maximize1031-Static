/** Filter once for pages, related articles, feeds, and sitemap. Dates are UTC. */
export function isPublished(data: { draft: boolean; date: Date }, now = new Date()): boolean {
  return !data.draft && data.date.valueOf() <= now.valueOf();
}
