'use client';
import { PostMakeAccountApi } from '@/api/makeAccount-api';
import CenterContent from '@/components/Layout/CenterContent';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [blogUrl, setBlogUrl] = useState<string>('');
  const [blogName, setBlogName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const postMakeAccountCreateQuery = useMutation(PostMakeAccountApi, {
    onSuccess: () => router.push('/collect'),
  });

  const postOnClick = () => {
    const newAccountBody = {
      blogUrl: blogUrl,
      blogName: blogName,
      nickname: nickname,
    };

    postMakeAccountCreateQuery.mutate(newAccountBody);
  };

  useEffect(() => {
    const getTokenValue = params.get('token');
    const error = params.get('error');

    if (getTokenValue) {
      localStorage.setItem('token', getTokenValue);
      console.log(getTokenValue);
    } else {
      console.log(error);
    }
  }, [params]);

  return (
    <CenterContent>
      <Stack width="300px" margin="auto" flexDirection="column" alignItems="center">
        <TextField
          required
          fullWidth
          sx={{ marginBottom: '5px' }}
          id="outlined-basic"
          label="blog URL"
          variant="outlined"
          value={blogUrl}
          onChange={(e) => {
            setBlogUrl(e.target.value);
          }}
        />
        <Stack fontSize="10px" color="red" marginBottom="15px">
          *블로그 URL은 수정할 수 없으니 신중히 적어주세요.
        </Stack>
        <TextField
          required
          fullWidth
          sx={{ marginBottom: '30px' }}
          id="outlined-basic"
          label="이름"
          variant="outlined"
          value={blogName}
          onChange={(e) => {
            setBlogName(e.target.value);
          }}
        />
        <TextField
          required
          fullWidth
          sx={{ marginBottom: '5px' }}
          id="outlined-basic"
          label="닉네임"
          variant="outlined"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <Stack fontSize="10px" color="red" marginBottom="15px">
          *닉네임이 블로그 주소에 반영 됩니다.
        </Stack>
        <Button fullWidth sx={{ height: '50px' }} variant="outlined" onClick={() => postOnClick()}>
          입력
        </Button>
      </Stack>
    </CenterContent>
  );
};

export default Page;
