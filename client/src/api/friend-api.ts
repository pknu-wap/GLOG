import { IFriendsParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

//친구 정보 불러오기
export const GetFriendApi = async (params: IFriendsParams) => {
  const { data } = await defaultInstance.get('/post', { params });

  return data;
};

export const useGetFriendQuery = (params: IFriendsParams) => {
  const { isLoading, error, data } = useQuery(['post', params], () => GetFriendApi(params));
  return { data, isLoading, error };
};
