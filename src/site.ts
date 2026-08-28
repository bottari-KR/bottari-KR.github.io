// 사이트 전역 상수 — 이름·설명·GitHub 은 여기 한 곳에서만 바꾼다. 사이트 주소는 astro.config.mjs 의 `site`.
export const SITE = {
  name: 'bottari-KR',
  /** 홈 히어로 헤드라인(사용자 지정 문구) */
  tagline: 'Jun bundle',
  /** 검색·공유용 설명(meta description) */
  description: 'bottari-KR의 개발 기록',
  github: 'https://github.com/bottari-KR',
  lang: 'ko',
  pageSize: 10,
} as const;

// 카테고리 — 코드 쪽 정본. 순서가 곧 표시 순서. src/content.config.ts 의 enum 이 이 배열을 쓴다.
// 문서 쪽 정본은 에이전트 rule(post-format.md) — 새 카테고리는 사용자가 정하고 두 곳을 같이 바꾼다.
export const CATEGORIES = ['Projects', 'Hackathon', 'Notes'] as const;
export type Category = (typeof CATEGORIES)[number];

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/categories/', label: 'Categories' },
  { href: '/tags/', label: 'Tags' },
  { href: '/archive/', label: 'Archive' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;
