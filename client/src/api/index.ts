import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosApi = (url: string, data?: any) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    ...data,
  });
  return instance;
};

export const defaultInstance = axiosApi(
  'http://test-env.eba-babq7paf.us-east-1.elasticbeanstalk.com',
);
