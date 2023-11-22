'use client';

import CenterContent from '@/components/Layout/CenterContent';
import { Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import FootPrint from '@/components/FootPrint/FootPrint';
// import { useGetMypageQuery } from '@/api/mypage-api';

function page() {
  const theme = useTheme();
  const [yearWeekToggle, setYearWeekToggle] = useState<string | null>('year');

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, newYearWeekToggle: string | null) => {
    if (newYearWeekToggle !== null) {
      setYearWeekToggle(newYearWeekToggle);
    }
  };

  // const { data } = useGetMypageQuery();

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <>
      <CenterContent maxWidth={'1000px'} sx={{ gap: '64px' }}>
        <Stack spacing={4} width="100%">
          <Stack width="100%" alignItems="flex-end">
            <ToggleButtonGroup
              sx={{ height: '32px' }}
              value={yearWeekToggle}
              exclusive
              onChange={handleAlignment}>
              <ToggleButton color="primary" value="week">
                1주
              </ToggleButton>
              <ToggleButton color="primary" value="year">
                1년
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack
            p={10}
            width="100%"
            borderRadius="8px"
            direction="row"
            spacing={20}
            border="1px solid #E8E2B4"
            alignItems="center"
            overflow="scroll"
            bgcolor={theme.palette.mode === 'dark' ? 'transparent' : '#ffffff'}>
            <Stack>
              {/* <img
                width="140px"
                height="140px"
                style={{ borderRadius: '50%', marginBottom: '12px' }}
                alt="profileImage"
                src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
              /> */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack>신채연라면</Stack>
                <Stack fontSize="14px">(urlurlurlu)</Stack>
              </Stack>
            </Stack>
            <Stack width="100%" height="100%" justifyContent="center" spacing={4}>
              {yearWeekToggle === 'week' ? (
                <Stack minWidth="360px" width="100%" height="100%">
                  <Stack
                    borderRadius="8px"
                    width="100%"
                    direction="row"
                    border={`1px solid ${theme.palette.primary.main}`}
                    padding={3}
                    //   bgcolor="red"
                    justifyContent="space-around">
                    {days.map((day, index) => {
                      return (
                        <Stack
                          borderRight={`1px solid ${theme.palette.primary.main}`}
                          sx={{ ':last-child': { borderRight: 'none' } }}
                          key={index}
                          width="14%"
                          textAlign="center">
                          {day}
                        </Stack>
                      );
                    })}
                  </Stack>
                  <Stack
                    borderRadius="8px"
                    width="100%"
                    direction="row"
                    //   bgcolor="red"
                    padding={3}
                    justifyContent="space-around">
                    {days.map((_, index) => {
                      return (
                        <Stack
                          borderLeft={`1px solid ${theme.palette.primary.main}`}
                          sx={{ ':first-child': { borderLeft: 'none' } }}
                          key={index}
                          width="14%"
                          justifyContent="flex-start"
                          alignItems="center">
                          <FootPrint width={30} height={30} />
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={'1px'} width="100%" gap={1}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <Stack direction="row" width="100%" gap={2} key={i} marginRight="12px">
                      <Stack lineHeight="14px" height="14px">
                        Jan
                      </Stack>
                      <Stack spacing={'5px'} direction="row">
                        {Array.from({ length: 30 }, (_, index) => (
                          <Stack
                            key={index}
                            width="14px"
                            height="14px"
                            border={`1px solid ${theme.palette.primary.main}`}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack width="100%" spacing={4}>
          <Stack direction="row" spacing={2}>
            <Typography fontSize="24px">계정 설정</Typography>
            <Button size="small">수정</Button>
          </Stack>
          <CenterContent
            width={'100%'}
            border="1px solid #E8E2B4"
            bgcolor={theme.palette.mode === 'dark' ? 'transparent' : '#ffffff'}>
            <Stack>이름 : </Stack>
            <Stack>한 줄 소개 : </Stack>
          </CenterContent>
        </Stack>
        <Stack width="100%" spacing={4}>
          <Typography fontSize="24px">블로그 설정</Typography>
          <CenterContent
            width={'100%'}
            border="1px solid #E8E2B4"
            bgcolor={theme.palette.mode === 'dark' ? 'transparent' : '#ffffff'}>
            <Stack>블로그 이름 : </Stack>
          </CenterContent>
        </Stack>
      </CenterContent>
    </>
  );
}

export default page;
