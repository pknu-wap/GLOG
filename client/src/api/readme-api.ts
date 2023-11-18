import { IReadMeParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getReadMeApi = async (params: IReadMeParams) => {
  const { data } = await defaultInstance.get('/read-me', { params });

  return data;
};

export const useGetReadMeQuery = (params: IReadMeParams) => {
  const { isLoading, error, data } = useQuery([`read-me`, params], () => getReadMeApi(params));
  return { data, isLoading, error };
};
