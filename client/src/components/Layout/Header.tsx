'use client';

import { useEffect, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useIsSearchSSR, useUserThemeSSR } from '../../../hooks/useRecoilSSR';
import { usePathname } from 'next/navigation';
import PageLink from '../PageLink/PageLink';
import Image from 'next/image';
import SettingMenu from '../Header/SettingMenu';
import { Home, Search } from '@mui/icons-material';
import { useGetUserDetailQuery } from '@/api/userDetail-api';
import { IUserDetail } from '@/types/dto';

export default function Header() {
  const [userTheme, setUserTheme] = useUserThemeSSR();
  const pathname = usePathname();
  const [isSearch, setIsSearch] = useIsSearchSSR();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: userDetailData } = useGetUserDetailQuery();
  const [userDetail, setUserDetail] = useState<IUserDetail>();

  const toggleUserTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuopen = Boolean(anchorEl);

  useEffect(() => {
    setUserDetail(userDetailData);
  }, [userDetailData]);

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
        {pathname.includes('/collect') &&
          (isSearch ? (
            <IconButton sx={{ color: '#ffffff' }} size="medium" onClick={() => setIsSearch(false)}>
              <Home fontSize="large" />
            </IconButton>
          ) : (
            <IconButton sx={{ color: '#ffffff' }} size="medium" onClick={() => setIsSearch(true)}>
              <Search fontSize="large" />
            </IconButton>
          ))}
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
          <PageLink href={`/${userDetail?.blogUrl}` ?? ''}>
            <Image width={40} height={40} alt="profile Image" src={userDetail?.thumbnail ?? ''} />
          </PageLink>
        </Stack>
        <IconButton sx={{ color: '#ffffff' }} size="medium" onClick={handleClick}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <SettingMenu open={menuopen} onClose={handleClose} anchorEl={anchorEl} />
      </Stack>
    </Stack>
  );
}
