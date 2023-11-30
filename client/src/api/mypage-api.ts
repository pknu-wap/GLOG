import { IBlogInfo, IUserInfo } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

const getMypageApi = async () => {
  const { data } = await defaultInstance.get(`/user/detail`);

  return data;
};

export const useGetMypageQuery = () => {
  const { isLoading, error, data } = useQuery([`mypage`], () => getMypageApi());
  return { data, isLoading, error };
};

const getHistoryApi = async () => {
  const { data } = await defaultInstance.get(`/history`);

  return data;
};

export const useGetHistoryQuery = () => {
  const { isLoading, error, data } = useQuery([`history`], () => getHistoryApi());
  return { data, isLoading, error };
};

export const postChangeUserInfoApi = async (body: IUserInfo) => {
  const { data } = await defaultInstance.post('/change/user/info', body);

  return data;
};

export const postChangeUserImageApi = async (body: FormData) => {
  const { data } = await defaultInstance.post('/change/user/image', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const postChangeBlogNameApi = async (body: IBlogInfo) => {
  const { data } = await defaultInstance.post(`/change/blog/name`, body);

  return data;
};

export const getVisitApi = async () => {
  const { data } = await defaultInstance.get(`/visit`);

  return data;
};

export const useGetVisitQuery = () => {
  const { isLoading, error, data } = useQuery([`visit`], () => getVisitApi());
  return { data, isLoading, error };
};

export const postVisitApi = async (body: { blogId: number }) => {
  const { data } = await defaultInstance.post(`/visit?blogId=${body.blogId}`);

  return data;
};
