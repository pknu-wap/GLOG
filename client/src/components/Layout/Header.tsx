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

export default function Header() {
  const router = useRouter();
  const [userTheme, setUserTheme] = useUserThemeSSR();

  const [open, setOpen] = useState<boolean>(false);
  const backendFriendInfo = [
    {	
      userFriendResponse : {
        count : 0,
        userSimpleDtos : [
          {
            relationship : "friending",
            haveNewPost : false,
            userSimpleDto : {
              id : "long",
              nickname : "string",
              imageUrl: "data:image/jpeg;base64,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",
            },
          },
          {
            relationship : "friending",
            haveNewPost : false,
            userSimpleDto : {
              id : "long",
              nickname : "string",
              imageUrl: "string",
            },
          },
          {
            relationship : "friending",
            haveNewPost : false,
            userSimpleDto : {
              id : "long",
              nickname : "string",
              imageUrl: "string",
            },
          },
          
        ],
      },
    }
  ]
  const friendCount = backendFriendInfo[0].userFriendResponse.userSimpleDtos.length;


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
                //반응형(Mobile L - 425px 부터 미흡)
                width="50vw"
                height="100%"
                maxWidth="550px"
                padding="10px 20px">
                  <TopStack>
                    <Stack marginBottom="5px">
                      친구들
                    </Stack>
                    <Stack>
                     {friendCount}명
                    </Stack>
                  </TopStack>
                  <Stack
                    flexDirection="row"
                    justifyContent="left"
                    marginBottom="10px">
                    <Sort>
                      <AlignHorizontalLeftIcon fontSize="medium"></AlignHorizontalLeftIcon>
                    </Sort>
                    <Stack
                    marginLeft="5px">
                      정렬기준
                    </Stack>
                  </Stack>
                  <Stack
                  flexDirection="column"
                  maxWidth="200px">
                    {backendFriendInfo[0].userFriendResponse.userSimpleDtos.map((friendInfo) => {
                      return (
                        <FriendListComponent
                          nickname = {friendInfo.userSimpleDto.nickname}
                          profileImg = {friendInfo.userSimpleDto.nickname}
                        />
                      )
                    })}
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
