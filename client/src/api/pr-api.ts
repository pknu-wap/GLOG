import { IPRParams, IPostedPost, IUnPostedPost } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getPRApi = async (params: IPRParams) => {
  const { data } = await defaultInstance.get('/pr/posts/posted', { params });

  return data;
};

export const useGetPRQuery = (params: IPRParams) => {
  const { isLoading, error, data: backendData } = useQuery([`prList`], () => getPRApi(params));

  const data: IPostedPost = backendData;

  return { data, isLoading, error };
};

export const getPRUnPostedApi = async (params: IPRParams) => {
  const { data } = await defaultInstance.get('/pr/posts/unposted', { params });

  return data;
};

export const useGetPRUnpostedQuery = (params: IPRParams) => {
  const {
    isLoading,
    error,
    data: backendData,
  } = useQuery([`prUnpostedList`], () => getPRUnPostedApi(params));
  const data: IUnPostedPost = backendData;
  return { data, isLoading, error };
};
