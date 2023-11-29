import { Repository, RepositoryParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getRepositoryApi = async () => {
  const { data } = await defaultInstance.get('/repository');

  return data;
};

export const useGetRepositoryQuery = () => {
  const {
    isLoading,
    error,
    data: backendData,
  } = useQuery([`repository`], () => getRepositoryApi());
  const data: Repository = backendData;
  return { data, isLoading, error };
};

export const PostRepository = async (body: RepositoryParams) => {
  const { data } = await defaultInstance.post(
    `/repository?categoryId=${body.categoryId}&repo=${body.repo}`,
  );

  return data;
};
