import { RepositoryParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getRepositoryApi = async () => {
  const { data } = await defaultInstance.get('/repository');

  return data;
};

export const useGetRepositoryQuery = () => {
  const { isLoading, error, data } = useQuery([`repository`], () => getRepositoryApi());
  return { data, isLoading, error };
};

export const PostRepository = async (body: RepositoryParams) => {
  const { data } = await defaultInstance.put('/repository', {
    body,
  });

  return data;
};
