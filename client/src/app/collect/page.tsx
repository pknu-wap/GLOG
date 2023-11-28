'use client';

import { Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CollectArray from './CollectArray';
import { Search } from '@mui/icons-material';
import { useIsSearchSSR } from '../../../hooks/useRecoilSSR';

function Collect() {
  const [isSearch] = useIsSearchSSR();
  const [searchText, setSearchText] = useState<string>('');

  return (
    <Stack mt={8}>
      {!isSearch ? (
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
      ) : (
        <Stack direction="row" spacing={4} justifyContent="center">
          <TextField
            placeholder="검색어를 입력해주세요"
            InputProps={{
              startAdornment: <Search sx={{ marginRight: '10px' }} />,
            }}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            sx={{
              width: '50%',
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default Collect;
