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
      setOpenSideBar(false);
    }
  }, []);

  const sidebarMenuList = [
    {
      category_id: 1,
      category_name: '"Test"',
      titles: [
        {
          contentId: 12,
          title: 'string',
        },
        {
          contentId: 13,
          title: 'thumbnailTest',
        },
        {
          contentId: 14,
          title: '0608',
        },
        {
          contentId: 15,
          title: 'string',
        },
        {
          contentId: 16,
          title: 'string',
        },
        {
          contentId: 17,
          title: 'string',
        },
      ],
    },
  ];

  return (
    <>
      <Drawer
        variant={isLarge ? 'persistent' : 'temporary'}
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: 'block',
          border: 'none',
          zIndex: 2000,
          width: openSideBar ? 248 : 0,
          transition: 'all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          '& .MuiDrawer-paper': {
            width: '299px',
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: 1,
          },
        }}>
        <MenuList sidebarMenuList={sidebarMenuList} />
      </Drawer>
    </>
  );
};

export default memo(Sidebar);
