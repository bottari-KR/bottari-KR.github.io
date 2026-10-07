// 사이트 전역 상수 — 이름·설명·GitHub 은 여기 한 곳에서만 바꾼다. 사이트 주소는 astro.config.mjs 의 `site`.
export const SITE = {
  name: 'bottari-KR',
  /** 헤더 왼쪽 홈 버튼 표기(사용자 지정) — name 은 title·footer·og 에 그대로 쓴다 */
  brand: '보따리',
  /** 홈 버튼 앞 그림 — 사용자가 준 산타 사진(큰 보따리 끄는 산타)에서 배경을 지운 것. scripts/prepare-brand-santa.py 가
   *  내용 해시가 붙은 파일명을 출력한다 — 그림을 바꾸면 여기 경로도 바꾼다(같은 이름으로 덮으면 캐시 때문에 안 바뀌어 보인다) */
  brandMark: '/media/brand-santa-d891fd81.webp',
  /** 링크 공유 미리보기(og:image) 기본 카드 1200×630 — 홈 히어로(그레인 종이·산호 원·heroArc 곡선·tagline 헤드라인)를 그대로 찍은
   *  JPEG(2026-10-07 사용자: "JUN BUNDLE 하고 배경"). 내용이 바뀌면 파일명(sha1 8자)도 바꾼다(캐시). 글은 front matter cover 가 있으면
   *  그것을 우선한다(Layout.astro). 원본·재생성 절차는 scripts/og-card.html 머리 주석 */
  ogImage: '/media/og-default-6cc98ba9.jpg',
  ogImageAlt: 'Jun Bundle · AI Engineer',
  /** 홈 히어로 헤드라인(사용자 지정 문구) */
  tagline: 'Jun Bundle',
  /** 홈 히어로 원 둘레를 도는 문구(사용자 지정) */
  heroArc: 'AI Engineer',
  /** 검색·공유용 설명(meta description · og:description) — 2026-10-07 사용자 지정("bottari-KR의 개발 기록" 대신 footerLine 과 같은 문구) */
  description: '나의 기록을 보따리에 담아가다.',
  /** 링크 공유 카드의 홈 제목(og:title·twitter:title) — 페이지 제목이 없는 홈에서만 쓴다(2026-10-07 사용자 지정).
   *  탭 제목·og:site_name·푸터 © 는 name 그대로 */
  shareTitle: '이원준',
  /** 푸터 소개 문구(2026-09-01 사용자 지정) — meta description 과 분리 */
  footerLine: '나의 기록을 보따리에 담아가다.',
  github: 'https://github.com/bottari-KR',
  lang: 'ko',
  pageSize: 10,
} as const;

// 카테고리 — 코드 쪽 정본. 순서가 곧 표시 순서. src/content.config.ts 의 enum 이 이 배열을 쓴다.
// 문서 쪽 정본은 에이전트 rule(post-format.md) — 새 카테고리는 사용자가 정하고 두 곳을 같이 바꾼다.
export const CATEGORIES = ['Projects', 'Retrospect', 'Notes'] as const;
export type Category = (typeof CATEGORIES)[number];

/** 카테고리 앞 이모지(2026-08-31 사용자 요청) — 카테고리 페이지 표기용. 글 front matter 에는 안 들어간다 */
export const CATEGORY_EMOJI: Record<Category, string> = {
  Projects: '⚒️',
  Retrospect: '📌',
  Notes: '📝',
};

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
