import { Stack } from '@mui/material';
import React from 'react';
import CommentTime from './CommentTime';

function Comment({ isMe }: { isMe?: boolean }) {
  return (
    <Stack spacing={3} width="100%" alignItems={isMe ? 'flex-end' : 'flex-start'}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* <img
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
          }}
          src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
          alt="profileImage"
        /> */}
        <Stack fontSize="16px" fontWeight="bold">
          Guest 1
        </Stack>
      </Stack>
      <CommentTime isMe={isMe} />
    </Stack>
  );
}

export default Comment;
