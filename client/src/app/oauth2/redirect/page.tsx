'use client';
import CenterContent from '@/components/Layout/CenterContent';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const params = useSearchParams();

  useEffect(() => {
    const getTokenValue = params.get('token');
    const error = params.get('error');

    if (getTokenValue) {
      localStorage.setItem('token', getTokenValue);
    } else {
      console.log(error);
    }
  }, [params]);

  return (
    <CenterContent>
      <Stack flexDirection="column" alignItems="center" paddingTop="20vh">
        <TextField
          sx={{ marginBottom: '30px', width: '300px' }}
          id="outlined-basic"
          label="blog URL"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: '30px', width: '300px' }}
          id="outlined-basic"
          label="이름"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: '10px', width: '300px' }}
          id="outlined-basic"
          label="닉네임"
          variant="outlined"
        />
        <Stack left="0" fontSize="7px" color="red">
          *닉네임이 블로그 주소에 반영 됩니다.
        </Stack>
      </Stack>
    </CenterContent>
  );
};

export default Page;
