// app/posts/posts.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts } from './getPosts';

export default function Posts() {
  const { data } = useQuery(['posts'], getPosts);

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
