// 소개(/about/) 페이지 오른쪽 열의 내용 — 이 파일만 고치면 된다. 값은 전부 임시 자리표시(2026-08-28)이고
// 실제 내용은 사이트 주인이 직접 채운다. 비워 두고 싶은 절은 배열을 []로 두면 그 절은 렌더되지 않는다.
//
// 형식
//   name / birth : 문자열 하나
//   education, experience : { year, text } 목록 — year 는 "2020" 처럼 문자열(표기 그대로 나온다)
//   certification : 문자열 목록 (앞에 점이 붙는다)
//   skills : 문자열 목록 (작은 칩으로 나온다)

export const PROFILE = {
  name: '이원준 / LEE WON JUN',
  birth: '2003.12.11',

  education: [
    { year: 'YYYY', text: '학교 · 학과 (입력 예정)' },
    { year: 'YYYY', text: '학교 · 학과 (입력 예정)' },
  ],

  experience: [
    { year: 'YYYY', text: '활동 · 수상 · 프로젝트 (입력 예정)' },
    { year: 'YYYY', text: '활동 · 수상 · 프로젝트 (입력 예정)' },
    { year: 'YYYY', text: '활동 · 수상 · 프로젝트 (입력 예정)' },
  ],

  certification: ['자격증 (입력 예정)', '자격증 (입력 예정)'],

  skills: ['Python', 'PyTorch', '(입력 예정)'],
} as const;

// 왼쪽 열 — 헤드라인(줄마다 하나)과 소개 문단. 2026-08-28 사용자 확정 문구.
export const ABOUT_HEADLINE = ['Engineers', 'like', 'iteration'] as const;
export const ABOUT_LEDE =
  '좋은 AI는 한 번에 만들어지지 않습니다. 학습하고, 평가하고, 다시 개선하는 반복의 과정 속에서 조금씩 나아집니다. ' +
  '어찌 보면 하나의 완성된 모델처럼 보이지만, 사실 수백 번의 실험과 실패가 모여 만들어낸 결과물입니다. ' +
  '소중한 그 반복들이 모였을 때 비로소 좋은 시스템이 되는 것처럼, 한 걸음씩 개선하며 만드는 AI 엔지니어링을 추구합니다.';
