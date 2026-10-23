/* ============================================================================
 * 어쩔저쩔 사이트 콘텐츠 — 이 파일 하나만 고치면 사이트 내용이 바뀝니다.
 * ============================================================================
 *
 * ■ 포스터(활동·모임) 추가하는 법
 *   1. 포스터 이미지(정사각형 1:1, jpg 또는 webp)를 GitHub에서
 *      public/posters/ 폴더에 업로드합니다.  예) public/posters/hiking-1115.jpg
 *   2. 아래 programs 목록 맨 끝에 다음 블록을 복사해서 붙여 넣고 값만 바꿉니다.
 *
 *      {
 *        title: "어쩌다 등산",                  // 활동 이름
 *        type: "whatso",                        // "sowhat" = 활동, "whatso" = 모임
 *        date: "2026-11-15",                    // 날짜 (YYYY-MM-DD)
 *        time: "10:00-14:00",                   // 시간 (없으면 줄 삭제)
 *        place: "충주 계명산 입구",              // 장소 (없으면 줄 삭제)
 *        summary: "가볍게 오르고, 내려와서 점심", // 한 줄 소개 (없으면 줄 삭제)
 *        poster: "/posters/hiking-1115.jpg",    // 1번에서 올린 파일 이름 (앞에 /posters/)
 *        formUrl: "https://...",                // 신청 설문 링크
 *      },
 *
 *   3. 저장(Commit)하면 1~2분 뒤 사이트에 자동으로 반영됩니다.
 *
 * ■ 날짜가 지나면 자동으로 '마감' 처리되고 '지난 활동'으로 옮겨집니다. 지우지 않아도 됩니다.
 * ■ 헤더의 [신청하기] 버튼은 가장 가까운 예정 활동의 신청 링크로 자동 연결됩니다.
 * ■ 지난 활동 사진은 public/gallery/ 에 올리고 아래 gallery 목록에 추가합니다.
 * ========================================================================== */

export type Program = {
  title: string;
  type: "sowhat" | "whatso";
  date: string; // YYYY-MM-DD
  time?: string;
  place?: string;
  summary?: string;
  poster: string;
  formUrl: string;
};

export type GalleryPhoto = {
  src: string; // "/gallery/movie-1028-1.jpg"
  alt: string; // "어쩌다 영화관 단체 사진"
};

export const programs: Program[] = [
  {
    title: "어쩌다 영화관",
    type: "whatso",
    date: "2026-10-28",
    time: "18:30-21:00",
    place: "충주시 문화창업재생허브 2층",
    summary: "'나만의 영화' 랜덤뽑기, 영화감상, 나눔모임",
    poster: "/posters/movie-1028.jpg",
    formUrl: "https://www.araform.kr/form/service/ODXTTZ",
  },
];

export const gallery: GalleryPhoto[] = [
  // { src: "/gallery/movie-1028-1.jpg", alt: "어쩌다 영화관 단체 사진" },
];

export const brand = {
  name: "어쩔저쩔",
  slogan: "세상의 기준을 깨고 나만의 기준을 세우자",
  region: "충주",

  about: {
    eyebrow: "SO WHAAAT? : 어쩔저쩔",
    headline: ["아직도 고민만 해?", "눈치 보지 말고, 어쩔저쩔로 살자!"],
    lead: [
      "남들의 시선 대신 나만의 속도로.",
      "청년들의 긍정 시너지 플랫폼, 어쩔저쩔.",
      "이제는 내가 선택하고, 내가 움직이자!",
    ],
    recruit:
      "일상이 무료한 사람, 새로운 뭔가가 필요한 사람, 함께하고 싶은 사람 모여라!",
    // 키워드 카드 (3~4개 권장)
    keywords: [
      {
        tag: "SOCIALING",
        title: "참여형 소셜링",
        body: "취미·여가·문화·일상·헬스·여행 등 다양한 테마로 소규모 모임을 열어요.",
      },
      {
        tag: "MINDSET",
        title: "긍정 마인드셋",
        body: "내가 보고 있는 눈치, 걱정, 근심을 함께 나누고 마음을 다시 세우는 시간.",
      },
      {
        tag: "BUCKET LIST",
        title: "버킷리스트",
        body: "죽기 전에 꼭 하고 싶은 일부터 일상 속 공감형 소셜링까지, 어쩔저쩔로 시작해요.",
      },
      {
        tag: "CLUB",
        title: "정기 클럽",
        body: "정기 클럽원을 모집해 소셜링의 규모와 범위를 넓혀 갈 예정이에요.",
      },
    ],
  },

  sections: {
    sowhat: {
      title: "SOWHAT?_활동",
      description: "남의 기준엔 '그래서 뭐?' 나만의 기준을 세우는 활동",
    },
    whatso: {
      title: "WHATSO!_모임",
      description: "같이 보고, 먹고, 이야기하는 소규모 모임",
    },
  },

  contact: {
    // 인스타그램 계정 주소. 비워 두면 '준비 중'으로 표시됩니다.
    instagram: "",
    instagramHandle: "",
    collaboration:
      "공간·브랜드·기관과의 협업, 함께 만들고 싶은 활동 제안을 기다려요. 인스타그램 DM으로 편하게 연락 주세요.",
  },

  meta: {
    title: "어쩔저쩔 | So Whaaat",
    description:
      "충주 청년들의 긍정 시너지 플랫폼 어쩔저쩔. 눈치 보지 말고, 나만의 기준으로 함께 움직여요.",
    // 사이트 주소. 비워 두면 Vercel이 배포한 주소를 자동으로 씁니다.
    // 개인 도메인을 연결하면 여기에 적습니다.  예) "https://eojjeol.kr"
    url: "",
    // 링크 공유 썸네일(카톡·인스타·문자). 1200×630 이미지를 public/brand/에 올리고 파일 이름을 적습니다.
    ogImage: "/brand/og.png",
  },
};
