'use client';

import { Stack, StackProps } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';

const CenterContent = ({ maxWidth, children, color, bgcolor, ...rest }: StackProps) => {
  const theme = useTheme();

  console.log(maxWidth);

  return (
    <Stack
      gap={2}
      bgcolor={bgcolor ?? 'white'}
      padding={{ xs: '20px 8px', sm: '28px' }}
      flex={1}
      maxWidth={maxWidth ?? '1440px'}
      sx={{
        width: '100%',
        borderRadius: '8px',
        mx: 'auto',
        color: color ?? theme.palette.oppositeColor.main,
      }}
      {...rest}>
      {children}
    </Stack>
  );
};

export default CenterContent;
