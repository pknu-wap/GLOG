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

function CollectPost({ like }: { like: ICollectPost }) {
  const theme = useTheme();

  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Post
      key={like.postId}
      href={`/{like.blogUrl}/home/1/${like.postId}`}
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
        <img alt="" src={like.thumbnail ?? ''} />
        <CostomizeButton>
          <IconButton size="small">
            <LockOutlined />
          </IconButton>
        </CostomizeButton>
      </Thumbnail>
      <Title>{like.title}</Title>
    </Post>
  );
}

export default CollectPost;
