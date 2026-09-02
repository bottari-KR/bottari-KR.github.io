import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './site';

// 글은 repo 루트 `posts/` 바로 아래 — `YYYY-MM-DD-<slug>.md`. 하위폴더는 받지 않는다(`*.md`).
// entry id = 확장자 뺀 파일명 그대로(기본 generateId 는 front matter `slug` 로 덮어쓸 수 있어 막는다).
// 이 스키마는 에이전트 rule(post-format.md)의 front matter 표와 같아야 한다 — 한쪽을 바꾸면 다른 쪽도.
const posts = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './posts',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // YYYY-MM-DD 만 — 시각이 섞이면 빌드 머신 타임존에 따라 날짜가 하루 밀린다. YAML 이 Date 로 파싱한 값도 받는다.
    pubDate: z
      .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'pubDate 는 YYYY-MM-DD')])
      .pipe(z.coerce.date()),
    categories: z.array(z.enum(CATEGORIES)).min(1),
    tags: z.array(z.string()).default([]),
    // public/ 기준 절대 경로(`/images/...`) 또는 빈 문자열 — 상대 경로는 dist 에 복사되지 않는다.
    cover: z.string().regex(/^(\/\S*)?$/, 'cover 는 / 로 시작하는 public/ 경로 또는 ""').default(''),
    draft: z.boolean().default(true),
    // 읽기 시간(분) 재정의 — 없으면 본문 글자 수 ÷ 300자/분 올림(src/lib/posts.ts). 사용자가 지정할 때만 쓴다.
    readingMinutes: z.number().int().positive().optional(),
  }),
});

export const collections = { posts };
