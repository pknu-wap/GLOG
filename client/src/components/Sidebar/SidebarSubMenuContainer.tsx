'use client';

import { Collapse, ListItem, ListItemText, Stack } from '@mui/material';

import { ReactNode, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CategoryType } from './SidebarMenuList';
import { usePathname } from 'next/navigation';

export const SidebarSubMenuContainer = ({
  children,
  text,
  url,
}: {
  children: ReactNode;
  text: CategoryType;
  url: string;
}) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(pathname.includes(url));

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem sx={{ padding: 0, '&& .MuiList-root': { paddingTop: '0px' } }}>
        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          p={3}
          color="primary.main"
          sx={{
            cursor: 'pointer',
          }}
          onClick={toggleMenu}>
          <>
            <ListItemText
              sx={{
                '& .MuiTypography-root': { fontWeight: '500' },
              }}>
              {text}
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </>
        </Stack>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
