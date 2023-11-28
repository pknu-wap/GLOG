'use client';

import { useGetPRQuery, useGetPRUnpostedQuery } from '@/api/pr-api';
// import { useGetPRQuery } from '@/api/pr-api';
import Button from '@/components/Button/Button';
import CenterContent from '@/components/Layout/CenterContent';
import List from '@/components/List/List';
import PageLink from '@/components/PageLink/PageLink';
import { Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import EmptyContent from '../../../../../public/assets/box.png';
import Complete from '../../../../../public/assets/complete-icon.svg';

function page({ params }: { params: { categoryId: string } }) {
  const { data: postedData } = useGetPRQuery({ categoryId: Number(params.categoryId) });
  const { data: unPostedData } = useGetPRUnpostedQuery({ categoryId: Number(params.categoryId) });

  return (
    <CenterContent maxWidth="1080px">
      <Stack fontSize="24px" marginBottom="8px">
        작성하지 않은 PR
      </Stack>
      <Stack p={2} direction="row" spacing={4} overflow={'scroll'}>
        {unPostedData?.map((unPost: { id: number }, i: number) => {
          return (
            <PageLink key={i} href={`/write/pr/${i}`}>
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
                    #77
                  </Stack>
                  {/* FIXME : 이미지 수정해야함. */}
                  {/* <img
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
                alt="profileImage"
              /> */}
                </Stack>
                <Stack
                  color="#000000"
                  sx={{ wordBreak: 'break-all' }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  display="inline"
                  whiteSpace="nowrap">
                  로딩구현 ㅏㅁㅇ나러ㅏㅇㅁㄹ ㄴ아 ㄴㅇ라ㅓ ㄴ ㄹ
                </Stack>
              </Stack>
            </PageLink>
          );
        }) ?? (
          <Stack
            width="100%"
            direction="column"
            spacing={4}
            justifyContent="center"
            alignItems="center"
            height={200}>
            <Stack width={40} height={40}>
              <Complete color="#834" />
            </Stack>
            <Stack fontSize={'18px'} width="fit-content">
              모든 PR 글 작성을 완료하셨습니다.
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack margin="40px 0px 8px 0px" fontSize="24px">
        작성한 PR 목록
      </Stack>
      {postedData?.prPostedDtos?.prPostedDtos ||
      postedData?.prPostedDtos?.prPostedDtos?.length > 0 ? (
        postedData.prPostedDtos.prPostedDtos?.map((post: { id: number }, i: number) => {
          return (
            <List
              key={i}
              width="100%"
              content={'asdf'}
              buttonAction={
                <Stack direction="row">
                  <Button size="small" color="primary">
                    수정
                  </Button>
                  <Button size="small" color="error">
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
