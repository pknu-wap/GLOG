import { Stack, Typography } from '@mui/material';
import React from 'react';
import CollectArray from './CollectArray';

function Collect() {
  return (
    <Stack padding={'10px 40px'} spacing={4}>
      <Typography color="oppositeColor.main" fontSize="24px">
        좋아요 한 게시글
      </Typography>
      <CollectArray kind="likes" />
      <Typography color="oppositeColor.main" fontSize="24px">
        조회수가 많은 게시글
      </Typography>
      <CollectArray kind="views" />
      <Typography color="oppositeColor.main" fontSize="24px">
        최근 게시글
      </Typography>
      <CollectArray kind="recent" />
    </Stack>
  );
}

export default Collect;
