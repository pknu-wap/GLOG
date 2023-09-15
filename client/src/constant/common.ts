import { ThemeType } from '@/types/common';

export const oppositeThemeExtraction = (theme: ThemeType) => {
  return theme === 'dark' ? 'light' : 'dark';
};

export const getCurrentThemeClass = (
  userTheme: ThemeType,
  light: string | number,
  dark: string | number,
) => {
  return userTheme === 'light' ? light : dark;
};

export const API_BASE_URL = 'http://localhost:8080';

//서버에서 인증을 완료한 후에 프론트엔드로 돌아올 redirect uri (app.oauth2.authorized-redirect-uri와 일치해야 한다)
export const OAUTH2_REDIRECT_URI =
  'http://chaeyeonblog.s3-website-us-east-1.amazonaws.com/oauth2/redirect';

export const GOOGLE_AUTH_URL =
  API_BASE_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL + '/oauth2/authorization/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL =
  API_BASE_URL + '/oauth2/authorization/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL =
  API_BASE_URL + '/oauth2/authorization/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  API_BASE_URL + '/oauth2/authorization/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
