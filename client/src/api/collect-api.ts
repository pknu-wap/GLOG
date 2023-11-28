import { ICollect, ISearchContent, ISearchHashtag, ISearchTitle, ISearchUser } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

const GetCollectDataApi = async (params: ICollect) => {
  const { data } = await defaultInstance.get(`/post/previews/${params.kind}?page=${params.page}`);

  return data;
};

export const useGetCollectDataQuery = (params: ICollect) => {
  const { isLoading, error, data } = useQuery([`collectData`, params], () =>
    GetCollectDataApi(params),
  );
  return { data, isLoading, error };
};

const GetColletSearchUserApi = async (params: ISearchUser) => {
  const { data } = await defaultInstance.get(`/search/user`, { params });

  return data;
};

export const useGetCollectSearchUserQuery = (params: ISearchUser) => {
  const { isLoading, error, data } = useQuery([`searchUser`, params], () =>
    GetColletSearchUserApi(params),
  );
  return { data, isLoading, error };
};

const GetColletSearchTitleApi = async (params: ISearchTitle) => {
  const { data } = await defaultInstance.get(`/search/title`, { params });

  return data;
};

export const useGetCollectSearchTitleQuery = (params: ISearchTitle) => {
  const { isLoading, error, data } = useQuery([`searchTitle`, params], () =>
    GetColletSearchTitleApi(params),
  );
  return { data, isLoading, error };
};

const GetColletSearchHashtagApi = async (params: ISearchHashtag) => {
  const { data } = await defaultInstance.get(`/search/hashtag`, { params });

  return data;
};

export const useGetCollectSearchHashtagQuery = (params: ISearchHashtag) => {
  const { isLoading, error, data } = useQuery([`searchHashtag`, params], () =>
    GetColletSearchHashtagApi(params),
  );
  return { data, isLoading, error };
};

const GetColletSearchContentApi = async (params: ISearchContent) => {
  const { data } = await defaultInstance.get(`/search/content`, { params });

  return data;
};

export const useGetCollectSearchContentQuery = (params: ISearchContent) => {
  const { isLoading, error, data } = useQuery([`searchContent`, params], () =>
    GetColletSearchContentApi(params),
  );
  return { data, isLoading, error };
};
