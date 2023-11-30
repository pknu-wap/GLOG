import { IBlogIdParams, IReadMe, IReadMeParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getReadMeApi = async (params: IReadMeParams) => {
  const { data } = await defaultInstance.get('/read-me', { params });

  return data;
};

export const useGetReadMeQuery = (params: IReadMeParams) => {
  const {
    isLoading,
    error,
    data: backendData,
  } = useQuery([`readMe`, params], () => getReadMeApi(params), {
    enabled: !!params.blogId,
  });

  const data: { blogName: string; content: string; isMe: boolean } = backendData;
  return { data, isLoading, error };
};

export const getblogIdApi = async (params: IBlogIdParams) => {
  const { data } = await defaultInstance.get('/blogid', { params });

  return data;
};

export const usegetblogIdQuery = (params: IBlogIdParams) => {
  const { isLoading, error, data } = useQuery([`blogid`, params], () => getblogIdApi(params));
  return { data, isLoading, error };
};

export const PutReadMeApi = async (body: IReadMe) => {
  const { data } = await defaultInstance.put('/read-me', body);

  return data;
};
