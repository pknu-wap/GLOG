import { isSidebarOpenState } from '@/recoil/atom';
import { Stack } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';

type Children = {
  children: React.ReactNode;
};

const MainStack = styled(Stack, {
  shouldForwardProp: (propName: string) => propName !== 'isOpen',
})(({ theme, isOpen }: { theme?: Theme; isOpen: boolean }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  padding: isOpen ? '124px 24px 0px 260px' : '124px 24px 0px 20px',
  backgroundColor: theme?.palette.themeColor.main,
}));

export default function FullLayout({ children }: Children) {
  const isOpen = useRecoilValue(isSidebarOpenState);
  return <MainStack isOpen={isOpen}>{children}</MainStack>;
}
