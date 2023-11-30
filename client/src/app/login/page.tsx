import Button from '@/components/Button/Button';
import { GITHUB_AUTH_URL } from '@/constant/common';
import { Link, Stack } from '@mui/material';
import React from 'react';

function page() {
  return (
    <Stack 
      display='flex' 
      alignItems='center' 
      justifyContent='center' 
      marginTop='50vh'
      >
      <Button size="large" variant="outlined">
        <Link 
          sx={{fontSize: '20px', textDecorationLine: 'none'}}
          href={GITHUB_AUTH_URL}>
          깃허브 로그인
        </Link>
      </Button>

    </Stack>
  );
}

export default page;
