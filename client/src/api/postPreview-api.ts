import { useQuery } from '@tanstack/react-query';
import { defaultInstance } from '.';
import { IPostPreviewParams } from '@/types/dto';

export const GetPostPreviewApi = async (params: IPostPreviewParams) => {
  const { data } = await defaultInstance.get(`/post/previews/${params.kind}`);

  return data;
};

export const useGetPostPreviewQuery = (params: IPostPreviewParams) => {
  const { isLoading, error, data } = useQuery(['postPreview', params], () =>
    GetPostPreviewApi(params),
  );
  return { data, isLoading, error };
};
