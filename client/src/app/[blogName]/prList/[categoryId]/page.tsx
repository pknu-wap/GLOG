'use client';

import { useGetPRQuery, useGetPRUnpostedQuery } from '@/api/pr-api';
import Button from '@/components/Button/Button';
import CenterContent from '@/components/Layout/CenterContent';
import List from '@/components/List/List';
import PageLink from '@/components/PageLink/PageLink';
import { Stack } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import EmptyContent from '../../../../../public/assets/box.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteWriteApi } from '@/api/write-api';
import { enqueueSnackbar } from 'notistack';

function page({ params }: { params: { categoryId: string } }) {
  const { data: postedData } = useGetPRQuery({ categoryId: Number(params.categoryId) });
  const { data: unPostedData } = useGetPRUnpostedQuery({
    categoryId: Number(params.categoryId),
  });
  const [unPosted, setUnPosted] = useState(unPostedData);
  const queryClient = useQueryClient();
  const deleteWritePrQuery = useMutation(DeleteWriteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['prList']);
      enqueueSnackbar({ message: 'PR 삭제가 완료되었습니다.', variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar({ message: '에러가 발생하였습니다.', variant: 'error' });
    },
  });

  const deletePrPostOnClick = (postId: number) => {
    deleteWritePrQuery.mutate({ postId });
  };

  useEffect(() => {
    setUnPosted(unPostedData);
  }, [unPostedData]);

  return (
    <CenterContent maxWidth="1080px">
      {unPosted?.isAuthor && (
        <>
          <Stack fontSize="24px" marginBottom="8px">
            작성하지 않은 PR
          </Stack>
          <Stack p={2} direction="row" spacing={4} overflow={'scroll'}>
            {unPosted?.prUnPostedDtos?.prUnPostedDtos?.map((unPost) => {
              return (
                <PageLink key={unPost.prId} href={`/write/pr/${unPost.prId}`}>
                  <Stack
                    sx={{
                      transition: 'all .35s ease-in-out',
                      cursor: 'pointer',
                      ':hover': { transform: 'translateY(-4px)' },
                    }}
                    minWidth="220px"
                    height="124px"
                    bgcolor="primary.main"
                    p={4}
                    borderRadius="8px"
                    justifyContent="space-around">
                    <Stack direction="row" justifyContent="space-between">
                      <Stack color="#000000" fontSize="20px" fontWeight="bold">
                        #{unPost.prId}
                      </Stack>
                    </Stack>
                    <Stack
                      color="#000000"
                      sx={{ wordBreak: 'break-all' }}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      display="inline"
                      whiteSpace="nowrap">
                      {unPost.prTitle}
                    </Stack>
                  </Stack>
                </PageLink>
              );
            })}
          </Stack>
        </>
      )}
      <Stack margin="40px 0px 8px 0px" fontSize="24px">
        작성한 PR 목록
      </Stack>
      {postedData?.prPostedDtos?.prPostedDtos?.length > 0 ? (
        postedData.prPostedDtos.prPostedDtos?.map((post) => {
          return (
            <List
              key={post?.postId}
              width="100%"
              content={post?.prTitle}
              buttonAction={
                <Stack direction="row">
                  <PageLink href={`/write/pr/update/${Number(params.categoryId)}/${post.postId}`}>
                    <Button size="small" color="primary">
                      수정
                    </Button>
                  </PageLink>
                  <Button
                    onClick={() => deletePrPostOnClick(post.postId)}
                    size="small"
                    color="error">
                    삭제
                  </Button>
                </Stack>
              }
            />
          );
        })
      ) : (
        <Stack width="100%" direction="column" spacing={4} alignItems="center" mt={40}>
          <Image alt="빈 콘텐츠" src={EmptyContent} width={60} height={60} />
          <Stack fontSize={'18px'} width="fit-content">
            작성한 PR이 존재하지 않습니다.
          </Stack>
        </Stack>
      )}
    </CenterContent>
  );
}

export default page;
