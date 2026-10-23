# 어쩔저쩔 홍보 사이트

충주 청년 커뮤니티 **어쩔저쩔**의 원페이지 홍보 사이트.
목적: 활동/모임을 알리고, 포스터나 신청 버튼을 누르면 **활동 신청 설문(구글폼 등)** 으로 보낸다.

- 슬로건: **So Whaaat** / 세상의 기준을 깨고 나만의 기준을 세우자
- 활동 분류: `SOWHAT?_활동`, `WHATSO!_모임` (예: "어쩌다 영화관"은 모임)
- 유지보수자: 비개발자 1명. **콘텐츠 수정은 `src/content/site.ts` 한 파일 + `public/` 이미지 업로드만으로 끝나야 한다.**

---

## 스택
- Next.js (App Router, TypeScript) — 정적 페이지로 충분, 서버 기능 불필요
- Tailwind CSS + shadcn/ui
- 21st.dev 컴포넌트 (Magic MCP 또는 `npx shadcn add <21st 링크>`)
- Motion (`motion/react`) — 등장/스프링/스태거
- Lenis — 부드러운 스크롤
- next/image — 포스터·사진 최적화
- 배포: Vercel (GitHub push → 자동 배포)

## 폴더 구조
```
reference/            # 사용자가 준 원본 캡처 (사이트 시안, 포스터) — 빌드에 포함 안 함
public/
  brand/              # logo.svg, so-whaaat.svg, burst-*.svg, og.png
  posters/            # 활동 포스터 (1:1 정사각형, jpg/webp)
  gallery/            # 지난 활동 사진
src/
  content/site.ts     # ★ 유일한 콘텐츠 편집 지점
  components/sections/  # Hero, About, Sowhat, Whatso, Gallery, Contact, Footer
  components/ui/      # shadcn + 21st 컴포넌트
  lib/                # 날짜 판정 등 유틸
```

## 콘텐츠 스키마 (`src/content/site.ts`)
```ts
export type Program = {
  title: string;            // "어쩌다 영화관"
  type: "sowhat" | "whatso";
  date: string;             // "2026-10-28"  (YYYY-MM-DD)
  time?: string;            // "18:30-21:00"
  place?: string;           // "충주시 문화창업재생허브 2층"
  summary?: string;         // "'나만의 영화' 랜덤뽑기, 영화감상, 나눔모임"
  poster: string;           // "/posters/movie-1028.jpg"
  formUrl: string;          // 신청 설문 링크
};
```
그 외: 브랜드 소개 문구, 숫자 지표, 갤러리 이미지 배열, 연락처(인스타·이메일·오픈채팅), 메타/OG 문구.

규칙:
- 파일 맨 위에 **한국어 주석으로 "포스터 추가하는 법"** 을 예시와 함께 적어둘 것 (복붙 → 값만 수정).
- 오늘(KST) 날짜가 `date`를 지나면 **자동으로 마감 처리**: 카드 흑백+흐리게, "마감" 뱃지, 클릭 비활성. 지난 항목은 갤러리 쪽 "지난 활동"에 노출.
- 예정 항목은 날짜 가까운 순 정렬.
- **헤더의 "신청하기" 버튼 = 가장 가까운 예정 활동의 `formUrl`**. 예정 활동이 없으면 활동 섹션으로 스크롤.
- 외부 링크는 `target="_blank" rel="noopener noreferrer"`.
- 정적 빌드 시점이 아닌 **클라이언트에서 날짜 판정** (재배포 없이도 마감 반영되도록).

## 디자인 토큰 (reference/site.jpg 기준)
- 배경: `#0B0B0B`, 화면 중앙이 살짝 밝은 방사형 그라데이션(`#2A2A2A` → `#0B0B0B`)
- 텍스트: 흰색 `#FFFFFF`, 보조 `#A3A3A3`
- 포인트: 네온 그린 `#5BE01F` (CTA 버튼, 강조, 호버 글로우). 버튼은 완전 둥근 pill, 검정 글자
- 포스터/시네마 무드 보조색: 앰버 `#E8C27A` (WHATSO 섹션, 포커스 프레임)
- 그래픽 모티프: **흰 외곽선 starburst(폭발 말풍선)**, stroke 2–3px, 채움 없음
- 폰트: Pretendard (본문·내비 Bold). 로고와 "So Whaaat"는 SVG 이미지로 사용
- 무드: 메인은 코믹북식 반항 에너지, 포스터 영역은 필름 그레인 시네마틱 — 두 무드의 대비를 살린다

