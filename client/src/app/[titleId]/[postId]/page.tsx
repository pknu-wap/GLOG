import CenterContent from '@/components/Layout/CenterContent';
import { Stack } from '@mui/material';
import React from 'react';

function page({ params }: { params: { titleId: string; postId: string } }) {
  return (
    <Stack justifyContent={'center'} gap={40} bgcolor="red" direction="row">
      {/* <Stack width="100%" maxWidth={800} bgcolor="blue" justifyContent={'left'}>
        <Stack width="fit-content">{params.titleId}</Stack>
      </Stack> */}
      <CenterContent>
        <Stack bgcolor="yellow">{params.titleId}</Stack>
      </CenterContent>
      {/* <Stack width="100%" maxWidth={200} bgcolor="yellow" justifyContent={'left'}>
        <Stack width="fit-content">{params.titleId}</Stack>
      </Stack> */}
    </Stack>
  );
}

export default page;
