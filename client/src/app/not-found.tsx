'use client';

import Loading from '@/components/Loading/Loading';
import PageLink from '@/components/PageLink/PageLink';
import { Stack } from '@mui/material';

export default function NotFound() {
  return (
    <Stack margin="auto" mt={'20%'} alignItems="center">
      <Stack width={100} height={80}>
        <Loading />
      </Stack>
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
