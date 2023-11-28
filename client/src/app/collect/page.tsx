'use client';

import { MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CollectArray from './CollectArray';
import { Search, Star } from '@mui/icons-material';
import { useIsSearchSSR } from '../../../hooks/useRecoilSSR';
import {
  useGetCollectSearchContentQuery,
  useGetCollectSearchHashtagQuery,
  useGetCollectSearchTitleQuery,
  useGetCollectSearchUserQuery,
} from '@/api/collect-api';
import { ICollectPost } from '@/types/dto';
import PostComponent from '@/components/Post/Post';
import { PostAreaComponent } from '../[blogName]/scrap/scrap.style';

function Collect() {
  const [isSearch] = useIsSearchSSR();
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<'user' | 'title' | 'hashtag' | 'content'>('user');

  const { data: userData } = useGetCollectSearchUserQuery({ nickname: searchText });
  const { data: titleData } = useGetCollectSearchTitleQuery({ title: searchText });
  const { data: hashtagData } = useGetCollectSearchHashtagQuery({ hashtag: searchText });
  const { data: contentData } = useGetCollectSearchContentQuery({ content: searchText });

  const typeToDataMap = {
    user: userData,
    title: titleData,
    hashtag: hashtagData,
    content: contentData,
  };

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
          <Select value={searchType}>
            <MenuItem value="user" onClick={() => setSearchType('user')}>
              작성자
            </MenuItem>
            <MenuItem value="title" onClick={() => setSearchType('title')}>
              제목
            </MenuItem>
            <MenuItem value="hashtag" onClick={() => setSearchType('hashtag')}>
              해시태그
            </MenuItem>
            <MenuItem value="content" onClick={() => setSearchType('content')}>
              글 내용
            </MenuItem>
          </Select>
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
      <PostAreaComponent style={{ marginTop: '16px' }}>
        {typeToDataMap[searchType]?.postPreviewDtos.map((user: ICollectPost) => {
          return (
            <PostComponent
              key={user.postId}
              thumbnail={user.thumbnail ?? ''}
              title={user.title}
              likesCount={user.likesCount}
              viewsCount={user.viewsCount}
              Icon={<Star fontSize="small" />}
              href={`/${user.blogUrl}/home/1/${user.postId}`}
            />
          );
        })}
      </PostAreaComponent>
    </Stack>
  );
}

export default Collect;
