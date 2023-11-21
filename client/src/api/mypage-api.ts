import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

const GetMypageApi = async () => {
  const { data } = await defaultInstance.get(`/mypage`);

  return data;
};

export const useGetMypageQuery = () => {
  const { isLoading, error, data } = useQuery([`mypage`], () => GetMypageApi());
  return { data, isLoading, error };
};
