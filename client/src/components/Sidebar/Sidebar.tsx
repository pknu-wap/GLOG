import { Drawer, useMediaQuery } from '@mui/material';
import React, { memo, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isSidebarOpenState } from '@/recoil/atom';
import MenuList from './SidebarMenuList';

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useRecoilState(isSidebarOpenState);
  const isLarge = useMediaQuery('(min-width:1200px');

  useEffect(() => {
    if (!isLarge) {
      setOpenSideBar(true);
    }
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
          postTitle: 'thumbnailTest',
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

  console.log(openSideBar);
  return (
    <>
      <Drawer
        variant={'persistent'}
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: 'block',
          border: 'none',
          width: openSideBar ? 248 : 0,
          transition: 'all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          '& .MuiDrawer-paper': {
            width: '299px',
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: 1,
            zIndex: 5,
            paddingTop: '64px',
          },
        }}>
        <MenuList sidebarMenuList={sidebarMenuList} />
      </Drawer>
    </>
  );
};

export default memo(Sidebar);
