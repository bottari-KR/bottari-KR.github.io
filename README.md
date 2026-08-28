# bottari-KR.github.io

개인 기록·브랜딩 블로그. [Astro](https://astro.build)로 만들고 GitHub Pages(GitHub Actions)로 배포한다.

- 사이트: https://bottari-kr.github.io/
- 글: `posts/YYYY-MM-DD-<slug>.md` (repo 루트 바로 아래, 하위폴더 없음). URL은 `/posts/<파일명>/`.
  front matter 필수 = `title` · `description` · `pubDate`(`YYYY-MM-DD`) · `categories`.
  **게시하려면 `draft: false`를 명시한다** — 생략하면 `true`(비공개)라 빌드에서 조용히 빠진다. dev 서버는 draft도 보여 준다.
  `cover`는 `public/` 기준 절대 경로(`/images/...`) 또는 `""`.
- 카테고리: `Projects` · `Hackathon` · `Notes` (`src/site.ts`의 `CATEGORIES`가 코드 쪽 정본).

```sh
npm install
npm run build             # dist/ 생성
npm run build -- --force  # 글을 지우거나 이름을 바꾼 뒤 — 콘텐츠 캐시(node_modules/.astro)가 옛 글을 남긴다
npm run dev               # 로컬 미리보기 (draft 도 보인다)
```

`main`에 push하면 `.github/workflows/deploy.yml`이 빌드해서 배포한다.

## 출처

- 홈 히어로 일러스트(`src/components/Bucket.astro`) — 21st.dev 계열 "Bucket" React 컴포넌트(motion/react + shadcn)를
  Astro 네이티브로 옮긴 것. SVG 마크업은 원본 그대로, 카드 낙하 애니메이션은 CSS 키프레임(React·Tailwind 없음).
- 카드 아이콘(`src/components/icons.ts`) — [Hugeicons](https://hugeicons.com) Free, MIT(`@hugeicons/core-free-icons` 4.3.0)의
  `SecurityCheck` · `Zap` · `UserStory` · `Sparkles` path 데이터를 인라인. 패키지는 빌드에 쓰지 않는다.
