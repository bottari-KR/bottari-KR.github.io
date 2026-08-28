// 문의(/contact/) 페이지 내용 — 이 파일만 고치면 된다. 값은 임시 자리표시(2026-08-28)이고 사이트 주인이 직접 채운다.
// 공개 사이트에 그대로 나가므로 공개해도 되는 연락 수단만 적는다.
//
// 형식
//   owner / email / replyWithin : 상단 요약 줄 (운영자 · 연락처 · 회신)
//   channels : 연락 카드 목록 — { label, value, href, icon }  icon 은 'mail' | 'github' | 'inquiry' 중 하나
//   sections : 아래 본문 절 목록 — { heading, body } (body 는 문장 하나 이상, 줄바꿈은 배열 항목으로)
import { SITE } from '../site';

export const CONTACT = {
  owner: '운영자 이름 (입력 예정)',
  email: 'email@example.com (입력 예정)',
  replyWithin: '평일 기준 N일 (입력 예정)',

  channels: [
    { label: '이메일', value: 'email@example.com (입력 예정)', href: '', icon: 'mail' },
    { label: 'GitHub', value: SITE.github.replace('https://github.com/', ''), href: SITE.github, icon: 'github' },
  ],

  sections: [
    {
      heading: '블로그',
      body: ['글 오류·깨진 링크 제보는 이메일로 보내 주세요. (입력 예정)'],
    },
    {
      heading: '협업·문의',
      body: ['프로젝트·협업 제안은 제목에 [문의]를 붙여 주세요. (입력 예정)'],
    },
  ],
} as const;
