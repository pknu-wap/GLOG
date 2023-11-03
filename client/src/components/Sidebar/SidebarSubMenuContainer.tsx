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
import PageLink from '../PageLink/PageLink';

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
            <IconButton size="small" onClick={toggleMenu}>
              <ExpandMore fontSize="small" />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={toggleMenu}>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          )}
          <SidebarMenuItem isActive={isMatchingUrlAndTitle} href={url}>
            {text}
          </SidebarMenuItem>
        </Stack>
        <Stack direction="row" alignItems={'center'}>
          <IconButton size="small">
            <PageLink href={`/write/${url}/0`}>
              <AddIcon fontSize="small" />
            </PageLink>
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
