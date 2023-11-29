'use client';

import React, { useEffect } from 'react';
import PostComponent from '../../components/Post/Post';
import { useState } from 'react';
import { PostAreaComponent, PostPagination, ScrapList } from './scrap.style';
import CenterContent from '@/components/Layout/CenterContent';
import StarIcon from '@mui/icons-material/Star';
import { useGetScrapQuery } from '@/api/scrap-api';
import { IScrapContent } from '@/types/dto';

export default function Scrap() {
  const [page, setPage] = useState(0);
  const { data } = useGetScrapQuery({ page });
  const [result, setResult] = useState<IScrapContent[]>();

  useEffect(() => {
    setResult(data?.postPreviewDtos);
  }, [data]);

  return (
    <CenterContent maxWidth={'1440px'}>
      <ScrapList>스크랩한 게시글</ScrapList>
      <PostAreaComponent>
        {result?.map((postInfo) => {
          return (
            <PostComponent
              key={postInfo.postId}
              thumbnail={postInfo.thumbnail}
              title={postInfo.title}
              likesCount={postInfo.likesCount}
              viewsCount={postInfo.viewsCount}
              Icon={<StarIcon fontSize="small" />}
            />
          );
        })}
      </PostAreaComponent>
      <PostPagination
        count={data?.totalPages}
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
