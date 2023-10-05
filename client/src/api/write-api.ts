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
