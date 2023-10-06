import { ThemeType } from '@/types/common';
import { AlertColor } from '@mui/material';
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

// 토스트
export const openSnackBarState = atom<boolean>({
  key: 'OpenSnackBar',
  default: false,
});

export const snackBarAlertTypeState = atom<AlertColor | undefined>({
  key: 'SnackBarAlertType',
  default: undefined,
});

export const snackBarMessageState = atom<string>({
  key: 'SnackBarMessage',
  default: '',
});

export const snackBarDurationState = atom<number>({
  key: 'SnackBarDuration',
  default: 3000,
});
