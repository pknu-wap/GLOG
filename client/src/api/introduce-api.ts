import { IIntroduceParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

//유저 introducion 가져오기
export const GetIntroducedApi = async (params: IIntroduceParams) => {
  const { data } = await defaultInstance.get('/introduce', { params });

  return data;
};

export const useGetIntroduceQuery = (params: IIntroduceParams) => {
  const { isLoading, error, data } = useQuery(['friend', params], () => GetIntroducedApi(params));
  return { data, isLoading, error };
};
