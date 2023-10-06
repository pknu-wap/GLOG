import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosApi = (url: string, data?: any) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    ...data,
  });

  instance.defaults.headers.common['Authorization'] =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjk2NDk4Nzk1LCJleHAiOjE2OTczNjI3OTV9.KSuLfUWJofBh7MZQ_ZBgaaNzuD5FTlogKIDwiwaPapyFuyPzNa3nNIXWu99JIKSySvO2O-YP0QksTqDvrNVK4Q';

  return instance;
};

export const defaultInstance = axiosApi(
  'http://glogglogglog-env.eba-fuksumx7.ap-northeast-2.elasticbeanstalk.com',
);
