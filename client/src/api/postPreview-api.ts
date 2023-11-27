import { useQuery } from '@tanstack/react-query';
import { defaultInstance } from '.';
import { ICategoryParams, IPostPreviewParams } from '@/types/dto';

export const GetPostPreviewApi = async (params: IPostPreviewParams) => {
  const { data } = await defaultInstance.get(`/post/previews/${params.kind}?/page=${params.page}`);

  return data;
};

export const useGetPostPreviewQuery = (params: IPostPreviewParams) => {
  const { isLoading, error, data } = useQuery(['postPreview', params], () =>
    GetPostPreviewApi(params),
  );
  return { data, isLoading, error };
};

export const GetCategoryApi = async (params: ICategoryParams) => {
  const { data } = await defaultInstance.get('/category', {params});

  return data;
}

export const useGetCategoryQuery = (params: ICategoryParams) => {
  const { isLoading, error, data } = useQuery(['category', params], () =>
  GetCategoryApi(params),
  );
  return { data, isLoading, error };
};