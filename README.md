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

## 미디어 출처

- `public/media/hero-forest.mp4` · `hero-forest-*.jpg` — "Aerial View of Verdant Forest Canopy", Chris The Island,
  Pexels https://www.pexels.com/video/aerial-view-of-verdant-forest-canopy-35724530/
  (Pexels License https://www.pexels.com/license/ — 무료 사용, 표기 의무 없음).
  Pexels HD 다운로드본(1280×720 60fps)을 9초 · 24fps · H.264 CRF 33 · 무음으로 재인코딩하고, 끝 1초를 처음 1초에
  크로스페이드해 이음새 없는 루프로 만들었다. 포스터 jpg 는 루프 첫 프레임(progressive).
- `public/media/`는 git에 직접 커밋한다 — LFS 금지(`actions/checkout` 기본이 `lfs: false`라 포인터 파일이 배포된다).
  재인코딩 교체는 이력에 쌓이니 최소화.
