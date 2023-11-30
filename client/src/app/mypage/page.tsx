/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CenterContent from '@/components/Layout/CenterContent';
import {
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import FootPrint from '@/components/FootPrint/FootPrint';
import {
  postChangeBlogNameApi,
  postChangeUserImageApi,
  postChangeUserInfoApi,
  useGetHistoryQuery,
  useGetMypageQuery,
  useGetVisitQuery,
} from '@/api/mypage-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

function page() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [yearWeekToggle, setYearWeekToggle] = useState<string | null>('year');
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isUserInfoEdit, setIsUserInfoEdit] = useState(false);
  const [isBlogNameEdit, setIsBlogNameEdit] = useState(false);
  const [blogName, setBlogName] = useState('');
  const fileInput = useRef<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [image, setImage] = useState('');
  const { data } = useGetVisitQuery();

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, newYearWeekToggle: string | null) => {
    if (newYearWeekToggle !== null) {
      setYearWeekToggle(newYearWeekToggle);
    }
  };

  const { data: userData } = useGetMypageQuery();
  const { data: historyData } = useGetHistoryQuery();

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const postChangeUserInfoQuery = useMutation(postChangeUserInfoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['mypage']);
      setIsUserInfoEdit(false);
    },
  });

  const postChangeUserImageQuery = useMutation(postChangeUserImageApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['mypage']);
      setIsUserInfoEdit(false);
    },
  });

  const postChangeBlogNameQuery = useMutation(postChangeBlogNameApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['mypage']);
      setIsBlogNameEdit(false);
    },
  });

  const userInfoOnClick = () => {
    const body = {
      name,
      introduction,
    };

    postChangeUserInfoQuery.mutate(body);
  };

  const userProfileOnClick = () => {
    const formData = new FormData();
    formData.append('image', image);

    postChangeUserImageQuery.mutate(formData);
  };

  const blogNameOnClick = () => {
    const body = {
      newBlogName: blogName,
    };

    postChangeBlogNameQuery.mutate(body);
  };

  useEffect(() => {
    setName(userData?.nickName ?? '');
    setIntroduction(userData?.introduction ?? '');
    setImageSrc(userData?.thumbnail ?? '');
  }, [userData, isUserInfoEdit]);

  useEffect(() => {
    setName(userData?.nickName ?? '');
    setIntroduction(userData?.introduction ?? '');
    setImageSrc(userData?.thumbnail ?? '');
  }, []);

  const onUpload = async (e: any) => {
    const file = e.target.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(file);

    await new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
    setImage(file);
  };

  const handleButtonClick = () => {
    fileInput.current?.click();
  };

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
              <Stack>
                <Image
                  width={140}
                  height={140}
                  style={{ borderRadius: '50%', marginBottom: '12px' }}
                  alt="profileImage"
                  src={imageSrc ?? ''}
                />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack>{userData?.nickName}</Stack>
                <Stack fontSize="14px">({userData?.blogUrl})</Stack>
              </Stack>
              <Button
                onClick={handleButtonClick}
                sx={{ marginTop: '16px' }}
                size="small"
                variant="outlined">
                이미지 수정
              </Button>
              <Button
                onClick={userProfileOnClick}
                sx={{ marginTop: '8px' }}
                size="small"
                variant="contained">
                저장
              </Button>
              <input style={{ display: 'none' }} type="file" ref={fileInput} onChange={onUpload} />
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
                    justifyContent="space-around">
                    {days?.map((day, index) => {
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
                    padding={3}
                    justifyContent="space-around">
                    {days.map((day, index) => {
                      return (
                        <Stack
                          borderLeft={`1px solid ${theme.palette.primary.main}`}
                          sx={{ ':first-child': { borderLeft: 'none' } }}
                          key={index}
                          width="14%"
                          justifyContent="flex-start"
                          alignItems="center">
                          {historyData?.week?.[day] ? (
                            <FootPrint width={30} height={30} />
                          ) : (
                            'ㅤㅤㅤ'
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={'1px'} width="100%" gap={1}>
                  {Array.from(
                    { length: Math.ceil(historyData?.year?.posted?.length / 30) },
                    (_, rowIndex) => (
                      <Stack spacing={1} direction="row" key={rowIndex}>
                        {historyData?.year?.posted
                          ?.slice(rowIndex * 30, rowIndex * 30 + 30)
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          .map((item: any, index: number) => (
                            <Stack
                              key={index}
                              width="14px"
                              height="14px"
                              bgcolor={item ? `rgba(228,186,90, 0.${item * 2})` : 'transparent'}
                              border={`1px solid ${theme.palette.primary.main}`}
                            />
                          ))}
                      </Stack>
                    ),
                  )}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack width="100%" spacing={4}>
          <Stack direction="row" spacing={2}>
            <Typography fontSize="24px">계정 설정</Typography>
            {isUserInfoEdit ? (
              <Stack direction="row" spacing={2}>
                <Button size="small" onClick={userInfoOnClick}>
                  저장
                </Button>
                <Button color="error" size="small" onClick={() => setIsUserInfoEdit(false)}>
                  취소
                </Button>
              </Stack>
            ) : (
              <Button size="small" onClick={() => setIsUserInfoEdit(true)}>
                수정
              </Button>
            )}
          </Stack>
          <CenterContent
            width={'100%'}
            border="1px solid #E8E2B4"
            bgcolor={theme.palette.mode === 'dark' ? 'transparent' : '#ffffff'}>
            {!isUserInfoEdit ? (
              <>
                <Stack>이름 : {userData?.nickName} </Stack>
                <Stack>한 줄 소개 : {userData?.introduction}</Stack>
              </>
            ) : (
              <>
                <Stack gap={10} direction="row" alignItems="center">
                  <Typography sx={{ width: '80px' }}>이름</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                  />
                </Stack>
                <Stack gap={10} direction="row" alignItems="center">
                  <Typography sx={{ width: '80px' }}>한 줄 소개</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    placeholder="한 줄 소개"
                  />
                </Stack>
              </>
            )}
          </CenterContent>
        </Stack>
        <Stack width="100%" spacing={4}>
          <Stack direction="row" spacing={2}>
            <Typography fontSize="24px">블로그 설정</Typography>
            {isBlogNameEdit ? (
              <Stack direction="row" spacing={2}>
                <Button size="small" onClick={blogNameOnClick}>
                  저장
                </Button>
                <Button color="error" size="small" onClick={() => setIsBlogNameEdit(false)}>
                  취소
                </Button>
              </Stack>
            ) : (
              <Button size="small" onClick={() => setIsBlogNameEdit(true)}>
                수정
              </Button>
            )}
          </Stack>
          <CenterContent
            width={'100%'}
            border="1px solid #E8E2B4"
            bgcolor={theme.palette.mode === 'dark' ? 'transparent' : '#ffffff'}>
            {!isBlogNameEdit ? (
              <Stack>블로그 이름 : {userData?.blogName} </Stack>
            ) : (
              <Stack gap={10} direction="row" alignItems="center">
                <Typography sx={{ width: '100px' }}>블로그 이름</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={blogName}
                  onChange={(e) => setBlogName(e.target.value)}
                  placeholder="블로그 이름"
                />
              </Stack>
            )}
          </CenterContent>
        </Stack>
        <Stack spacing={2}>
          <Typography fontSize="24px">통계</Typography>
          <CenterContent
            bgcolor={theme.palette.mode === 'dark' ? 'transparent' : '#ffffff'}
            width={'100%'}
            border="1px solid #e8e2b4">
            <Stack>방문자 수 : {data} </Stack>
          </CenterContent>
        </Stack>
      </CenterContent>
    </>
  );
}

export default page;
