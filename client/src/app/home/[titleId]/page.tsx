'use client';
import React, { useEffect } from 'react';
import PostComponent from '../../../components/Post/Post';
import { useState } from 'react';
import { PostAreaComponent, PostPagination, ScrapList } from './tagegory.style';
import CenterContent from '@/components/Layout/CenterContent';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useGetSidebarQuery } from '@/api/blog-api';
import { ISidebarContent } from '@/types/dto';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { Stack } from '@mui/material';

function page({ params }: { params: { titleId: string } }) {
  const [page, setPage] = useState(0);
  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });
  const [writeList, setWriteList] = useState<ISidebarContent[]>();

  useEffect(() => {
    setWriteList(sidebarData?.sidebarDtos);
  }, [sidebarData]);

  const backend = [
    {
      isAuthor: true,
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
              postId: 1,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 1,
              isScrapped: false,
            },
          },
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 2,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 0,
              isScrapped: true,
            },
          },
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 3,
              title: 'string',
              imageUrl: 'string',
              likesCount: 0,
              viewsCount: 0,
              repliesCount: 0,
              createdAt: 0,
              isPrivate: 0,
              isScrapped: false,
            },
          },
          {
            PostPreviewDto: {
              blogUrl: 'string',
              postId: 4,
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
    <CenterContent maxWidth={'2000px'}>
      <ScrapList>{params.titleId}</ScrapList>
      <DragAndDrop
        footprintList={writeList}
        rightContainer={
          <Stack width="100%">
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
                    Icon={
                      result.isAuthor ? (
                        postInfo.PostPreviewDto.isPrivate ? (
                          <LockIcon fontSize="small" />
                        ) : (
                          <LockOpenIcon fontSize="small" />
                        )
                      ) : postInfo.PostPreviewDto.isScrapped ? (
                        <StarIcon fontSize="small" />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )
                    }
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
          </Stack>
        }
      />
    </CenterContent>
  );
}

export default page;
