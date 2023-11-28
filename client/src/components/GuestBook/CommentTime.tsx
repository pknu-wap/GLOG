import { Stack, useTheme } from '@mui/material';
import React from 'react';

function CommentTime({ message, createdAt }: { message: string; createdAt: string }) {
  const theme = useTheme();
  const createdTime = createdAt;
  const year = createdTime.slice(0, 4);
  const month = createdTime.slice(5, 7);
  const date = createdTime.slice(8, 10);
  const time = createdTime.slice(11, 19);
  return (
    <Stack
      borderLeft={`1px solid ${theme.palette.primary.main}`}
      direction="row"
      alignItems="center"
      paddingLeft={2}
      spacing={4}>
      <Stack>{message}</Stack>
      <Stack fontSize="11px">
        {year} / {month} / {date} / {time}
      </Stack>
    </Stack>
  );
}

export default CommentTime;
