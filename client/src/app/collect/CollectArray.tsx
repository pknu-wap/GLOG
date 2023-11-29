'use client';

import React, { useEffect, useState } from 'react';
import IconButton from '@/components/Button/IconButton';

import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { ICollectContent } from '@/types/dto';
import { useGetCollectDataQuery } from '@/api/collect-api';
import Toast from '@/components/Toast/Toast';
import CollectPost from './CollectPost';

function CollectArray({ kind }: { kind: 'likes' | 'views' | 'recent' }) {
  const [toastOpen, setToastOpen] = useState(false);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLabtop = useMediaQuery(theme.breakpoints.down('lg'));

  const responsivePostCountMap = {
    isPhone: 1,
    isTablet: 2,
    isLaptop: 3,
    isDesktop: 4,
  };

  const postCount = isPhone
    ? responsivePostCountMap.isPhone
    : isTablet
    ? responsivePostCountMap.isTablet
    : isLabtop
    ? responsivePostCountMap.isLaptop
    : responsivePostCountMap.isDesktop;

  const [page, setPage] = useState(0);
  const [backendSendPage, setBackendSendPage] = useState(1);

  const { data } = useGetCollectDataQuery({ kind, page: backendSendPage });
  const [kindArray, setKindArray] = useState<ICollectContent>(data);

  useEffect(() => {
    if (!kindArray) {
      setKindArray(data);
    } else {
      setKindArray((prevData) => {
        return {
          postPreviewDtos: [...(prevData?.postPreviewDtos ?? []), ...(data?.postPreviewDtos ?? [])],
          totalPages: prevData.totalPages,
        };
      });
    }
  }, [data]);

  const newDataButtonClick = () => {
    if (page < Math.max(kindArray.totalPages, kindArray.postPreviewDtos.length / postCount) - 1) {
      setPage((prevPage) => prevPage + 1);
      setBackendSendPage((prevPage) => prevPage + 1);
    } else {
      setToastOpen(true);
    }
  };

  return (
    <Stack direction="row" justifyContent="left" alignItems="center">
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        toastMessage="게시글이 존재하지 않습니다."
      />
      <IconButton
        onClick={() => {
          page > 0 ? setPage((prevPage) => prevPage - 1) : setToastOpen(true);
        }}>
        <KeyboardArrowLeft />
      </IconButton>
      {kindArray?.postPreviewDtos
        ?.slice(page * postCount, page * postCount + postCount)
        .map((like) => {
          return <CollectPost like={like} key={like.postId} />;
        })}
      <IconButton onClick={newDataButtonClick}>
        <KeyboardArrowRight />
      </IconButton>
    </Stack>
  );
}

export default CollectArray;
