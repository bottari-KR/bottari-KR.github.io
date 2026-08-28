// 사이트 전역 상수 — 이름·설명·GitHub 은 여기 한 곳에서만 바꾼다. 사이트 주소는 astro.config.mjs 의 `site`.
export const SITE = {
  name: 'bottari-KR',
  /** 헤더 왼쪽 홈 버튼 표기(사용자 지정) — name 은 title·footer·og 에 그대로 쓴다 */
  brand: '보따리',
  /** 홈 버튼 앞 그림 — 사용자가 준 산타 사진(큰 보따리 끄는 산타)에서 배경을 지운 것. scripts/prepare-brand-santa.py 가
   *  내용 해시가 붙은 파일명을 출력한다 — 그림을 바꾸면 여기 경로도 바꾼다(같은 이름으로 덮으면 캐시 때문에 안 바뀌어 보인다) */
  brandMark: '/media/brand-santa-d891fd81.webp',
  /** 홈 히어로 헤드라인(사용자 지정 문구) */
  tagline: 'Jun Bundle',
  /** 홈 히어로 원 둘레를 도는 문구(사용자 지정) */
  heroArc: 'AI Engineer',
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

// 헤더 메뉴 — 한국어 라벨(2026-08-28 사용자 결정) + 글자색과 같은 단색 아이콘(src/components/NavIcon.astro 의 이름).
export const NAV = [
  { href: '/', label: '홈', icon: 'home' },
  { href: '/categories/', label: '카테고리', icon: 'grid' },
  { href: '/tags/', label: '태그', icon: 'tag' },
  { href: '/archive/', label: '아카이브', icon: 'archive' },
  { href: '/about/', label: '소개', icon: 'user' },
  { href: '/contact/', label: '문의', icon: 'inquiry' },
] as const;
export type NavIconName = (typeof NAV)[number]['icon'] | 'github' | 'mail';
