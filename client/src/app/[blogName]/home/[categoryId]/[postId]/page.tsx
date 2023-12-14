import PostData from '@/components/Post/PostData';
import { SERVER_URL } from '@/constant/common';
import { Metadata } from 'next';
import React from 'react';

const getData = async (id: number) => {
  const res = await fetch(`${SERVER_URL}/post?postId=${id}`);
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
    openGraph: {
      title: data.title,
      description: data.content,
    },
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
