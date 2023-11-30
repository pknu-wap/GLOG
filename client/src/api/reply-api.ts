import { IDeleteReply, IPatchReplyLike, IPutReply, IReply, IReplyParams } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

export const getReplyApi = async (params: IReplyParams) => {
  const { data } = await defaultInstance.get(`/replies`, { params });

  return data;
};

export const useGetReplyQuery = (params: IReplyParams) => {
  const { isLoading, error, data } = useQuery([`replies`, params], () => getReplyApi(params));
  return { data, isLoading, error };
};

export const PostReplyApi = async (body: IReply) => {
  const { data } = await defaultInstance.post('/replies', body);

  return data;
};

export const PatchReplyLikeApi = async (params: IPatchReplyLike) => {
  const { data } = await defaultInstance.patch(`/replies/like/${params.replyId}`, params);
  return data;
};

export const putReplyApi = async (body: IPutReply) => {
  const { data } = await defaultInstance.put('/replies', body);
  return data;
};

export const DeleteReplyApi = async (params: IDeleteReply) => {
  const { data } = await defaultInstance.delete('/replies', {
    params,
  });

  return data;
};