import { Stack, StackProps } from '@mui/material';
import React from 'react';

interface CenterContentProps extends StackProps {
  maxWidth?: string | number;
}

function CenterContent({ maxWidth, children, ...rest }: CenterContentProps) {
  return (
    <Stack
      gap={2}
      padding={{ xs: '20px 8px', sm: '28px' }}
      flex={1}
      sx={{
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #dddddd',
        // backgroundColor: 'white',
        maxWidth: maxWidth ? 1280 : 'none',
        mx: 'auto',
      }}
      {...rest}>
      {children}
    </Stack>
  );
}

export default CenterContent;
