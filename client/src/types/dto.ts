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

// 블로그 생성
export interface IBlog {
  blogUrl: string;
  blogName: string;
  nickname: string;
}

// 블로그 이름 변경
export interface IChangeBlogName {
  newBlogName: string;
}

// 사이드바
export interface ISidebar {
  blogId: number;
}

// 스크랩 얻어오기
export interface IScrap {
  page: number;
}

// 스크랩 내용
export interface IScrapContent {
  blogUrl?: string;
  createdAt?: string;
  isPrivate?: boolean;
  likesCount?: number;
  postId?: number;
  repliesCount?: number;
  thumbnail?: string;
  title?: string;
  viewsCount?: number;
}
