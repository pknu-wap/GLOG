// 모아보기 페이지
export interface ICollect {
  index: number;
}

// 유저 프로필 사진 불러오기
export interface IProfile {
  loginedMemberId: number;
}

// 글쓰기 페이지
export interface IWrite {
  thumbnail?: string | null;
  postCreateRequest: {
    title?: string;
    content?: string;
    isPrivate?: boolean;
    categoryId?: number;
    hashtags?: string[];
  };
}

// 블로그
export interface IBlog {
  blogUrl: string;
  blogName: string;
  nickname: string;
}
