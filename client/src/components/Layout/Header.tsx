'use client';

import { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useRouter } from 'next/navigation';
import { useUserThemeSSR } from '../../../hooks/useRecoilSSR';
import { ModalContent } from '../Modal/Modal.style';
import Modal from '@/components/Modal/Modal';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import FriendListComponent, { Sort, TopStack } from './Header.style';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const [userTheme, setUserTheme] = useUserThemeSSR();
  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const backendFriendInfo = [
    {
      userFriendResponse: {
        count: 0,
        userSimpleDtos: [
          {
            relationship: 'friending',
            haveNewPost: true,
            userSimpleDto: {
              id: 'long',
              nickname: 'chaeyeon',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'junseo',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: true,
            userSimpleDto: {
              id: 'long',
              nickname: 'duyoung',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: true,
            userSimpleDto: {
              id: 'long',
              nickname: 'Jongkyeong',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'dohyeon',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'dohyeon',
              imageUrl: 'string',
            },
          },
        ],
      },
    },
  ];
  const friendCount = backendFriendInfo[0].userFriendResponse.userSimpleDtos.length;

  const toggleUserTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (page: 'mypage' | 'friend' | 'scrap' | 'logout' | 'login') => {
    if (page === 'logout') {
      console.log('logged out');
    } else if (page === 'friend') {
      console.log('친구');
    } else {
      router.push(`/${page}`);
    }
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
        <Link href="/collect">GLOG</Link>
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
          onClick={() => router.push('/chaeyeon')}
          sx={{ cursor: 'pointer', backgroundColor: '#ffffff' }}
        />
        <IconButton sx={{ color: '#ffffff' }} size="medium" onClick={handleClick}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuopen} onClose={handleClose}>
          <MenuItem onClick={() => handleClose('mypage')}>마이페이지</MenuItem>
          <MenuItem onClick={() => setOpen(true)}>친구</MenuItem>
          <MenuItem onClick={() => handleClose('scrap')}>스크랩</MenuItem>
          <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
          <MenuItem onClick={() => handleClose('login')}>로그인</MenuItem>
        </Menu>
      </Stack>

      {/* 친구 목록 모달 */}
      <Modal open={open} maxWidth="lg" onClose={() => setOpen(false)}>
        <ModalContent>
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="space-between"
            flexDirection="column"
            //반응형(Mobile L - 425px 부터 미흡)
            width="50vw"
            height="100%"
            maxWidth="550px"
            padding="10px 20px">
            <TopStack>
              <Stack marginBottom="5px">친구들</Stack>
              <Stack>{friendCount}명</Stack>
            </TopStack>
            <Stack flexDirection="row" justifyContent="left" marginBottom="10px">
              <Sort>
                <AlignHorizontalLeftIcon fontSize="medium"></AlignHorizontalLeftIcon>
              </Sort>
              <Stack marginLeft="5px">정렬기준</Stack>
            </Stack>
            <Stack flexDirection="column" width="45vw" maxHeight="200px">
              {backendFriendInfo[0].userFriendResponse.userSimpleDtos.map((friendInfo) => {
                return (
                  <FriendListComponent
                    key={friendInfo.userSimpleDto.id}
                    nickname={friendInfo.userSimpleDto.nickname}
                    profileImg={friendInfo.userSimpleDto.nickname}
                    haveNewPost={friendInfo.haveNewPost}
                  />
                );
              })}
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
