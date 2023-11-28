import { ThemeType } from '@/types/common';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 유저 테마 변경
export const userThemeState = atom<ThemeType>({
  key: 'userTheme',
  default: 'light',
  effects_UNSTABLE: [persistAtom],
});

// 사이드바 오픈 상태 변경
export const isSidebarOpenState = atom<boolean>({
  key: 'sidebarOpen',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

// 유저 토큰
export const tokenState = atom<string>({
  key: 'token',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

// 템플릿 아이디
export const templateIdState = atom<number>({
  key: 'templateId',
  default: 0,
});

// 임시저장 아이디
export const temporaryIdState = atom<number>({
  key: 'temporaryId',
  default: 0,
});

// 모아보기 검색인가
export const isSearchState = atom<boolean>({
  key: 'isSearch',
  default: false,
});
