import { IScrap } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

// 스크랩 얻어오기
const GetScrapApi = async (params: IScrap) => {
  const { data } = await defaultInstance.get('/scrap', {
    params,
  });

  return data;
};

export const useGetScrapQuery = (params: IScrap) => {
  const { isLoading, error, data } = useQuery([`scrap`, params], () => GetScrapApi(params));
  return { data, isLoading, error };
};
