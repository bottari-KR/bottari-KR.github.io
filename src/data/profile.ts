// 소개(/about/) 페이지 오른쪽 열의 내용 — 이 파일만 고치면 된다. 2026-10-07 사이트 주인이 준 이력으로 실값을 채웠다.
// 비워 두고 싶은 절은 배열을 []로 두면 그 절은 렌더되지 않는다.
//
// 형식
//   name / birth : 문자열 하나
//   experience, education, projects, activities : { year, text } 목록 — year 는 표기 그대로 나온다("2020.03 ~ 2021.11" 같은 기간도 됨)
//   certification : 문자열 목록 (앞에 점이 붙는다)
//   skills : 문자열 목록 (작은 칩으로 나온다)
//   절 순서·제목(Experience/Education/Projects/Activities)은 src/pages/about.astro 의 sections 에 있다.

export const PROFILE = {
  name: '이원준 / LEE WON JUN',
  birth: '2003.12.11',

  // 경력(재직)
  experience: [
    { year: '2020.03 ~ 2021.11', text: '(주)유니테크 · SMT 공정 설비 운용 및 PCB 제작' },
    { year: '2021.11 ~ 2024.02', text: '(주)프라임솔루션 · 서지보호장치(SPD) 연구개발·설계, 품질·공정·생산·자재 관리' },
    { year: '2026 ~ 현재', text: '광주인공지능사관학교 교육생 · AI 서비스 개발 팀 프로젝트 수행' },
  ],

  // 학력
  education: [{ year: '2024.03', text: '대림대학교 융합전자통신과 졸업(학사)' }],

  // 프로젝트(연구) 실적
  projects: [
    { year: '2022', text: '(주)프라임솔루션 지능형 SPD(PZF) 시제품 연구개발 및 테스트' },
    { year: '2026', text: '중대재해처벌법 대응 서비스 개발' },
    { year: '2026', text: '납품대금연동제 AI 솔루션 서비스 개발 (광주인공지능사관학교 팀 프로젝트, 2026.12 평가 발표)' },
    {
      year: '2026.08 ~',
      text:
        'AI 에이전트 개발(개인) · Claude Code 기반 업무 자동화 에이전트·스킬 개발 ' +
        '(발표자료 자동 생성, 행정 서식 자동 작성·제출 등), GitHub에 스킬 공개',
    },
  ],

  // 주요 활동
  activities: [{ year: '2026.09', text: '랄프톤(AI 에이전트 해커톤) 참가 · 여행 서비스 웹을 AI 에이전트 단독 빌드로 개발' }],

  // 자격
  certification: ['전자기기기능사 (2021)', '전자기기생산 L2 (2021)', '전자기기하드웨어개발 L3 (2023)'],

  // 보유 기술
  skills: ['전기·전자·통신 설계', 'Ansys HFSS', 'SOLIDWORKS', 'Python', 'AI 에이전트 개발'],
} as const;

// 왼쪽 열 — 헤드라인(줄마다 하나)과 소개 문단. 2026-08-28 사용자 확정 문구.
export const ABOUT_HEADLINE = ['Engineers', 'like', 'iteration'] as const;
export const ABOUT_LEDE =
  '좋은 AI는 한 번에 만들어지지 않습니다. 학습하고, 평가하고, 다시 개선하는 반복의 과정 속에서 조금씩 나아집니다. ' +
  '어찌 보면 하나의 완성된 모델처럼 보이지만, 사실 수백 번의 실험과 실패가 모여 만들어낸 결과물입니다. ' +
  '소중한 그 반복들이 모였을 때 비로소 좋은 시스템이 되는 것처럼, 한 걸음씩 개선하며 만드는 AI 엔지니어링을 추구합니다.';
