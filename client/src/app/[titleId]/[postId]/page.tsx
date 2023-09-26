import CenterContent from '@/components/Layout/CenterContent';
import { Stack } from '@mui/material';
import React from 'react';

const page = ({ params }: { params: { titleId: string; postId: string } }) => {
  return (
    <Stack justifyContent={'center'} gap={40} direction="row">
      <CenterContent>
        <Stack>{params.postId}</Stack>
      </CenterContent>
      {/* <Stack bgcolor="yellow" width="200px">
        ads
      </Stack> */}
    </Stack>
  );
};

export default page;
