'use client';

import { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useUserThemeSSR } from '../../../hooks/useRecoilSSR';
import { usePathname } from 'next/navigation';
import FriendModal from './HeaderFriendModal/FriendModal';
import PageLink from '../PageLink/PageLink';
import Image from 'next/image';
import Pororo from '../../../public/assets/test.png';

export default function Header() {
  const [userTheme, setUserTheme] = useUserThemeSSR();
  const pathname = usePathname();

  const [friendOpen, setFriendOpen] = useState<boolean>(false);

  const toggleUserTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      bgcolor={pathname.includes('/home') ? 'transparent' : 'primary.main'}
      direction="row"
      position="fixed"
      justifyContent="space-between"
      width="100%"
      height="64px"
      alignItems="center"
      p={4}
      zIndex={20000}>
      <Stack
        sx={{ cursor: 'pointer' }}
        width="fit-content"
        fontSize="32px"
        fontWeight={700}
        color={pathname.includes('/home') ? 'primary.main' : 'white'}
        zIndex={20005}>
        <PageLink href="/collect" color="#ffffff">
          GLOG
        </PageLink>
      </Stack>
      <Stack direction="row" alignItems="center" gap={2}>
        {userTheme === 'dark' ? (
          <IconButton sx={{ color: '#ffffff' }} onClick={toggleUserTheme}>
            <DarkModeIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton sx={{ color: '#ffffff' }} onClick={toggleUserTheme}>
            <LightModeIcon fontSize="large" />
          </IconButton>
        )}
        <Stack
          width="40px"
          height="40px"
          borderRadius="20px"
          overflow="hidden"
          sx={{ cursor: 'pointer', backgroundColor: '#ffffff' }}>
          <PageLink href={'/chaeyeon'}>
            <Image width={40} height={40} alt="profile Image" src={Pororo} />
          </PageLink>
        </Stack>
        <IconButton sx={{ color: '#ffffff' }} size="medium" onClick={handleClick}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuopen} onClose={handleClose}>
          <MenuItem>
            <PageLink
              href="/mypage"
              onClick={() => {
                setAnchorEl(null);
              }}>
              마이페이지
            </PageLink>
          </MenuItem>
          <MenuItem onClick={() => setFriendOpen(true)}>친구</MenuItem>
          <MenuItem>
            <PageLink
              href="/mypage"
              onClick={() => {
                setAnchorEl(null);
              }}>
              스크랩
            </PageLink>
          </MenuItem>
          <MenuItem onClick={() => localStorage.setItem('token', '')}>Logout</MenuItem>
          <MenuItem>
            <PageLink
              href="/login"
              onClick={() => {
                setAnchorEl(null);
              }}>
              로그인
            </PageLink>
          </MenuItem>
        </Menu>
      </Stack>

      {/* 친구 목록 모달 */}
      <FriendModal open={friendOpen} onClose={() => setFriendOpen(false)}></FriendModal>
    </Stack>
  );
}
