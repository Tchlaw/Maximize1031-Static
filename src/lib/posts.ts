import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished } from './publication';
export type Post = CollectionEntry<'posts'>;
export const postUrl = (post: Post) => `/blog/${post.id}`;
export const description = (post: Post) => post.data.description || post.data.summary || post.data.excerpt || '';
export const readTime = (post: Post) => Math.max(1, Math.ceil((post.body || '').split(/\s+/).length / 220));
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
export const topic = (post: Post) => post.data.category === 'fire-loss' ? 'Property loss' : '1031 exchanges';
export async function publishedPosts() {
  const now = new Date();
  return (await getCollection('posts', ({ data }) => isPublished(data, now)))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export function relatedPosts(post: Post, all: Post[]) {
  const explicit = post.data.relatedPosts.flatMap(slug => {
    const found = all.find(p => p.id !== post.id && (p.id === slug || p.data.slug === slug));
    return found ? [found] : [];
  });
  return [...new Map([...explicit, ...all.filter(p => p.id !== post.id && p.data.category === post.data.category)].map(p => [p.id, p])).values()].slice(0, 3);
}
