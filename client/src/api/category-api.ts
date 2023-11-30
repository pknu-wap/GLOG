import {
  ICategoryParams,
  IDeleteCategory,
  IPostCategory,
  IPutCategory,
  ISearchCategoryParams,
} from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

//카테고리 이름/pr연동여부 가져오기
export const GetCategoryApi = async (params: ICategoryParams) => {
  const { data } = await defaultInstance.get('/category', { params });

  return data;
};

export const useGetCategoryQuery = (params: ICategoryParams) => {
  const { isLoading, error, data } = useQuery(['category', params], () => GetCategoryApi(params));

  return { isLoading, error, data };
};

//카테고리 생성
export const PostCategoryApi = async (body: IPostCategory) => {
  const { data } = await defaultInstance.post('/category', body);
  return data;
};

//카테고리 이름 수정
export const PutCategoryApi = async (body: IPutCategory) => {
  const { data } = await defaultInstance.put('/category', body);
  return data;
};

//카테고리 삭제
export const DeleteCategoryApi = async (params: IDeleteCategory) => {
  const { data } = await defaultInstance.delete('/category', {
    params,
  });
  return data;
};

//카테고리별 미리보기
export const GetSearchCategoryApi = async (params: ISearchCategoryParams) => {
  const { data } = await defaultInstance.get('/search/category', { params });

  return data;
};

export const useGetSearchCategoryQuery = (params: ISearchCategoryParams) => {
  const { isLoading, error, data } = useQuery(['searchCategory', params], () =>
    GetSearchCategoryApi(params),
  );

  return { isLoading, error, data };
};
