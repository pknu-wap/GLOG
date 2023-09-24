import { isSidebarOpenState } from '@/recoil/atom';
import { ListItem, ListItemText, Stack, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

export const SidebarSubMenuItem = ({ text, url }: { text: string; url: string }) => {
  const segments = useSelectedLayoutSegment();
  const theme = useTheme();
  // const router = useRouter();
  const [, setOpenSideBar] = useRecoilState(isSidebarOpenState);
  const isLarge = useMediaQuery('(min-width:1200px');

  console.log(segments);
  return (
    <ListItem sx={{ padding: '0' }}>
      <Stack
        width="100%"
        p={3}
        onClick={() => {
          // router.push(url);
          if (!isLarge) {
            setOpenSideBar(false);
          }
        }}>
        <Link
          style={{
            color: window && segments === url ? theme.palette.primary.light : 'white',
            textDecoration: 'none',
          }}
          href={`${url}`}>
          <ListItemText
            sx={{
              '& .MuiTypography-root': { fontWeight: '500' },
            }}>
            {text}
          </ListItemText>
        </Link>
      </Stack>
    </ListItem>
  );
};
