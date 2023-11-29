import { useQuery } from '@tanstack/react-query';
import { defaultInstance } from '.';
import { IDeleteGuestbook, IGuestbookParams, IPostGuestbook, IPutGuestbook } from '@/types/dto';

//방명록 메시지 불러오기
export const GetGuestbookApi = async (params: IGuestbookParams) => {
  const { data } = await defaultInstance.get('/guestbook', { params });

  return data;
};

export const useGetGuestbookQuery = (params: IGuestbookParams) => {
  const { isLoading, error, data } = useQuery(['guestbook', params], () => GetGuestbookApi(params));

  return { isLoading, error, data };
};

//방명록 작성
export const PostGuestbookApi = async (body: IPostGuestbook) => {
  const { data } = await defaultInstance.post('/guestbook', body);
  return data;
};

//방명록 수정
export const PutGuestbookApi = async (body: IPutGuestbook) => {
  const { data } = await defaultInstance.put('/guestbook', body);
  return data;
};

//방명록 삭제
export const DeleteGuestbookApi = async (params: IDeleteGuestbook) => {
  const { data } = await defaultInstance.delete('/guestbook', {
    params,
  });
  return data;
};
