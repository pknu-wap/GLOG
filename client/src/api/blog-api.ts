import { IBlog, IChangeBlogName, IPost, ISidebar } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

// 초기 블로그 생성
export const PostBlogApi = async (body: IBlog) => {
  const { data } = await defaultInstance.post('/blog', body);

  return data;
};

// 게시글 조회
export const getPostApi = async (params: IPost) => {
  const { data } = await defaultInstance.get('/post', { params });

  return data;
};

export const useGetPostQuery = (params: IPost) => {
  const { isLoading, error, data } = useQuery([`post`, params], () => getPostApi(params));
  return { data, isLoading, error };
};

// 블로그 이름 변경
export const PostChangeBlogNameApi = async (body: IChangeBlogName) => {
  const { data } = await defaultInstance.post('/change/blog/name', body);

  return data;
};

// 사이드바 얻어오기
const GetSidebarApi = async (params: ISidebar) => {
  const { data } = await defaultInstance.get(`/category/sidebar/${params.blogId}`, {
    params,
  });

  return data;
};

export const useGetSidebarQuery = (params: ISidebar) => {
  const { isLoading, error, data } = useQuery([`sidebar`, params], () => GetSidebarApi(params));
  return { data, isLoading, error };
};
