import { useQuery } from '@tanstack/react-query';
import { defaultInstance } from '.';

export const PostWriteApi = async (body: FormData) => {
  const { data } = await defaultInstance.post('/post/create', {
    body,
  });

  return data;
};

export const UpdateWriteApi = async (body: FormData) => {
  const { data } = await defaultInstance.put('/post/update', {
    body,
  });

  return data;
};

const GetTemplateApi = async () => {
  const { data } = await defaultInstance.get(`/template`);

  return data;
};

export const useGetTemplateQuery = () => {
  const { isLoading, error, data } = useQuery([`template`], () => GetTemplateApi());
  return { data, isLoading, error };
};

const GetTemplateDetailApi = async () => {
  const { data } = await defaultInstance.get(`/template/detail`);

  return data;
};

export const useGetTemplateDetailQuery = () => {
  const { isLoading, error, data } = useQuery([`templateDetail`], () => GetTemplateDetailApi());
  return { data, isLoading, error };
};
