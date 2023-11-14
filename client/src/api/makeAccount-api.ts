import { IMakeAccount } from '@/types/dto';
import { defaultInstance } from '.';

export const PostMakeAccountApi = async (body: IMakeAccount) => {
  const { data } = await defaultInstance.post('/post/blog', {
    body,
  });

  return data;
};
