import { Stack } from '@mui/material';
import React from 'react';

function Container({ color }: { color: string }) {
  return (
    <Stack width="200px" height="200px" fontSize="24px" color="white" bgcolor="skyblue">
      {color}
    </Stack>
  );
}

export default Container;
