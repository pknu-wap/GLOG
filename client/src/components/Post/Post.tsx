import React, { ReactNode } from 'react';
import { CostomizeButton, Image, Post, PostPopular, Thumbnail, Title } from './Post.style';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '../Button/IconButton';
import { IScrapContent } from '@/types/dto';

function PostComponent({
  thumbnail,
  title,
  likesCount,
  viewsCount,
  Icon,
  href,
}: IScrapContent & { Icon: ReactNode; href?: string }) {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Post href={href ?? ''} isPhone={isPhone} isTablet={isTablet} isLaptop={isLaptop}>
      <Thumbnail>
        <PostPopular>
          <FavoriteBorderIcon fontSize="small" />
          {likesCount}
          <VisibilityIcon fontSize="small" />
          {viewsCount}
        </PostPopular>
        <Image alt="" src={thumbnail} />
        <CostomizeButton>
          <IconButton size="small">{Icon}</IconButton>
        </CostomizeButton>
      </Thumbnail>
      <Title>{title}</Title>
    </Post>
  );
}

export default PostComponent;
