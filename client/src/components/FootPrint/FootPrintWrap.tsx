import { Stack, StackProps } from '@mui/material';
import React from 'react';
import FootPrint from './FootPrint';

function FootPrintWrap({
  bottom,
  right,
  sx,
}: {
  bottom: number;
  right: number;
  sx: StackProps['sx'];
}) {
  return (
    <Stack
      position="fixed"
      bottom={bottom}
      right={right}
      sx={{
        ...sx,
        transition: 'all .35s ease-in-out',
        rotate: '-50deg',
      }}
      p={4}
      borderRadius={20}>
      <FootPrint width={60} height={60} />
    </Stack>
  );
}

export default FootPrintWrap;
