import { useQuery } from '@tanstack/react-query';
import { defaultInstance } from '.';
import { ITemplateDetailParams, ITemporaryDetailParams } from '@/types/dto';

export const PostWriteApi = async (body: FormData) => {
  const { data } = await defaultInstance.post('/post', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const UpdateWriteApi = async (body: FormData) => {
  const { data } = await defaultInstance.put('/post', {
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

export const PostTemplateApi = async (postData: FormData) => {
  const { data } = await defaultInstance.post('/template', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

const GetTemporaryApi = async () => {
  const { data } = await defaultInstance.get(`/temporaries`);

  return data;
};

export const useGetTemporaryQuery = () => {
  const { isLoading, error, data } = useQuery([`temporaries`], () => GetTemporaryApi());
  return { data, isLoading, error };
};

export const PostTemporaryApi = async (postData: FormData) => {
  const { data } = await defaultInstance.post('/temporary', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

const GetTemporaryDetailApi = async (params: ITemporaryDetailParams) => {
  const { data } = await defaultInstance.get(`/temporary/detail`, { params });

  return data;
};

export const useGetTemporaryDetailQuery = (params: ITemporaryDetailParams) => {
  const { isLoading, error, data } = useQuery(
    [`temporaryDetail`],
    () => GetTemporaryDetailApi(params),

    {
      enabled: !!params.temporaryId,
    },
  );
  return { data, isLoading, error };
};

export const DeleteTemporaryApi = async (params: ITemporaryDetailParams) => {
  const { data } = await defaultInstance.delete('/temporary', {
    params,
  });

  return data;
};
