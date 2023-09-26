import { IProfile } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const GetMypageApi = async (params: IProfile) => {
  const { data } = await defaultInstance.get('/mypage', { params });
  return data;
};

export const useGetMypageQuery = (params: IProfile) => {
  const { isLoading, error, data, status } = useQuery(
    [`Mypage`, params],
    () => GetMypageApi(params),
    {
      enabled: !!params.loginedMemberId,
    },
  );
  return { data, isLoading, error, status };
};
