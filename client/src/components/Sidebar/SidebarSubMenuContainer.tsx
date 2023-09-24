'use client';

import { Collapse, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactNode, useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { CategoryType } from './SidebarMenuList';
import { usePathname } from 'next/navigation';
import IconButton from '../Button/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarMenuItem, SidebarTitleContainer } from './Sidebar.styles';
import AddIcon from '@mui/icons-material/Add';

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
  const isMatchingUrlAndTitle = pathname.includes(url);

  const [open, setOpen] = useState(isMatchingUrlAndTitle);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <SidebarTitleContainer>
        <Stack direction="row" alignItems={'center'}>
          {open ? (
            <IconButton size="small">
              <ExpandMore fontSize="small" onClick={toggleMenu} />
            </IconButton>
          ) : (
            <IconButton size="small">
              <ChevronRightIcon fontSize="small" onClick={toggleMenu} />
            </IconButton>
          )}
          <SidebarMenuItem isActive={window && isMatchingUrlAndTitle} href={url}>
            {text}
          </SidebarMenuItem>
        </Stack>
        <Stack direction="row" alignItems={'center'}>
          <IconButton size="small">
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Stack>
      </SidebarTitleContainer>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
