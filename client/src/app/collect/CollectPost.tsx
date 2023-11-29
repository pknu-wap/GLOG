import React from 'react';
import {
  CostomizeButton,
  Post,
  PostPopular,
  Thumbnail,
  Title,
  VisibilityIcon,
} from '@/components/Post/Post.style';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LockOutlined } from '@mui/icons-material';
import { ICollectPost } from '@/types/dto';
import { useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@/components/Button/IconButton';
import Image from 'next/image';
import { Stack } from '@mui/material';

function CollectPost({ like }: { like: ICollectPost }) {
  const theme = useTheme();

  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Post
      key={like.postId}
      href={`/${like.blogUrl}/home/${like.categoryId}/${like.postId}`}
      isCollect={true}
      isPhone={isPhone}
      isTablet={isTablet}
      isLaptop={isLaptop}>
      <Thumbnail>
        <PostPopular>
          <FavoriteBorderIcon fontSize="small" />
          {like.likesCount}
          <VisibilityIcon fontSize="small" />
          {like.viewsCount}
        </PostPopular>
        <Stack>
          <Image alt="썸네일" fill src={like.thumbnail ?? ''} />
        </Stack>
        {like?.isPrivate && (
          <CostomizeButton>
            <IconButton size="small">
              <LockOutlined />
            </IconButton>
          </CostomizeButton>
        )}
      </Thumbnail>
      <Title>{like.title}</Title>
    </Post>
  );
}

export default CollectPost;
