'use client';

import { Stack, StackProps } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';

const CenterContent = ({ maxWidth, children, color, ...rest }: StackProps) => {
  const theme = useTheme();

  return (
    <Stack
      gap={2}
      padding={{ xs: '20px 8px', sm: '28px' }}
      flex={1}
      sx={{
        width: '100%',
        borderRadius: '8px',
        maxWidth: maxWidth ?? 800,
        mx: 'auto',
        color: color ?? theme.palette.oppositeColor.main,
      }}
      {...rest}>
      {children}
    </Stack>
  );
};

export default CenterContent;
