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

- 서체(`public/fonts/pretendard/`) — [Pretendard](https://github.com/orioncactus/pretendard) Variable 1.3.9, SIL OFL 1.1
  (`LICENSE.txt` 동봉). npm `pretendard` 패키지의 `dist/web/variable/` 동적 서브셋(css + woff2)을 그대로 복사해 self-host.
  외부 CDN은 쓰지 않는다.
- 홈 히어로 구성(`src/components/Hero.astro`) — Behance [2022 포트폴리오 / 2022 portfolio](https://www.behance.net/gallery/122104365/2022-2022-portfolio)
  첫 장의 구성(회색 그레인 배경 · 산호색 그러데이션 원 · 곡선 문구 · 좌하단 대형 헤드라인)을 참고해 새로 그렸다.
  원본 이미지는 쓰지 않는다 — 원(`public/media/hero-blob.webp`, 1200px 투명 WebP)은 `scripts/render-hero-blob.py`가
  실측 수치(타원 비율·기울기·방향별 번짐·색·노이즈)로 렌더한 것이고, 배경 그레인은 인라인 SVG, 곡선 문구는 SVG textPath.
- 목록 페이지 제목 띠 배경(`public/media/band-fuji.webp`) — 사이트 주인이 제공한 목판화풍 그림(후지산·매화·호수, 낙관
  "サルマン", 원작자·출처 미확인)에서 `scripts/prepare-band-fuji.py`로 빨간 해를 지우고(산호색 원이 그 자리를 대신한다)
  산·호수 구간을 2배로 키운 것. **원작자·이용 조건을 확인하지 못했다** — 확인되면 여기 적는다.
