import { Drawer, Stack, Theme, styled } from '@mui/material';
import Button from '../Button/Button';
import Link from 'next/link';

export const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (propName) => propName !== 'isPhone',
})(({ theme, isPhone }: { theme?: Theme; isPhone: boolean }) => ({
  display: 'block',
  border: 'none',
  zIndex: 10000,
  '& .MuiDrawer-paper': {
    width: isPhone ? '100%' : '240px',
    backgroundColor: theme?.palette.secondary.main,
    padding: '8px',
    boxSizing: 'border-box',
    borderRight: 'none',
    boxShadow: 1,
    paddingTop: '64px',
  },
}));

// 사이드바 타이틀
export const SidebarTitle = styled(Stack)(() => ({
  paddingLeft: '8px',
  fontSize: '20px',
  marginTop: '20px',
}));

// 사이드바 제목 컨테이너
export const SidebarTitleContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  color: 'primary.main',
  justifyContent: 'space-between',
  cursor: 'pointer',
  paddingRight: '4px',
  marginLeft: '-2px',
  marginTop: '8px',
}));

// 사이드바 추가 버튼
export const SidebarAddButton = styled(Stack)(() => ({
  marginTop: '8px',
  gap: '50px',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
}));

// 사이드바 추가버튼 누르는 곳
export const SidebarAddButtonLeftSide = styled(Button)(({ theme }) => ({
  padding: '4px 8px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  color: theme.palette.oppositeColor.main,
}));

// 사이드바 닫는 버튼
export const SidebarCloseIcon = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  position: 'absolute',
  left: '-25px',
  top: '85px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 20000,

  ':hover': {
    left: '4px',
    borderRadius: '8px',
    width: '50px',
    transition: 'all 0.5s ease',
  },
}));

interface SidebarMenuItemProps {
  theme?: Theme;
  isActive: boolean;
}

// 사이드바 링크
export const SidebarMenuItem = styled(Link, {
  shouldForwardProp: (propName) => propName !== 'isActive',
})<SidebarMenuItemProps>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.primary.main : theme.palette.oppositeColor.main,
  textDecoration: 'none',
  ':hover': {
    color: theme.palette.primary.main,
  },
}));
