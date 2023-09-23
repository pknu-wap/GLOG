"use client"
import React from 'react';
import PostComponent from './Post/Post';
import { useState } from "react";
import { Stack } from '@mui/material';
import { PostAreaComponent } from './scrap.style';


const [page, setPage] = useState<number>(0);
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

export default function BasicUsage() {
    return (
        <Stack>
            <PostAreaComponent>
                {result.PostPreviewResponse.recent.map((postInfo) => {
                    return <PostComponent thumbnail={postInfo.imageUrl} title={postInfo.title}/>;
                }
                )}
            </PostAreaComponent>
        </Stack>
    )
};
