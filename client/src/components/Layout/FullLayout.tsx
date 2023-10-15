import { Stack } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';

type Children = {
  children: React.ReactNode;
};

const MainStack = styled(Stack, {
  shouldForwardProp: (propName: string) => propName !== 'isOpen',
})(({ theme, pathname }: { theme?: Theme; pathname: string }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  padding: pathname.startsWith('/home') ? '64px 0px 0px 0px' : '124px 24px 0px 24px',
  backgroundColor: theme?.palette.themeColor.main,
}));

export default function FullLayout({ children }: Children) {
  const pathname = usePathname();

  console.log(pathname);

  return <MainStack pathname={pathname}>{children}</MainStack>;
}
