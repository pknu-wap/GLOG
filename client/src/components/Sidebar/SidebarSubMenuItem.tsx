import { ListItemText, Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { SidebarMenuItem } from './Sidebar.styles';

export const SidebarSubMenuItem = ({ text, url }: { text: string; url: string }) => {
  const pathname = usePathname();

  return (
    <Stack width="100%">
      <SidebarMenuItem isActive={pathname === url} href={`${url}`}>
        <ListItemText
          sx={{
            paddingLeft: '32px',
            '& .MuiTypography-root': { fontWeight: '500', fontSize: '14px' },
          }}>
          - {text}
        </ListItemText>
      </SidebarMenuItem>
    </Stack>
  );
};
