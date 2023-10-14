import { Stack } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';

type Children = {
  children: React.ReactNode;
};

const MainStack = styled(Stack, {
  shouldForwardProp: (propName: string) => propName !== 'isOpen',
})(({ theme }: { theme?: Theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  // padding: '124px 24px 0px 20px',
  backgroundColor: theme?.palette.themeColor.main,
}));

export default function FullLayout({ children }: Children) {
  return <MainStack>{children}</MainStack>;
}
