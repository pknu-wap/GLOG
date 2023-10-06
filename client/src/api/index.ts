import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosApi = (url: string, data?: any) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    ...data,
  });

  // instance.defaults.headers.common[
  //   'Authorization'
  // ] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;

  return instance;
};

export const defaultInstance = axiosApi(
  'http://glogglogglog-env.eba-fuksumx7.ap-northeast-2.elasticbeanstalk.com',
);
