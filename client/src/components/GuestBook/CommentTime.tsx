import { Stack, useTheme } from '@mui/material';
import React from 'react';

function CommentTime({ message, createdAt, who }: { message: string; createdAt: string; who: string }) {
  const theme = useTheme();
  const createdTime = createdAt;
  const year = createdTime.slice(0, 4);
  const month = createdTime.slice(5, 7);
  const date = createdTime.slice(8, 10);
  const time = createdTime.slice(11, 19);
  
  return (
    <Stack>
      {who === 'me' || who === 'owner(me)' ? (
          <Stack
            borderRight={`1px solid ${theme.palette.primary.main}`}
            padding='0 5px 0 5px'
            alignItems="center"
            spacing={4}
            flexDirection={who === 'me' || who === 'owner(me)' ? "row-reverse" : "row"}>
            <Stack marginLeft='5px'>{message}</Stack>
            <Stack fontSize="11px" marginRight='5px'>
              {year} / {month} / {date} / {time}
            </Stack>
          </Stack>
      ) : (
          <Stack
            borderLeft={`1px solid ${theme.palette.primary.main}`}
            alignItems="center"
            paddingLeft={2}
            spacing={4}
            flexDirection={who === 'me' || who === 'owner(me)' ? "row-reverse" : "row"}>
            <Stack marginRight='5px'>{message}</Stack>
            <Stack fontSize="11px">
              {year} / {month} / {date} / {time}
            </Stack>
          </Stack>
      )}
    </Stack>
  );
}

export default CommentTime;
