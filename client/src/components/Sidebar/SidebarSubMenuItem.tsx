import { isSidebarOpenState } from '@/recoil/atom';
import { ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';

export const SidebarSubMenuItem = ({ text, url }: { text: string; url: string }) => {
  const pathname = usePathname();
  // const router = useRouter();
  const [, setOpenSideBar] = useRecoilState(isSidebarOpenState);
  const isLarge = useMediaQuery('(min-width:1200px');

  console.log(pathname);
  return (
    <ListItem sx={{ padding: '0' }}>
      <ListItemButton
        sx={{
          paddingY: '8px',
          paddingX: '24px',
          ':hover': { backgroundColor: 'primary.light', color: 'primary.main' },
          backgroundColor: window && pathname === url ? 'primary.light' : 'white',
          color: window && pathname === url ? 'primary.main' : 'black',
        }}
        onClick={() => {
          // router.push(url);
          if (!isLarge) {
            setOpenSideBar(false);
          }
        }}>
        <Link href={`${url}`}>
          <ListItemText
            sx={{
              '& .MuiTypography-root': { fontWeight: '500' },
            }}>
            {text}
          </ListItemText>
        </Link>
      </ListItemButton>
    </ListItem>
  );
};
