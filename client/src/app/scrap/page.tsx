"use client"
import React from 'react';
import PostComponent from './Post/Post';
import { useState } from "react";
import { Stack } from '@mui/material';
import { PostArea, PostAreaComponent, ScrapList } from './scrap.style';



export default function Scrap() {

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
              imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvelog.io%2F%40leebonggu12%2FDOCTYPE-html&psig=AOvVaw39z4JIR1b6teMO0M57tQ1h&ust=1695563450449000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIiFuZnwwIEDFQAAAAAdAAAAABAR',
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
const result = backend[page]

    return (
        <PostArea>
            <ScrapList>스크랩한 게시글</ScrapList>
            <PostAreaComponent>
                {result.PostPreviewResponse.recent.map((postInfo) => {
                    return <PostComponent thumbnail={postInfo.PostPrevewDto.imageUrl} title={postInfo.PostPrevewDto.title}/>;
                }
                )}
            </PostAreaComponent>
        </PostArea>
    )
};
