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
  postPreviewDtos: ICollectPost[];
  totalPages: number;
}

// 모아보기 페이지 검색
export interface ISearchUser {
  nickname: string;
}

export interface ISearchTitle {
  title: string;
}

export interface ISearchHashtag {
  hashtag: string;
}

export interface ISearchContent {
  content: string;
}

// 유저 프로필 사진 불러오기
export interface IProfile {
  loginedMemberId: number;
}

//유저 디테일
export interface IUserDetail {
  blogId: number;
  userID: number;
  nickName: string;
  blogName: string;
  email: string;
  introduction: string | null;
  thumbnail: string;
  blogUrl: string;
}

// 댓글 get 정보들
export interface IReplyParams {
  postId: number;
  page: number;
  order: string;
}

export interface IReplyDtos {
  replyId: number;
  userDto: {
    userId: number;
    nickname: string;
    profileImage: string;
  };
  message: string;
  likesCount: number;
  isEdit: boolean;
  createdAt: string;
  isLiked: boolean;
  who: string;
}
export interface IReplyContent {
  replyDtos: IReplyDtos[];
  imOwner: boolean;
}

//댓글 post
export interface IReply {
  postId: number;
  message: string;
}

//댓글 수정
export interface IPutReply {
  repyId: number;
  message: string;
}

//댓글 좋아요 patch
export interface IPatchReplyLike {
  replyId: number;
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
  blogId?: number;
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

//리드미 get
export interface IReadMeParams {
  blogId?: number;
}

//리드미 put
export interface IReadMe {
  content?: string;
}

export interface IBlogIdParams {
  blogUrl?: string;
}

export interface IBlogId {
  blogId?: number;
}

// 템플릿 불러오기
export interface ITemplate {
  postTitleResponse: {
    title: string;
    id: number;
  }[];
}

// 템플릿 디테일 params
export interface ITemplateDetailParams {
  templateId: number;
}

// 임시저장 디테일 params
export interface ITemporaryDetailParams {
  temporaryId: number;
}

// 템플릿 디테일 불러오기
export interface ITemplateDetail {
  title: string;
  content: string;
  thumbnail: string;
  hashtags: string[];
  id: number;
}

// 템플릿 추가
export interface ITemplateAdd {
  thumbnail: string;
  postBasicDto: {
    title: string;
    content: string;
    thumbnail: string;
    hashtags: string[];
  };
}

// PR 조회
export interface IPRSearchParams {
  categoryId: number;
}
// 친구 정보 get 요청값
export interface IFriendsParams {
  kind: string;
}

export interface userSimpleDtos {
  simpleDtos: {
    userId: number;
    friendId: number;
    recentPostId: number;
    haveNewPost: boolean;
    nickname: string;
    imageUrl: string;
    relationship: string;
  }[];
}

// 친구 정보 get 반환값
export interface IFriendsContent {
  userSimpleDtos: userSimpleDtos;
  count: number;
}

//친구 검색 get 요청값
export interface IFriendSearchParams {
  name: string;
}

//친구요청
export interface IFriendRequest {
  userId: number;
}

//친구요청 수락/거절
export interface IFriendAllow {
  isAccept: number;
  userId: number;
}

//친구 삭제
export interface IDeleteFriend {
  userId: number;
}

//읽음 유무
export interface IFriendReadParams {
  userId: number;
}

//유저 introduction
export interface IIntroduceParams {
  userId: number;
}

export interface IIntroduce {
  id: number;
  introduction: string;
  imageUrl: string;
  nickname: string;
  blogName: string;
  blogUrl: string;
  relationship: string;
  friendCount: number;
}

// 레포지토리 가져오기
export interface RepositoryParams {
  category?: number;
  repo?: string;
}

// PR
export interface IPRParams {
  categoryId: number;
}

// 방명록 get 요청값
export interface IGuestbookParams {
  blogId: number;
}

export interface IGuestbookUserDto {
  userId: number;
  nickname: string;
  profileImage: string;
}

export interface IGuestbook {
  messageDto: {
    userDto: IGuestbookUserDto;
    messageId: number;
    message: string;
    createdAt: string;
    who: string;
  }[];
  imOwner: boolean;
  guestbookId: number;
}

//방명록 작성
export interface IPostGuestbook {
  guestbookId?: number;
  messageId?: number;
  message: string;
}

//방명록 수정
export interface IPutGuestbook {
  guestbookId: number;
  messageId: number;
  message: string;
}

// 방명록 삭제
export interface IDeleteGuestbook {
  messageId: number;
}

//카테고리 가져오기
export interface ICategoryParams {
  categoryId: number;
}

//카테고리 가져온 정보
export interface ICategory {
  categoryName: string;
  prCategory: boolean;
}

//카테고리 생성
export interface IPostCategory {
  categoryName: string;
  isPrCategory: boolean;
  repositoryUrl: string | null;
}

//카테고리 이름 수정
export interface IPutCategory {
  categoryId: number;
  newCategoryName: string;
}

//카테고리 삭제
export interface IDeleteCategory {
  categoryId: number;
}

// history
export interface IHistory {
  week?: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  };
  year?: {
    from: string;
    posted: number[];
  };
}

// 유저 정보 변경하기
export interface IUserInfo {
  name: string;
  introduction: string;
}

// 유저 정보 변경하기
export interface IBlogInfo {
  newBlogName: string;
}

// categoryId -> 블로그 URL
export interface IBlogUrlParams {
  categoryId?: number;
}

// categoryId -> 블로그 URL 응답값
export interface IBlogUrl {
  blogUrl: string;
}