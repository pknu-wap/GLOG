import { Stack } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import FootPrintAnimation from '../FootPrint/FootPrintAnimation';
import PhoneType from '../PhoneType/PhoneType';
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
  padding:
    pathname.includes('/home') || pathname.includes('/login') ? '0px' : '124px 24px 0px 24px',
  backgroundColor: theme?.palette.themeColor.main,
}));

export default function FullLayout({ children }: Children) {
  const pathname = usePathname();
  // const [android] = useAndroidSSR();
  // const [iphone] = useIphoneSSR();

  // console.log(navigator.userAgent.match(/iOS_App/i));

  return (
    <MainStack pathname={pathname}>
      <PhoneType>
        {/* 123
        {navigator.userAgent}
        {navigator.userAgent.match(/iOS_App/i) ?? 'null이다'}
        {android}
        {iphone} */}
        {children}
      </PhoneType>
      <FootPrintAnimation />
    </MainStack>
  );
}
