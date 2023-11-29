import {
  IDeleteFriend,
  IFriendAllow,
  IFriendReadParams,
  IFriendRequest,
  IFriendSearchParams,
  IFriendsParams,
} from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

//친구 정보 불러오기
export const GetFriendApi = async (params: IFriendsParams) => {
  const { data } = await defaultInstance.get(`/friend/${params.kind}`);

  return data;
};

export const useGetFriendQuery = (params: IFriendsParams) => {
  const { isLoading, error, data } = useQuery(['friend', params], () => GetFriendApi(params));
  return { data, isLoading, error };
};

//친구 검색
export const GetFriendSearchApi = async (params: IFriendSearchParams) => {
  const { data } = await defaultInstance.get('/search/friend/name', { params });

  return data;
};

export const useGetFriendSearchQuery = (params: IFriendSearchParams) => {
  const { isLoading, error, data } = useQuery(['search', params], () => GetFriendSearchApi(params));

  return { isLoading, error, data };
};

//친구 요청
export const PutFriendRequestApi = async (body: IFriendRequest) => {
  const { data } = await defaultInstance.put(`/friend?userId=${body.userId}`, body);

  return data;
};

//친구 요청 수락/거절
export const PutFriendAllowApi = async (body: IFriendAllow) => {
  const { data } = await defaultInstance.put(
    `/friend/allow?isAccept=${body.isAccept}&userId=${body.userId}`,
    body,
  );

  return data;
};

//친구 삭제
export const DeleteFriendApi = async (params: IDeleteFriend) => {
  const { data } = await defaultInstance.delete('/friend', {
    params,
  });

  return data;
};

//새 포스트 읽음 유무
export const GetFriendReadApi = async (params: IFriendReadParams) => {
  const { data } = await defaultInstance.get('/friend/read', { params });

  return data;
};

export const useGetFriendReadQuery = (params: IFriendReadParams) => {
  const { isLoading, error, data } = useQuery(['friendRead', params], () =>
    GetFriendReadApi(params),
  );
  return { data, isLoading, error };
};
