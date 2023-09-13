import { dehydrate, Hydrate } from '@tanstack/react-query';
import { getPosts } from './getPosts';
import Posts from './Posts';
import getQueryClient from '@/components/ReactQuery/getQueryClient';

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'], getPosts);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Posts />
    </Hydrate>
  );
}
