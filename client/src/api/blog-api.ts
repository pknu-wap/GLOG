import { IBlog } from '@/types/dto';
import { defaultInstance } from '.';

export const PostBlogApi = async (body: IBlog) => {
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const { data } = await defaultInstance.post('/blog', body, {
    headers,
  });

  return data;
};
