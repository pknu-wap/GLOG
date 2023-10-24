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

// 아이폰
export const iPhoneState = atom<boolean>({
  key: 'iphone',
  default: false,
});

// 안드로이드
export const androidState = atom<boolean>({
  key: 'android',
  default: false,
});
