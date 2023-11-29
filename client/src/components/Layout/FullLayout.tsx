'use client';

import { Stack } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
// import { useAndroidSSR, useIphoneSSR } from '../../../hooks/useRecoilSSR';

type Children = {
  children: React.ReactNode;
};

const MainStack = styled(Stack, {
  shouldForwardProp: (propName: string) => propName !== 'isOpen',
})(({ theme, pathname }: { theme?: Theme; pathname: string }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  padding: pathname.includes('/home') || pathname.includes('/login') ? '0px' : '64px 24px 0px 24px',
  backgroundColor: theme?.palette.themeColor.main,
}));

export default function FullLayout({ children }: Children) {
  const pathname = usePathname();

  return (
    <SnackbarProvider>
      <MainStack pathname={pathname}>{children}</MainStack>
    </SnackbarProvider>
  );
}