## 에셋 추출 (최우선 작업)
`reference/site.jpg`에서 추출:
1. 좌상단 **어쩔저쩔 로고** → 크롭 → 고대비 처리 → `potrace`로 벡터화 → `public/brand/logo.svg`
2. 중앙 **So Whaaat 말풍선** → 같은 방식 → `public/brand/so-whaaat.svg`
3. 주변 starburst들은 트레이싱보다 **SVG path로 직접 새로 그려** 3–4종 변형 생성 (`burst-1..4.svg`)
- 원본 해상도가 낮으므로 트레이싱 후 노드 정리, 결과를 PNG로 렌더해 원본과 나란히 비교 확인
- `reference/poster-movie.jpg`는 `public/posters/movie-1028.jpg`로 복사해 첫 데이터로 사용

## 섹션 명세 (내비 순서와 동일, 앵커 스크롤)
1. **Header**: 로고 / 브랜드 소개 · SOWHAT?_활동 · WHATSO!_모임 · 문의 및 협업 / [신청하기]. 스크롤 시 배경 블러+반투명. 모바일은 햄버거 메뉴
2. **Hero**: 중앙 So Whaaat 말풍선 + 슬로건, 주변 starburst 떠다님
3. **브랜드 소개**: 어쩔저쩔 의미, 슬로건 풀이, 키워드 카드 3–4개, 숫자 카운터
4. **마퀴 띠**: `SO WHAT? ✦ WHATSO! ✦ 어쩔저쩔 ✦` 무한 흐름 (섹션 구분용, 반복 사용 가능)
5. **SOWHAT?_활동**: 포스터 그리드 (type=sowhat)
6. **WHATSO!_모임**: 포스터 그리드 (type=whatso), 앰버 톤 + 필름 그레인 배경
7. **지난 활동 갤러리**: 사진 + 마감된 포스터
8. **문의 및 협업**: 인스타그램, 이메일, 오픈채팅, 협업 제안 문구
9. **Footer**
- 한 type에 예정 항목이 없으면 "곧 새로운 활동이 올라와요" 빈 상태 표시

## 모션 규칙
- Hero 진입: So Whaaat 말풍선 스프링 팝인(scale 0.3→1, 살짝 오버슈트), 이어서 슬로건 단어 단위 페이드업
- 주변 starburst: 느린 부유+회전 루프, 데스크톱은 마우스 패럴랙스(요소마다 깊이 다르게)
- 스크롤 등장: 섹션 페이드업(y 24px), 카드 스태거 0.08s, `once: true`
- 포스터 카드 호버: 살짝 틸트+확대, **네 모서리에 앰버 [+] 초점 프레임 브래킷이 나타남**(포스터 디자인 언어 차용), 하단에 "신청하기 →" 노출. 모바일은 탭 시 눌림 효과
- 신청하기 버튼 호버: 그린 글로우 + 짧은 흔들림(wiggle)
- `prefers-reduced-motion` 이면 모든 루프/패럴랙스/팝인 끄고 단순 페이드만
- 애니메이션은 transform/opacity만 사용 (레이아웃 흔들림 금지)

## 품질 기준
- **모바일 우선** (인스타·카톡 유입이 대부분). 360px에서 가로 스크롤 없음
- 모바일 하단 고정 "신청하기" 바
- OG 이미지/메타: 카톡·인스타 공유 미리보기 (`public/brand/og.png`, 1200×630)
- 포스터 alt 텍스트는 title+날짜로 자동 생성
- Lighthouse 모바일 성능 90+ 목표, 이미지 lazy load
- 한국어 UI, 줄바꿈은 `word-break: keep-all`

## 작업 방식
- 디자인 결정 전 `frontend-design` 스킬을 먼저 적용
- 컴포넌트는 21st.dev에서 찾아 쓰되(Magic MCP), 위 디자인 토큰에 맞게 재스타일링
- 섹션 하나 완성할 때마다 dev 서버로 확인 후 다음 섹션
