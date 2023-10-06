'use client';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { memo, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSidebarOpenState } from '@/recoil/atom';
import MenuList from './SidebarMenuList';
import {
  SidebarAddButton,
  SidebarAddButtonLeftSide,
  SidebarCloseIcon,
  SidebarDrawer,
  SidebarTitle,
} from './Sidebar.styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import IconButton from '../Button/IconButton';

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useRecoilState(isSidebarOpenState);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));
  const [btnWord, setBtnWord] = useState('+ 카테고리 추가');

  useEffect(() => {
    setOpenSideBar(true);
    setBtnWord('+ 카테고리 추가');
  }, []);

  const sidebarMenuList = [
    {
      category_id: 1,
      category_name: 'Test',
      postTitleDtos: [
        {
          postId: 12,
          postTitle: 'string',
        },
        {
          postId: 13,
          postTitle: 'login',
        },
        {
          postId: 14,
          postTitle: '0608',
        },
        {
          postId: 15,
          postTitle: 'string',
        },
        {
          postId: 16,
          postTitle: 'string',
        },
        {
          postId: 17,
          postTitle: 'string',
        },
      ],
    },
  ];

  return (
    <>
      {openSideBar ? (
        <SidebarDrawer
          variant={'temporary'}
          open={openSideBar}
          onClose={() => setOpenSideBar(false)}
          ModalProps={{
            keepMounted: true,
          }}
          isPhone={isPhone}
          transitionDuration={{ appear: 500, enter: 500, exit: 500 }}>
          <SidebarTitle>Chaeyeon Log</SidebarTitle>
          <SidebarAddButton>
            <SidebarAddButtonLeftSide>{btnWord}</SidebarAddButtonLeftSide>
            <IconButton onClick={() => setOpenSideBar(false)}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </SidebarAddButton>
          <MenuList sidebarMenuList={sidebarMenuList} />
        </SidebarDrawer>
      ) : (
        <SidebarCloseIcon onClick={() => setOpenSideBar(true)}>Menu</SidebarCloseIcon>
      )}
    </>
  );
};

export default memo(Sidebar);
