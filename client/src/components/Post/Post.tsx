import React from 'react';
import { CostomizeButton, Image, Post, PostPopular, Thumbnail, Title } from './Post.style';
import { PostComponentType } from './Post.type';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '../Button/IconButton';

function PostComponent({
  thumbnail,
  title,
  likesCount,
  viewsCount,
  Icon,
  isPrivate,
}: PostComponentType) {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Post href="#" isPhone={isPhone} isTablet={isTablet}>
      <Thumbnail>
        <PostPopular>
          <FavoriteBorderIcon fontSize="small" />
          &nbsp;{likesCount}&nbsp;&nbsp;&nbsp;
          <VisibilityIcon fontSize="small" />
          &nbsp;{viewsCount}
        </PostPopular>
        <Image alt="" src={thumbnail} />

        {isPrivate && (
          <CostomizeButton>
            <IconButton size="small">{Icon}</IconButton>
          </CostomizeButton>
        )}
        <CostomizeButton>
          <IconButton size="small">{Icon}</IconButton>
        </CostomizeButton>
      </Thumbnail>
      <Title>{title}</Title>
    </Post>
  );
}

export default PostComponent;
