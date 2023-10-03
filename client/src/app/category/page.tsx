'use client';
import React from 'react';
import PostComponent from '../../components/Post/Post';
import { useState } from 'react';
import { PostAreaComponent, PostPagination, ScrapList } from './category.style';
import CenterContent from '@/components/Layout/CenterContent';
import StarIcon from '@mui/icons-material/Star';

export default function Scrap() {
  //현재 페이지 상태
  const [page, setPage] = useState(0);

  const backend = [
    {
      PostPreviewResponse: {
        count: '0L',
        recent: [
          {
            PostPrevewDto: {
              blogUrl: 'string',
              postId: 1,
              title: 'string',
              imageUrl: 'string',
              likesCount: 100,
              viewsCount: 200,
              repliesCount: 0,
              createdAt: '2000-01-01T00:00:00 ',
            },
          },
          {
            PostPrevewDto: {
              blogUrl: 'string',
              postId: 1,
              title: 'string',
              imageUrl: 'string',
              likesCount: 300,
              viewsCount: 400,
              repliesCount: 0,
              createdAt: '2000-01-01T00:00:00 ',
            },
          },
          {
            PostPrevewDto: {
              blogUrl: 'string',
              postId: 1,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: '2000-01-01T00:00:00 ',
            },
          },
          {
            PostPrevewDto: {
              blogUrl: 'string',
              postId: 1,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: '2000-01-01T00:00:00 ',
            },
          },
          {
            PostPrevewDto: {
              blogUrl: 'string',
              postId: 1,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: '2000-01-01T00:00:00 ',
            },
          },
        ],
      },
    },
    {
      PostPreviewResponse: {
        count: '0L',
        recent: [
          {
            PostPrevewDto: {
              blogUrl: 'string',
              postId: 1,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: '2000-01-01T00:00:00 ',
            },
          },
        ],
      },
    },
  ];
  const result = backend[page];

  //전체 페이지 수
  //나중에 백에서 데이터를 받을 땐 :
  // = result.PostPreviewResponse.count / 12 (한 페이지당 12개의 게시글 존재)
  const totalPages = backend.length;

  return (
    <CenterContent maxWidth={'1280px'}>
      <ScrapList>스크랩한 게시글</ScrapList>
      <PostAreaComponent>
        {result.PostPreviewResponse.recent.map((postInfo) => {
          return (
            <PostComponent
              isPrivate
              key={postInfo.PostPrevewDto.postId}
              thumbnail={postInfo.PostPrevewDto.imageUrl}
              title={postInfo.PostPrevewDto.title}
              likesCount={postInfo.PostPrevewDto.likesCount}
              viewsCount={postInfo.PostPrevewDto.viewsCount}
              Icon={<StarIcon fontSize="small" />}
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
