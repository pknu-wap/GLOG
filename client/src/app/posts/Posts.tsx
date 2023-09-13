// app/posts/posts.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts } from './getPosts';

export default function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the "HydratedPosts"-component, data will be available immediately either way
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: otherData } = useQuery({
    queryKey: ['posts-not-ssr'],
    queryFn: getPosts,
  });

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h2>React Query SSR 적용</h2>
        <ul>{data?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
      </div>
      <div>
        <h2>React Query SSR 적용 안함</h2>
        <ul>{otherData?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
      </div>
    </div>
  );
}
