'use client';

import { useRecoilState } from 'recoil';
import { userThemeState } from '@/recoil/atom';
import { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useRouter } from 'next/navigation';
// import { useGetMypageQuery } from '@/api/header-api';
// import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [userTheme, setUserTheme] = useRecoilState(userThemeState);
  // const [open, setOpen] = useRecoilState(isSidebarOpenState);
  // const { data } = useGetMypageQuery({ loginedMemberId: 0 });
  // const [token, setToken] = useRecoilState(tokenState);

  // useEffect(() => {
  //   setUserTheme(userTheme);
  //   // setToken('asdfadf');
  // }, []);

  const toggleUserTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
      zIndex={10000000}>
      <Stack width="fit-content" fontSize="24px">
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
          <MenuItem onClick={handleClose}>마이페이지</MenuItem>
          <MenuItem onClick={handleClose}>친구</MenuItem>
          <MenuItem onClick={handleClose}>스크랩</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
}
