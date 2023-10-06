'use client';

import { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useRouter } from 'next/navigation';
import { useUserThemeSSR } from '../../../hooks/useRecoilSSR';

export default function Header() {
  const router = useRouter();
  const [userTheme, setUserTheme] = useUserThemeSSR();

  const toggleUserTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (page: 'mypage' | 'friend' | 'scrap' | 'logout') => {
    if (page !== 'logout') {
      router.push(`/${page}`);
    }
    setAnchorEl(null);
  };

  return (
    <Stack
      bgcolor="primary.main"
      direction="row"
      position="fixed"
      justifyContent="space-between"
      width="100%"
      height="64px"
      alignItems="center"
      p={4}
      zIndex={10000}>
      <Stack
        sx={{ cursor: 'pointer' }}
        width="fit-content"
        fontSize="24px"
        color={'white'}
        onClick={() => router.push('/home')}>
        GLOG
      </Stack>
      <Stack direction="row" alignItems="center" gap={2}>
        {userTheme === 'dark' ? (
          <IconButton sx={{ color: 'white' }} onClick={toggleUserTheme}>
            <DarkModeIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton sx={{ color: 'white' }} onClick={toggleUserTheme}>
            <LightModeIcon fontSize="large" />
          </IconButton>
        )}
        <Stack
          width="40px"
          height="40px"
          borderRadius="20px"
          onClick={() => router.push('/')}
          sx={{ cursor: 'pointer', backgroundColor: '#ffffff' }}
        />
        <IconButton sx={{ color: 'white' }} size="medium" onClick={handleClick}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleClose('mypage')}>마이페이지</MenuItem>
          <MenuItem onClick={() => handleClose('friend')}>친구</MenuItem>
          <MenuItem onClick={() => handleClose('scrap')}>스크랩</MenuItem>
          <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
}
