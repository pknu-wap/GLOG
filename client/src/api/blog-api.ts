import { IBlog, IBlogUrlParams, IChangeBlogName, IPost, ISidebar } from '@/types/dto';
import { defaultInstance, unAxiosDefaultInstance } from '.';
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

export const getAlarmsApi = async () => {
  const { data } = await defaultInstance.get('/alarms');

  return data;
};

export const useGetAlarmsQuery = () => {
  const { isLoading, error, data } = useQuery([`alarms`], () => getAlarmsApi());
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
  const { isLoading, error, data } = useQuery([`sidebar`, params], () => GetSidebarApi(params), {
    enabled: !!params.blogId,
  });
  return { data, isLoading, error };
};

export const getIsNewBlogApi = async (token?: string | null) => {
  const { data } = await unAxiosDefaultInstance.get('/is/new/blog', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetIsNewBlogQuery = (token?: string | null) => {
  const { isLoading, error, data } = useQuery([`isNewBlog`], () => getIsNewBlogApi(token), {});
  return { data, isLoading, error };
};

// 카테고리 아이디로 블로그url 불러오기
export const getBlogUrl = async (params: IBlogUrlParams) => {
  const { data } = await defaultInstance.get('blog/url', { params });
  return data;
};

export const useGetBlogUrlQuery = (params: IBlogUrlParams) => {
  const { isLoading, error, data } = useQuery([`blogUrl`, params], () => getBlogUrl(params), {});
  return { data, isLoading, error };
};
