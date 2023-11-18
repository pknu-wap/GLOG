import { IReply } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getPostApi = async (params: IReply) => {
  const { data } = await defaultInstance.get('/replies', { params });

  return data;
};

export const useGetReplyQuery = (params: IReply) => {
  const { isLoading, error, data } = useQuery([`post`, params], () => getPostApi(params));
  return { data, isLoading, error };
};
