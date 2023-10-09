'use client';
import DragAndDrop from '@/components/DND/DragAndDrop';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Stack } from '@mui/material';
import React from 'react';
import { PostRoute, PostTitle, ThumbnailArea, ViewPostArea } from './postId.style';

const page = ({ params }: { params: { titleId: string; postId: string } }) => {
  const writeList = [
    {
      postId: 0,
      postTitle: '제목입니다',
    },
    {
      postId: 1,
      postTitle: '제목입니다',
    },
    {
      postId: 2,
      postTitle: '제목입니다',
    },
  ];

  const backendInfo = [
    {
      PostDetailResponse: {
        author: {
          userId: 1,
          nickname: 'string',
          profileImage: 'string',
        },
        blogUrl: 'string',
        postId: 1,
        title: '제목입니다.',
        content: 'string',
        thumbnail: 'string',
        createdAt: 0,
        likesCount: 0,
        viewsCount: 0,
        repliesCount: 0,
        isPrivate: true,
        isScraped: false,
        isLiked: false,
        isAuthor: false,
        hastags: [],
      },
    },
  ];
  const result = backendInfo[0];

  return (
    <ViewPostArea>
      <ThumbnailArea>
        <Stack position={'absolute'}>
          <PostRoute>JunseoLog - 프론트앤드</PostRoute>
          <PostTitle>{result.PostDetailResponse.title}</PostTitle>
        </Stack>
      </ThumbnailArea>
      <Sidebar />
      <DragAndDrop
        footprintList={writeList}
        categoryNumber={params.postId}
        rightContainer={
          <Stack width={'100%'} height={'100%'} bgcolor="white">
            <Stack>{params.postId}</Stack>
          </Stack>
        }
      />

      {/* <Stack bgcolor="yellow" width="200px">
        ads
      </Stack> */}
    </ViewPostArea>
  );
};

export default page;
