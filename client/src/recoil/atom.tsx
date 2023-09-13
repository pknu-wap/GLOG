import { ThemeType } from '@/types/common';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userThemeState = atom<ThemeType>({
  key: 'userTheme',
  default: 'dark',
  effects_UNSTABLE: [persistAtom],
});
