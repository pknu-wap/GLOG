'use client';

import PageLink from '@/components/PageLink/PageLink';
import { Stack } from '@mui/material';
import Image from 'next/image';

export default function NotFound() {
  return (
    <Stack margin="auto" mt={'20%'} alignItems="center">
      <Image alt="404 그림" src={'/assets/error-404.png'} width={100} height={100} />
      <h1 color="#000">찾을 수 없는 페이지에요</h1>
      <PageLink
        href="/"
        style={{ border: '1px solid #444', padding: '4px 8px', borderRadius: '8px' }}
        color="#444">
        메인 대시보드로 돌아가기
      </PageLink>
    </Stack>
  );
}
