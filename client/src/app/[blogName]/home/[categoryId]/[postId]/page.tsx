import PostData from '@/components/Post/PostData';
import { Metadata } from 'next';
import React from 'react';

const getData = async (id: number) => {
  const res = await fetch(
    `http://glogglogglog-env.eba-fuksumx7.ap-northeast-2.elasticbeanstalk.com/post?postId=${id}`,
  );
  return res.json();
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const data = await getData(Number(params.id));
  return {
    title: data.title,
    description: data.content,
  };
};

function page({ params }: { params: { blogName: string; categoryId: string; postId: string } }) {
  return (
    <PostData
      params={{ blogName: params.blogName, categoryId: params.categoryId, postId: params.postId }}
    />
  );
}

export default page;
