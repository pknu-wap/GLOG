import { isSidebarOpenState } from '@/recoil/atom';
import { ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

export const SidebarSubMenuItem = ({ text, url }: { text: string; url: string }) => {
  const router = useRouter();
  const [, setOpenSideBar] = useRecoilState(isSidebarOpenState);
  const isLarge = useMediaQuery('(min-width:1200px');

  return (
    <ListItem sx={{ padding: '0' }}>
      <ListItemButton
        sx={{
          paddingY: '8px',
          paddingX: '24px',
          ':hover': { backgroundColor: 'primary.light', color: 'primary.main' },
          backgroundColor: window && router.pathname === url ? 'primary.light' : 'white',
          color: window && router.pathname === url ? 'primary.main' : 'black',
        }}
        onClick={() => {
          router.push(url);
          if (!isLarge) {
            setOpenSideBar(false);
          }
        }}>
        <ListItemText
          sx={{
            '& .MuiTypography-root': { fontWeight: '500' },
          }}>
          {text}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
