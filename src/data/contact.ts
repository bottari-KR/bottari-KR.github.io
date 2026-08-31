// 문의(/contact/) 페이지 내용 — 이 파일만 고치면 된다. 2026-08-31 사용자 확정: 운영자·연락처 실값,
// 회신 줄·협업 절 삭제, 본문은 블로그 절 한 문장. 공개 사이트에 그대로 나가므로 공개해도 되는 연락 수단만 적는다.
//
// 형식
//   owner / email : 상단 요약 줄 (운영자 · 연락처)
//   channels : 연락 카드 목록 — { label, value, href, icon }  icon 은 'mail' | 'github' | 'inquiry' 중 하나
//   sections : 아래 본문 절 목록 — { heading, body } (body 는 문장 하나 이상, 줄바꿈은 배열 항목으로)
import { SITE } from '../site';

export const CONTACT = {
  owner: '이원준',
  email: 'sutadd1@gmail.com',

  channels: [
    { label: '이메일', value: 'sutadd1@gmail.com', href: 'mailto:sutadd1@gmail.com', icon: 'mail' },
    { label: 'GitHub', value: SITE.github.replace('https://github.com/', ''), href: SITE.github, icon: 'github' },
  ],

  sections: [
    {
      heading: '블로그',
      body: ['글 오류·깨진 링크 제보는 이메일로 보내 주세요.'],
    },
  ],
} as const;
