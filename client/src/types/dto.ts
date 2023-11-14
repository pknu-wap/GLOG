// 모아보기 페이지
export interface ICollect {
  page: number;
  kind: string;
}

// 모아보기 페이지 게시글
export interface ICollectPost {
  blogUrl?: string;
  createdAt?: string;
  isPrivate?: boolean;
  likesCount?: number;
  postId?: number;
  repliesCount?: number;
  thumbnail?: string | null;
  title?: string;
  viewsCount?: number;
}

// 모아보기 페이지 목록
export interface ICollectContent {
  postPreviewDtos?: ICollectPost[];
  totalPages: number;
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

//회원가입(블로그 이름, url, 닉네임 생성)
export interface IMakeAccount {
  blogUrl: string | undefined;
  blogName: string | undefined;
  nickname: string | undefined;
}

// 블로그 이름 변경
export interface IChangeBlogName {
  newBlogName: string;
}

// 게시글 조회
export interface IPost {
  postId: number;
}

// 사이드바
export interface ISidebar {
  blogId: number;
}

// 사이드바 전체 내용
export interface ISidebarContent {
  categoryId: number;
  categoryName: string;
  postTitleDtos: {
    postId: number;
    title: string;
  }[];
}

// 사이드바 카테고리 내용
export interface ISidebarCategoryContent {
  categoryId: number;
  categoryName: string;
}

// 사이드바 파일 내용
export interface ISidebarFileContent {
  postId: number;
  title: string;
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

// 게시글 내용
export interface IPostContent {
  author?: {
    nickname?: string;
    profileImage?: string;
    userId?: number;
  };
  blogUrl?: string;
  content?: string;
  createdAt?: string;
  hashtags?: string[];
  isAuthor?: boolean;
  isLiked?: boolean;
  isPrivate?: boolean;
  isScraped?: boolean;
  likesCount?: number;
  postId?: number;
  repliesCount?: number;
  thumbnail?: string;
  title?: string;
  viewsCount?: number;
}
