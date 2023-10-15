import { IBlog, IChangeBlogName, ISidebar } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

// 초기 블로그 생성
export const PostBlogApi = async (body: IBlog) => {
  const { data } = await defaultInstance.post('/blog', body);

  return data;
};

// 블로그 이름 변경
export const PostChangeBlogNameApi = async (body: IChangeBlogName) => {
  const { data } = await defaultInstance.post('/change/blog/name', body);

  return data;
};

// 사이드바 얻어오기
const GetSidebarApi = async (params: ISidebar) => {
  const { data } = await defaultInstance.get('/category/sidebar', {
    params,
  });

  return data;
};

export const useGetSidebarQuery = (params: ISidebar) => {
  const { isLoading, error, data } = useQuery([`sidebar`, params], () => GetSidebarApi(params));
  return { data, isLoading, error };
};
