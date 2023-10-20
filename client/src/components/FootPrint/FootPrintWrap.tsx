import { Stack, StackProps } from '@mui/material';
import React from 'react';
import FootPrint from './FootPrint';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // ':hover': { transform: 'translateY(-4px)' },
        rotate: '-50deg',
      }}
      p={4}
      borderRadius={20}>
      <FootPrint width={60} height={60} />
    </Stack>
  );
}

export default FootPrintWrap;
