import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getPRApi = async () => {
  const { data } = await defaultInstance.get('/pr/posts/posted');

  return data;
};

export const useGetPRQuery = () => {
  const { isLoading, error, data } = useQuery([`prList`], () => getPRApi());
  return { data, isLoading, error };
};
