'use client';

import { useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
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
import { IAlarm, IUserDetail } from '@/types/dto';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useGetAlarmsQuery } from '@/api/blog-api';
import CommentIcon from '@mui/icons-material/Comment';

export default function Header() {
  const [userTheme, setUserTheme] = useUserThemeSSR();
  const pathname = usePathname();
  const [isSearch, setIsSearch] = useIsSearchSSR();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alarmAnchorEl, setAlarmAnchorEl] = useState<null | HTMLElement>(null);
  const { data: userDetailData } = useGetUserDetailQuery();
  const [userDetail, setUserDetail] = useState<IUserDetail>();
  const [open, setOpen] = useState(false);
  const { data: alarmData } = useGetAlarmsQuery();
  const [alarm, setAlarm] = useState<IAlarm>();

  useEffect(() => {
    setAlarm(alarmData);
  }, [alarmData]);

  const toggleUserTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAlarmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAlarmAnchorEl(event.currentTarget);
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
        <IconButton
          sx={{ color: '#ffffff' }}
          size="medium"
          onClick={(e) => {
            setOpen(true);
            handleAlarmClick(e);
          }}>
          <NotificationsIcon fontSize="large" />
        </IconButton>
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
      <Menu
        anchorEl={alarmAnchorEl}
        open={open}
        onClose={() => {
          setOpen(false);
          setAnchorEl(null);
        }}>
        {alarm?.alarmDtos?.map((alarm, i) => {
          return (
            <MenuItem sx={{ padding: '4px' }} key={i}>
              <Stack
                bgcolor={alarm.checked ? 'primary.light' : 'transparent'}
                py={4}
                px={6}
                spacing={2}>
                <Stack>
                  <CommentIcon sx={{ marginBottom: '4px' }} />
                  {alarm.message}
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Stack fontSize="13px">{alarm.createdAt.slice(0, 10)}</Stack>
                  <Stack fontSize="13px">{alarm.createdAt.slice(11, 19)}</Stack>
                </Stack>
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
}
