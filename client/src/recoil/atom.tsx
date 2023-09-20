import { ThemeType } from '@/types/common';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 유저 테마 변경
export const userThemeState = atom<ThemeType>({
  key: 'userTheme',
  default: 'dark',
  effects_UNSTABLE: [persistAtom],
});

// 사이드바 오픈 상태 변경
export const isSidebarOpenState = atom<boolean>({
  key: 'sidebarOpen',
  default: true,
  effects_UNSTABLE: [persistAtom],
});
