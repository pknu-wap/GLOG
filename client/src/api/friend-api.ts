import { IDeleteFriend, IFriendAllow, IFriendsParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

//친구 정보 불러오기
export const GetFriendApi = async (params: IFriendsParams) => {
  const { data } = await defaultInstance.get('/post', { params });

  return data;
};

export const useGetFriendQuery = (params: IFriendsParams) => {
  const { isLoading, error, data } = useQuery(['friend', params], () => GetFriendApi(params));
  return { data, isLoading, error };
};

export const PutFriendAllowApi = async (body: IFriendAllow) => {
  const { data } = await defaultInstance.put('/friend/allow', body);

  return data;
};

export const DeleteFriendApi = async (params: IDeleteFriend) => {
  const { data } = await defaultInstance.delete('/friend', {
    params,
  });

  return data;
};
