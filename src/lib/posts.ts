import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../site';

export type Post = CollectionEntry<'posts'>;

/**
 * 게시된 글, 최신순. dev 서버에서는 draft 도 보여 준다(미리보기용) — 빌드에서는 빠진다.
 * 같은 날짜는 id(= 파일명) 역순으로 고정한다 — 로더가 주는 순서는 실행마다 달라 로컬과 CI 결과가 어긋날 수 있다.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || b.id.localeCompare(a.id),
  );
}

/**
 * 본문 글자 수 — 코드 블록·이미지·HTML 태그·마크다운 기호·공백을 뺀 문자 수.
 * 글 머리 "글자 수"에 쓴다(레퍼런스 hexo-wordcount 와 같은 취지 — 공백 제외).
 */
export function countChars(body: string | undefined): number {
  if (!body) return 0;
  const t = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*_`~|-]+/g, '');
  return t.replace(/\s/g, '').length;
}

/** 읽기 시간(분) — front matter `readingMinutes` 가 있으면 그 값, 없으면 300자/분 올림(최소 1). */
export function readingMinutes(post: Post, chars: number): number {
  return post.data.readingMinutes ?? Math.max(1, Math.ceil(chars / 300));
}

export function postHref(post: Post): string {
  return `/posts/${post.id}/`;
}

export function categoryHref(category: string): string {
  return `/categories/${encodeURIComponent(category)}/`;
}

export function tagHref(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`;
}

/** 카테고리별 글 수 — 정본 순서대로, 글이 없는 카테고리도 0 으로 포함. */
export function countCategories(posts: Post[]): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>(CATEGORIES.map((c) => [c, 0]));
  for (const post of posts) {
    for (const c of post.data.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return [...counts].map(([name, count]) => ({ name, count }));
}

/** 태그별 글 수 — 많은 순, 같으면 이름순. */
export function countTags(posts: Post[]): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const t of post.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** 연도별 묶음 — 최신 연도부터. */
export function groupByYear(posts: Post[]): Array<{ year: number; posts: Post[] }> {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const y = post.data.pubDate.getUTCFullYear();
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y)!.push(post);
  }
  return [...groups].sort((a, b) => b[0] - a[0]).map(([year, posts]) => ({ year, posts }));
}
