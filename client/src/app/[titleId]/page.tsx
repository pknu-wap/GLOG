'use client';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';
import PostComponent from '../../components/Post/Post';
import { useState } from 'react';
import { PostAreaComponent, PostPagination, ScrapList } from './tagegory.style';
import CenterContent from '@/components/Layout/CenterContent';
import LockIcon from '@mui/icons-material/Lock';

function page({ params }: { params: { titleId: string } }) {
  console.log(params.titleId);

  const [page, setPage] = useState(0);

  const backend = [
    {
      isAuthor: false,
      categoryName: 'string',

      PostPreviewResponse: {
        count: 0,
        PostPreviewDtos: [
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 0,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 1,
              isScrapped: true,
            },
          },
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 0,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 1,
              isScrapped: true,
            },
          },
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 0,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 1,
              isScrapped: true,
            },
          },
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 0,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 1,
              isScrapped: true,
            },
          },
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 0,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 1,
              isScrapped: true,
            },
          },
        ],
      },
    },
    {
      PostPreviewResponse: {
        count: 0,
        PostPreviewDtos: [
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 0,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 1,
              isScrapped: true,
            },
          },
        ],
      },
    },
  ];

  const result = backend[page];

  const totalPages = backend.length;

  return (
    <CenterContent maxWidth={'1440px'}>
      <Sidebar />
      <ScrapList>프론트엔드</ScrapList>
      <PostAreaComponent>
        {result.PostPreviewResponse.PostPreviewDtos.map((postInfo) => {
          return (
            <PostComponent
              isPrivate
              key={postInfo.PostPreviewDto.postId}
              thumbnail={postInfo.PostPreviewDto.imageUrl}
              title={postInfo.PostPreviewDto.title}
              likesCount={postInfo.PostPreviewDto.likesCount}
              viewsCount={postInfo.PostPreviewDto.viewsCount}
              Icon={<LockIcon fontSize="small" />}
            />
          );
        })}
      </PostAreaComponent>
      <PostPagination
        count={totalPages}
        page={page + 1}
        onChange={(_, newPage) => {
          setPage(newPage - 1);
        }}
        variant="outlined"
        shape="rounded"
      />
    </CenterContent>
  );
}

export default page;
