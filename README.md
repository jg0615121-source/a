# 어쩔저쩔 홍보 사이트

충주 청년 커뮤니티 **어쩔저쩔**의 원페이지 사이트. So Whaaat — 세상의 기준을 깨고 나만의 기준을 세우자.

## 내용 고치기 (개발 지식 없이)

1. 포스터 이미지를 `public/posters/` 폴더에 업로드
2. `src/content/site.ts` 파일을 열어 맨 위 안내대로 활동을 추가하고 Commit
3. 1~2분 뒤 사이트에 자동 반영

날짜가 지난 활동은 자동으로 '마감' 처리되어 '지난 활동'으로 옮겨집니다.

## 개발

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint && pnpm exec tsc --noEmit && pnpm build
```

Next.js(App Router) · Tailwind CSS · Motion · Lenis · Pretendard. 배포는 Vercel(GitHub 연결 후 push 시 자동 배포).
