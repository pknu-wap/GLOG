import React from 'react';
import { CostomizeButton, Image, Post, PostPopular, Thumbnail, Title } from './Post.style';
import { PostComponentType } from './Post.type';
import Script from 'next/script';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '../Button/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';

function PostComponent({ thumbnail, title, likesCount, viewsCount, isPrivate }: PostComponentType) {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Post href="#" isPhone={isPhone} isTablet={isTablet}>
      <Thumbnail>
        <PostPopular>
          <IconButton size="small">
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          &nbsp;{likesCount}&nbsp;&nbsp;&nbsp;
          <IconButton size="small">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          &nbsp;{viewsCount}
        </PostPopular>
        <Image alt="" src={thumbnail} />

        <CostomizeButton>
          <IconButton size="small">
            <StarIcon fontSize="small" />
          </IconButton>
        </CostomizeButton>
      </Thumbnail>
      <Title>{title}</Title>
      {isPrivate && (
        <Script src="https://kit.fontawesome.com/fe09364908.js" crossOrigin="anonymous"></Script>
      )}
    </Post>
  );
}

export default PostComponent;
