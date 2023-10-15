'use client';

import { PostChangeBlogNameApi } from '@/api/blog-api';
import { useMutation } from '@tanstack/react-query';

const Home = () => {
  const postChangeBlogNameQuery = useMutation(PostChangeBlogNameApi);

  const changeBlogName = () => {
    postChangeBlogNameQuery.mutate({ newBlogName: 'hello' });
  };

  return (
    <div style={{ marginTop: '240px' }}>
      없는 페이지지롱
      <button onClick={changeBlogName}>블로그 이름 변경</button>
    </div>
  );
};

export default Home;
