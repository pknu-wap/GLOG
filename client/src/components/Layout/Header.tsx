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

export default function Header() {
  const router = useRouter();
  const [userTheme, setUserTheme] = useUserThemeSSR();

  const [open, setOpen] = useState(true);
  //const backendFriendInfo = [
  //  {	
  //    userFriendResponse : {
  //      count : 0,
  //      userSimpleDtos : [
  //        {
  //          relationship : "me" | "friending" | "friend" | "other",
  //          haveNewPost : false,
  //          userSimpleDto : {
  //            id : "long",
  //            nickname : "string",
  //            imageUrl: "string",
  //          },
  //        },
  //        {
  //          relationship : "me" | "friending" | "friend" | "other",
  //          haveNewPost : false,
  //          userSimpleDto : {
  //            id : "long",
  //            nickname : "string",
  //            imageUrl: "string",
  //          },
  //        }
  //      ],
  //    },
  //  }
  //]

  const toggleUserTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (page: 'mypage' | 'friend' | 'scrap' | 'logout') => {
    if (page === 'logout') {
      console.log('logged out');
    } else if (page === 'friend') {
      console.log('친구');
    } else {
      router.push(`/chaeyeon/${page}`);
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
      zIndex={20000}>
      <Stack
        sx={{ cursor: 'pointer' }}
        width="fit-content"
        fontSize="24px"
        color={'white'}
        onClick={() => router.push('/home')}
        zIndex={20005}>
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
        <Menu anchorEl={anchorEl} open={menuopen} onClose={handleClose}>
          <MenuItem onClick={() => handleClose('mypage')}>마이페이지</MenuItem>
          <MenuItem onClick={() => handleClose('friend')}>
            친구
            <Modal open={open} maxWidth="lg" onClose={() => setOpen(false)}>
              <ModalContent>
                <Stack 
                display="flex"
                justifyContent="center"
                alignItems="space-between"
                flexDirection="column"
                width="550px"
                padding="20px 40px">
                  <Stack
                  borderBottom={`1px solid green`}
                  justifyContent="space-between"
                  flexDirection="row"
                  marginBottom="10px"
                  >
                    <Stack marginBottom="5px">
                      친구들
                    </Stack>
                    <Stack>
                      200명
                    </Stack>
                  </Stack>
                  <Stack
                  flexDirection="row"
                  justifyContent="left">
                    <AlignHorizontalLeftIcon fontSize="medium"></AlignHorizontalLeftIcon>
                    <Stack>정렬기준</Stack>
                  </Stack>
                  <Stack>
                    rkskekfkakqktk
                  </Stack>
                </Stack>
              </ModalContent>
            </Modal>
          </MenuItem>
          <MenuItem onClick={() => handleClose('scrap')}>스크랩</MenuItem>
          <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
}
