import { Stack, useTheme } from '@mui/material';
import React from 'react';

function CommentTime({ isMe }: { isMe?: boolean }) {
  const theme = useTheme();
  return (
    <Stack
      borderLeft={`1px solid ${theme.palette.primary.main}`}
      direction="row"
      alignItems="center"
      paddingLeft={2}
      spacing={4}>
      {isMe ? (
        <>
          <Stack fontSize="11px">2023.09.05 08:13 pm</Stack>
          <Stack>안녕하세요</Stack>
        </>
      ) : (
        <>
          <Stack>안녕하세요</Stack>
          <Stack fontSize="11px">2023.09.05 08:13 pm</Stack>
        </>
      )}
    </Stack>
  );
}

export default CommentTime;
