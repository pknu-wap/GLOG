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
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Post href="#" isPhone={isPhone} isTablet={isTablet} isLaptop={isLaptop}>
      <Thumbnail>
        <PostPopular>
          <FavoriteBorderIcon fontSize="small" />
          {likesCount}
          <VisibilityIcon fontSize="small" />
          {viewsCount}
        </PostPopular>
        <Image alt="" src={thumbnail} />

        {isPrivate && (
          <CostomizeButton>
            <IconButton size="small">{Icon}</IconButton>
          </CostomizeButton>
        )}
      </Thumbnail>
      <Title>{title}</Title>
    </Post>
  );
}

export default PostComponent;
