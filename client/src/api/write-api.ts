import { useQuery } from '@tanstack/react-query';
import { defaultInstance } from '.';
import { ITemplateDetailParams } from '@/types/dto';

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

const GetTemplateDetailApi = async (params: ITemplateDetailParams) => {
  const { data } = await defaultInstance.get(`/template/detail`, { params });

  return data;
};

export const useGetTemplateDetailQuery = (params: ITemplateDetailParams) => {
  const { isLoading, error, data } = useQuery(
    [`templateDetail`],
    () => GetTemplateDetailApi(params),

    {
      enabled: !!params.templateId,
    },
  );
  return { data, isLoading, error };
};

export const DeleteTemplateApi = async (params: ITemplateDetailParams) => {
  const { data } = await defaultInstance.delete('/template', {
    params,
  });

  return data;
};
