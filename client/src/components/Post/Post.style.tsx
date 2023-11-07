import { styled } from '@mui/material/styles';
import { Icon, Theme } from '@mui/material';
import Link from 'next/link';

export const Post = styled(Link, {
  shouldForwardProp: (propName: string) =>
    !['isPhone', 'isTablet', 'isLaptop', 'isCollect'].includes(propName),
})(
  ({
    theme,
    isPhone,
    isTablet,
    isLaptop,
    // 모아보기 페이지에선 다른 퍼센트가 필요
    isCollect,
  }: {
    theme?: Theme;
    isPhone: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isCollect?: boolean;
  }) => ({
    backgroundColor: theme?.palette.subColor.main,
    color: theme?.palette.oppositeColor.main,
    margin: '30px 25px',
    width: isCollect
      ? isPhone
        ? '75%'
        : isTablet
        ? '38.5%'
        : isLaptop
        ? '30%'
        : '23%'
      : isPhone
      ? '75%'
      : isTablet
      ? '38.5%'
      : isLaptop
      ? '26%'
      : '19%',
    height: '200px',
    padding: '10px',
    borderRadius: '10px',
    textDecorationLine: 'none',
    boxShadow: `0px 0px 20px 1px ${theme?.palette.shadowColor.main}`,
    transition: 'all .35s ease-in-out',
    ':hover': {
      transform: 'translateY(-10px)',
      boxShadow: `0px 0px 20px 1px ${theme?.palette.shadowColor.dark}`,
    },
  }),
);

export const Thumbnail = styled('div')({
  position: 'relative',
  width: '100%',
  height: '80%',
  borderRadius: '15px',
});

export const CostomizeButton = styled('div')({
  position: 'absolute',
  //나중에 버튼 테두리 없앨때 border: 'none', 추가
  border: 'none',
  backgroundColor: 'transparent',
  color: '#C4C4C4',
  right: '7px',
  top: '10px',
});

export const PostPopular = styled('div')({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  width: '100%',
  height: '100%',
  gap: '5px',
  opacity: '0',
  transition: 'all .35s ease-in-out',
  ':hover': {
    opacity: '1',
  },
});

export const VisibilityIcon = styled(Icon)({
  paddingLeft: '20px',
});

export const Image = styled('img')({
  position: 'absolute',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100%',
});

export const Title = styled('div')({
  marginTop: '10px',
  fontSize: '18px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  marginLeft: '2px',
});
